let peer = null;
let peerId = null;

export function initPeer(peerIdValue, peerServerHost, peerServerPort) {
  peerId = peerIdValue;
  peer = new Peer(peerId, {
    host: peerServerHost,
    port: peerServerPort,
    path: '/peer-server',
    secure: false,
  });
  return peer;
}

export function getPeer() { return peer; }
export function getPeerId() { return peerId; }

export function onConnection(callback) {
  if (!peer) return;
  peer.on('connection', callback);
}

export function connectToPeer(remotePeerId) {
  if (!peer) throw new Error('Peer not initialized');
  return peer.connect(remotePeerId, { reliable: true });
}

export function destroyPeer() {
  if (peer) {
    peer.destroy();
    peer = null;
  }
}
