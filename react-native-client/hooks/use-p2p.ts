import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import * as api from '../api/server';
import * as crypto from '../crypto/keys';
import * as peerManager from '../p2p/peer-manager';
import * as providerHandler from '../p2p/provider-handler';
import * as requesterHandler from '../p2p/requester-handler';
import { useHeartbeat } from './use-heartbeat';

export type P2PMode = 'requester' | 'provider' | 'both';

export function useP2P(
  modelStatus: 'idle' | 'downloading' | 'loading' | 'ready' | 'error',
  sendStreaming?: (text: string, onToken: (token: string, done: boolean) => void) => Promise<void>,
  onProviderToken?: (taskId: string, token: string) => void,
  onProviderComplete?: (taskId: string) => void,
) {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Initializing...');
  const [mode, setMode] = useState<P2PMode>('requester');
  const [providerCount, setProviderCount] = useState(0);
  const [heartbeatTime, setHeartbeatTime] = useState<string>('-');
  const rsaKeyPairRef = useRef<CryptoKeyPair | null>(null);
  const providerSetupRef = useRef(false);
  const peerIdRef = useRef<string | null>(null);

  const isProvider = modelStatus === 'ready';

  const { startHeartbeat, stopHeartbeat } = useHeartbeat({
    peerId: peerId || '',
    onTick: (time) => setHeartbeatTime(time),
    onError: () => setHeartbeatTime('Failed'),
  });

  useEffect(() => {
    let cancelled = false;
    let id: string | null = null;

    async function init() {
      try {
        setStatus('Generating keys...');
        const keyPair = await crypto.generateRSAKeyPair();
        rsaKeyPairRef.current = keyPair;
        const publicKeyPEM = await crypto.exportRSAPublicKey(keyPair.publicKey);

        id = `mobile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        peerIdRef.current = id;
        setPeerId(id);
        setStatus('Connecting...');

        peerManager.initPeer(id, 'localhost', 8080);

        peerManager.getPeer()?.on('open', async () => {
          if (cancelled) return;
          setStatus('Registering...');
          try {
            await api.registerPeer(id!, 'mobile', isProvider, publicKeyPEM);
            setStatus(isProvider ? 'Online (Provider)' : 'Online');
            setMode(isProvider ? 'both' : 'requester');
            startHeartbeat();

            if (isProvider && sendStreaming && !providerSetupRef.current) {
              providerSetupRef.current = true;
              await providerHandler.listenForTasks(
                keyPair.privateKey,
                sendStreaming,
                setStatus,
                onProviderToken || (() => {}),
                onProviderComplete || (() => {}),
              );
            }
            refreshProviders();
          } catch (e) {
            setStatus('Registration failed');
          }
        });

        peerManager.getPeer()?.on('error', (err: any) => {
          console.error('[PeerJS]', err);
          setStatus('PeerJS error');
        });

        peerManager.getPeer()?.on('disconnected', () => {
          setStatus('Disconnected');
        });
      } catch (e) {
        setStatus('Init failed');
      }
    }

    init();

    const sub = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background') {
        stopHeartbeat();
        if (peerIdRef.current) {
          api.deletePeer(peerIdRef.current).catch(() => {});
        }
      } else if (nextAppState === 'active') {
        startHeartbeat();
      }
    });

    return () => {
      cancelled = true;
      sub.remove();
      stopHeartbeat();
      peerManager.destroyPeer();
    };
  }, []);

  useEffect(() => {
    if (isProvider && peerId && sendStreaming && !providerSetupRef.current) {
      providerSetupRef.current = true;
      api.registerPeer(peerId, 'mobile', true, rsaKeyPairRef.current ? crypto.exportRSAPublicKey(rsaKeyPairRef.current.publicKey) : '').catch(() => {});
      setMode('both');
      providerHandler.listenForTasks(
        rsaKeyPairRef.current!.privateKey,
        sendStreaming,
        setStatus,
        onProviderToken || (() => {}),
        onProviderComplete || (() => {}),
      );
    } else if (!isProvider && peerId) {
      setMode('requester');
    }
  }, [isProvider, peerId, sendStreaming]);

  const refreshProviders = useCallback(async () => {
    try {
      const { providers } = await api.getAvailableProviders(50);
      setProviderCount(providers.length);
    } catch {
      setProviderCount(0);
    }
  }, []);

  const sendTask = useCallback(
    async (text: string, taskType: string, onToken: (token: string) => void, onDone: () => void, onError: (err: string) => void) => {
      await requesterHandler.sendTask(text, taskType, onToken, onDone, onError);
    },
    [],
  );

  return {
    peerId,
    status,
    mode,
    providerCount,
    heartbeatTime,
    sendTask,
    refreshProviders,
  };
}
