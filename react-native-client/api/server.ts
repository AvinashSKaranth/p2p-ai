const SERVER_URL = 'http://localhost:8080';

async function api(method: string, path: string, body?: object) {
  const opts: RequestInit = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${SERVER_URL}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

export function registerPeer(peerId: string, platform: string, isProvider: boolean, rsaPublicKey: string) {
  return api('POST', '/peers/register', { peer_id: peerId, platform, is_provider: isProvider, rsa_public_key: rsaPublicKey });
}

export function heartbeat(peerId: string) {
  return api('POST', '/peers/heartbeat', { peer_id: peerId });
}

export function deletePeer(peerId: string) {
  return api('DELETE', `/peers/${peerId}`);
}

export function getAvailableProviders(count = 1) {
  return api('GET', `/peers/available?count=${count}`);
}

export function startTask(task: object) {
  return api('POST', '/tasks/start', task);
}

export function completeTask(task: object) {
  return api('POST', '/tasks/complete', task);
}
