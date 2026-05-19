const { pool } = require('../db/connection');

let intervalId = null;

function startHealthCheckScheduler() {
  if (intervalId) return;

  intervalId = setInterval(async () => {
    try {
      const [stalePeers] = await pool.query(
        `SELECT peer_id, health_check_failures FROM peers
         WHERE is_active = TRUE
         AND (last_heartbeat IS NULL OR last_heartbeat < NOW() - INTERVAL 90 SECOND)`
      );

      for (const peer of stalePeers) {
        const newFailures = peer.health_check_failures + 1;
        if (newFailures >= 3) {
          await pool.query(
            `UPDATE peers SET is_active = FALSE, is_provider = FALSE, is_busy = FALSE, health_check_failures = ? WHERE peer_id = ?`,
            [newFailures, peer.peer_id]
          );
          await pool.query(
            `UPDATE task_logs SET status = 'failed' WHERE provider_peer_id = ? AND status = 'in_progress'`,
            [peer.peer_id]
          );
        } else {
          await pool.query(
            `UPDATE peers SET health_check_failures = ? WHERE peer_id = ?`,
            [newFailures, peer.peer_id]
          );
        }
      }

      if (stalePeers.length > 0) {
        console.log(`[HealthCheck] ${stalePeers.length} stale peer(s) checked.`);
      }
    } catch (err) {
      console.error('[HealthCheck] Error during health check:', err.message);
    }
  }, 60000);

  console.log('[HealthCheck] Scheduler started (60s interval).');
}

function stopHealthCheckScheduler() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

module.exports = {
  startHealthCheckScheduler,
  stopHealthCheckScheduler,
};
