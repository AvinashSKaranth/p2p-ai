const { pool } = require('../db/connection');

async function registerPeer(req, res, next) {
  try {
    const { peer_id, platform, is_provider, rsa_public_key } = req.body;

    if (!peer_id || !platform || !['web', 'mobile'].includes(platform)) {
      return res.status(400).json({ error: 'peer_id and valid platform are required' });
    }

    await pool.query(
      `
      INSERT INTO peers (peer_id, platform, is_provider, rsa_public_key, registered_at, is_active, health_check_failures)
      VALUES (?, ?, ?, ?, NOW(), TRUE, 0)
      ON DUPLICATE KEY UPDATE
        platform = VALUES(platform),
        is_provider = VALUES(is_provider),
        rsa_public_key = VALUES(rsa_public_key),
        registered_at = VALUES(registered_at),
        is_active = TRUE,
        health_check_failures = 0
      `,
      [peer_id, platform, !!is_provider, rsa_public_key || null]
    );

    res.json({ peer_id, registered: true });
  } catch (err) {
    next(err);
  }
}

async function heartbeat(req, res, next) {
  try {
    const { peer_id } = req.body;
    if (!peer_id) {
      return res.status(400).json({ error: 'peer_id is required' });
    }

    await pool.query(
      `UPDATE peers SET last_heartbeat = NOW(), is_active = TRUE, health_check_failures = 0 WHERE peer_id = ?`,
      [peer_id]
    );

    res.json({ peer_id, acknowledged: true });
  } catch (err) {
    next(err);
  }
}

async function getAvailableProviders(req, res, next) {
  try {
    const count = Math.min(parseInt(req.query.count || '3', 10), 50);

    const connection = await pool.getConnection();
    try {
      await connection.query('START TRANSACTION');

      const [rows] = await connection.query(
        `SELECT peer_id, rsa_public_key FROM peers
         WHERE is_provider = TRUE AND is_active = TRUE AND is_busy = FALSE
         ORDER BY last_used ASC
         LIMIT ? FOR UPDATE`,
        [count]
      );

      if (rows.length > 0) {
        const ids = rows.map(r => r.peer_id);
        await connection.query(
          `UPDATE peers SET last_used = NOW() WHERE peer_id IN (?)`,
          [ids]
        );
      }

      await connection.query('COMMIT');

      res.json({ providers: rows.map(r => ({ peer_id: r.peer_id, rsa_public_key: r.rsa_public_key })) });
    } catch (err) {
      await connection.query('ROLLBACK');
      throw err;
    } finally {
      connection.release();
    }
  } catch (err) {
    next(err);
  }
}

async function deletePeer(req, res, next) {
  try {
    const { peer_id } = req.params;

    await pool.query(
      `UPDATE peers SET is_active = FALSE, is_busy = FALSE WHERE peer_id = ?`,
      [peer_id]
    );

    await pool.query(
      `UPDATE task_logs SET status = 'failed' WHERE provider_peer_id = ? AND status = 'in_progress'`,
      [peer_id]
    );

    res.json({ peer_id, deleted: true });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registerPeer,
  heartbeat,
  getAvailableProviders,
  deletePeer,
};
