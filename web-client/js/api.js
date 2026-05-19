const serverUrl = window.location.origin;

export function getServerUrl() { return serverUrl; }

async function api(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${serverUrl}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

export function registerPeer(peerId, platform, isProvider, rsaPublicKey) {
  return api('POST', '/peers/register', { peer_id: peerId, platform, is_provider: isProvider, rsa_public_key: rsaPublicKey });
}

export function heartbeat(peerId) {
  return api('POST', '/peers/heartbeat', { peer_id: peerId });
}

export function deletePeer(peerId) {
  return api('DELETE', `/peers/${peerId}`);
}

export function getAvailableProviders(count = 1) {
  return api('GET', `/peers/available?count=${count}`);
}

export function startTask(task) {
  return api('POST', '/tasks/start', task);
}

export function completeTask(task) {
  return api('POST', '/tasks/complete', task);
}
