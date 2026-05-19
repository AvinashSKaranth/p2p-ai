import * as api from './api.js';
import * as crypto from './crypto.js';
import * as llm from './llm.js';
import * as ui from './ui.js';

const sessionMap = new Map();

export async function listenForTasks(rsaPrivateKey) {
  const peer = (await import('./peer.js')).getPeer();
  if (!peer) return;

  peer.on('connection', (conn) => {
    console.log('[Provider] Incoming connection from', conn.peer);
    conn.on('data', async (data) => {
      try {
        await handleMessage(conn, data, rsaPrivateKey);
      } catch (e) {
        console.error('[Provider] Error handling message:', e);
      }
    });
    conn.on('close', () => {
      console.log('[Provider] Connection closed:', conn.peer);
    });
  });
}

async function handleMessage(conn, data, rsaPrivateKey) {
  const { request_id, encrypted_aes_key, iv, ciphertext, done } = data;

  if (done) {
    sessionMap.delete(request_id);
    return;
  }

  let aesKey;
  if (encrypted_aes_key) {
    aesKey = await crypto.decryptAESKeyWithRSA(encrypted_aes_key, rsaPrivateKey);
    sessionMap.set(request_id, aesKey);
  } else {
    aesKey = sessionMap.get(request_id);
    if (!aesKey) throw new Error('No AES key for request ' + request_id);
  }

  const plaintext = await crypto.decryptPayload(aesKey, iv, ciphertext);
  const task = JSON.parse(plaintext);
  console.log('[Provider] Received task', task.task_id, 'type', task.task_type);

  await api.startTask({
    task_id: task.task_id,
    provider_peer_id: (await import('./peer.js')).getPeerId(),
    requester_peer_id: conn.peer,
    task_type: task.task_type,
    input_char_count: task.input_text?.length || 0,
    started_at: new Date().toISOString(),
  });

  ui.setStatus('peer-status', 'Busy');
  const msgEl = ui.addMessage(`Provider: running ${task.task_type}...`, 'system');

  let tokenCount = 0;
  const startTime = performance.now();

  try {
    await llm.runInference(task.prompt, async (token) => {
      tokenCount++;
      const { iv: outIv, ciphertext: outCt } = await crypto.encryptPayload(aesKey, JSON.stringify({ token }));
      conn.send({ request_id, iv: outIv, ciphertext: outCt });
    });

    const duration = Math.round(performance.now() - startTime);
    conn.send({ request_id, done: true });

    await api.completeTask({
      task_id: task.task_id,
      provider_peer_id: (await import('./peer.js')).getPeerId(),
      completed_at: new Date().toISOString(),
      job_duration_ms: duration,
      tokens_generated: tokenCount,
      status: 'completed',
    });

    ui.setStatus('peer-status', 'Online');
    ui.addMessage('Provider: task completed', 'system');
  } catch (e) {
    console.error('[Provider] Inference error:', e);
    await api.completeTask({
      task_id: task.task_id,
      provider_peer_id: (await import('./peer.js')).getPeerId(),
      completed_at: new Date().toISOString(),
      status: 'failed',
    });
    ui.setStatus('peer-status', 'Online');
  } finally {
    sessionMap.delete(request_id);
  }
}
