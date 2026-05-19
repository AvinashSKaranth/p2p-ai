import { useCallback, useRef } from 'react';
import * as api from '../api/server';

interface UseHeartbeatOptions {
  peerId: string;
  intervalMs?: number;
  onTick?: (time: string) => void;
  onError?: () => void;
}

export function useHeartbeat({ peerId, intervalMs = 30000, onTick, onError }: UseHeartbeatOptions) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(async () => {
      try {
        await api.heartbeat(peerId);
        onTick?.(new Date().toLocaleTimeString());
      } catch {
        onError?.();
      }
    }, intervalMs);
  }, [peerId, intervalMs, onTick, onError]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return { startHeartbeat: start, stopHeartbeat: stop };
}
