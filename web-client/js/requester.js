import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@11.1.0/+esm';
import * as api from './api.js';
import * as crypto from './crypto.js';
import * as ui from './ui.js';
import { connectToPeer, getPeerId } from './peer.js';

const requestMap = new Map();

export async function sendTask(inputText, taskType = 'other') {
  const count = 1;
  const { providers } = await api.getAvailableProviders(count);

  if (!providers.length) {
    ui.addMessage('No available providers found. Try downloading the model locally.', 'system');
    return;
  }

  const provider = providers[0];
  const requestId = uuidv4();
  const taskId = uuidv4();

  const aesKey = await crypto.generateAESKey();
  requestMap.set(requestId, { aesKey, providerId: provider.peer_id });

  const payload = JSON.stringify({ task_id: taskId, task_type: taskType, input_text: inputText, prompt: inputText });
  const { iv, ciphertext } = await crypto.encryptPayload(aesKey, payload);
  const encryptedAesKey = await crypto.encryptAESKeyWithRSA(aesKey, await crypto.importRSAPublicKey(provider.rsa_public_key));

  const conn = connectToPeer(provider.peer_id);

  return new Promise((resolve, reject) => {
    let fullText = '';
    const msgEl = ui.addMessage('', 'assistant', `Provider: ${provider.peer_id}`);

    conn.on('open', () => {
      conn.send({ request_id: requestId, encrypted_aes_key: encryptedAesKey, iv, ciphertext });
    });

    conn.on('data', async (data) => {
      try {
        if (data.done) {
          requestMap.delete(requestId);
          conn.close();
          resolve(fullText);
          return;
        }
        const { request_id: rid, iv: inIv, ciphertext: inCt } = data;
        const { aesKey: ak } = requestMap.get(rid) || {};
        if (!ak) return;
        const decrypted = await crypto.decryptPayload(ak, inIv, inCt);
        const packet = JSON.parse(decrypted);
        if (packet.token) {
          fullText += packet.token;
          ui.appendToMessage(msgEl, packet.token);
        }
      } catch (e) {
        console.error('[Requester] Decrypt error:', e);
      }
    });

    conn.on('error', (e) => {
      requestMap.delete(requestId);
      reject(e);
    });

    conn.on('close', () => {
      requestMap.delete(requestId);
      resolve(fullText);
    });
  });
}
