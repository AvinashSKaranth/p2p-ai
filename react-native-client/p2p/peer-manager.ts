import Peer from '@thyreality-inc/react-native-peerjs';

let peer: Peer | null = null;
let peerId: string | null = null;

export function initPeer(peerIdValue: string, peerServerHost: string, peerServerPort: number) {
  peerId = peerIdValue;
  peer = new Peer(peerIdValue, {
    host: peerServerHost,
    port: peerServerPort,
    path: '/peer-server',
    secure: false,
  });
  return peer;
}

export function getPeer() { return peer; }
export function getPeerId() { return peerId; }

export function onConnection(callback: (conn: any) => void) {
  if (!peer) return;
  peer.on('connection', callback);
}

export function connectToPeer(remotePeerId: string) {
  if (!peer) throw new Error('Peer not initialized');
  return peer.connect(remotePeerId, { reliable: true });
}

export function destroyPeer() {
  if (peer) {
    peer.destroy();
    peer = null;
  }
}
