import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as api from '../api/server';
import * as crypto from '../crypto/keys';
import { connectToPeer } from './peer-manager';

const requestMap = new Map<
  string,
  { aesKey: CryptoKey; providerId: string }
>();

export async function sendTask(
  inputText: string,
  taskType: string,
  onToken: (token: string) => void,
  onDone: () => void,
  onError: (err: string) => void,
  providerCount = 1,
) {
  const { providers } = await api.getAvailableProviders(providerCount);
  if (!providers.length) {
    onError('No available providers found.');
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

  return new Promise<void>((resolve) => {
    conn.on('open', () => {
      conn.send({ request_id: requestId, encrypted_aes_key: encryptedAesKey, iv, ciphertext });
    });

    conn.on('data', async (data: any) => {
      try {
        if (data.done) {
          requestMap.delete(requestId);
          conn.close();
          onDone();
          resolve();
          return;
        }
        const { request_id: rid, iv: inIv, ciphertext: inCt } = data;
        const { aesKey: ak } = requestMap.get(rid) || {};
        if (!ak) return;
        const decrypted = await crypto.decryptPayload(ak, inIv, inCt);
        const packet = JSON.parse(decrypted);
        if (packet.token) onToken(packet.token);
      } catch (e) {
        console.error('[Requester] Decrypt error:', e);
      }
    });

    conn.on('error', (e: any) => {
      requestMap.delete(requestId);
      onError(e.message || 'Connection error');
      resolve();
    });

    conn.on('close', () => {
      requestMap.delete(requestId);
      resolve();
    });
  });
}
