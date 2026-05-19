import * as api from '../api/server';
import * as crypto from '../crypto/keys';
import { getPeerId } from './peer-manager';

const sessionMap = new Map<string, CryptoKey>();

export async function listenForTasks(
  rsaPrivateKey: CryptoKey,
  sendStreaming: (text: string, onToken: (token: string, done: boolean) => void) => Promise<void>,
  onStatus: (s: string) => void,
  onToken: (taskId: string, token: string) => void,
  onComplete: (taskId: string) => void,
) {
  const PeerManager = await import('./peer-manager');
  const peer = PeerManager.getPeer();
  if (!peer) return;

  peer.on('connection', (conn: any) => {
    conn.on('data', async (data: any) => {
      try {
        await handleMessage(conn, data, rsaPrivateKey, sendStreaming, onStatus, onToken, onComplete);
      } catch (e) {
        console.error('[Provider] Error handling message:', e);
      }
    });
  });
}

async function handleMessage(
  conn: any,
  data: any,
  rsaPrivateKey: CryptoKey,
  sendStreaming: (text: string, onToken: (token: string, done: boolean) => void) => Promise<void>,
  onStatus: (s: string) => void,
  onToken: (taskId: string, token: string) => void,
  onComplete: (taskId: string) => void,
) {
  const { request_id, encrypted_aes_key, iv, ciphertext, done } = data;

  if (done) {
    sessionMap.delete(request_id);
    return;
  }

  let aesKey: CryptoKey;
  if (encrypted_aes_key) {
    aesKey = await crypto.decryptAESKeyWithRSA(encrypted_aes_key, rsaPrivateKey);
    sessionMap.set(request_id, aesKey);
  } else {
    aesKey = sessionMap.get(request_id)!;
    if (!aesKey) throw new Error('No AES key for request ' + request_id);
  }

  const plaintext = await crypto.decryptPayload(aesKey, iv, ciphertext);
  const task = JSON.parse(plaintext);

  await api.startTask({
    task_id: task.task_id,
    provider_peer_id: getPeerId(),
    requester_peer_id: conn.peer,
    task_type: task.task_type,
    input_char_count: task.input_text?.length || 0,
    started_at: new Date().toISOString(),
  });

  onStatus('busy');

  let tokenCount = 0;
  const startTime = performance.now();

  try {
    await sendStreaming(task.prompt, async (token: string, done: boolean) => {
      tokenCount++;
      onToken(task.task_id, token);
      const { iv: outIv, ciphertext: outCt } = await crypto.encryptPayload(aesKey, JSON.stringify({ token }));
      conn.send({ request_id, iv: outIv, ciphertext: outCt });
    });

    const duration = Math.round(performance.now() - startTime);
    conn.send({ request_id, done: true });

    await api.completeTask({
      task_id: task.task_id,
      provider_peer_id: getPeerId(),
      completed_at: new Date().toISOString(),
      job_duration_ms: duration,
      tokens_generated: tokenCount,
      status: 'completed',
    });

    onStatus('online');
    onComplete(task.task_id);
  } catch (e) {
    console.error('[Provider] Inference error:', e);
    await api.completeTask({
      task_id: task.task_id,
      provider_peer_id: getPeerId(),
      completed_at: new Date().toISOString(),
      status: 'failed',
    });
    onStatus('online');
  } finally {
    sessionMap.delete(request_id);
  }
}
