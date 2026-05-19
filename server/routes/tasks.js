const { pool } = require('../db/connection');

async function startTask(req, res, next) {
  try {
    const {
      task_id,
      provider_peer_id,
      requester_peer_id,
      task_type,
      input_char_count,
      started_at,
    } = req.body;

    if (!task_id || !provider_peer_id || !requester_peer_id || !task_type) {
      return res.status(400).json({ error: 'task_id, provider_peer_id, requester_peer_id, and task_type are required' });
    }

    await pool.query(
      `
      INSERT INTO task_logs (task_id, provider_peer_id, requester_peer_id, task_type, input_char_count, started_at, status)
      VALUES (?, ?, ?, ?, ?, ?, 'in_progress')
      ON DUPLICATE KEY UPDATE
        provider_peer_id = VALUES(provider_peer_id),
        requester_peer_id = VALUES(requester_peer_id),
        task_type = VALUES(task_type),
        input_char_count = VALUES(input_char_count),
        started_at = VALUES(started_at),
        status = 'in_progress'
      `,
      [task_id, provider_peer_id, requester_peer_id, task_type, input_char_count || 0, new Date(started_at)]
    );

    await pool.query(
      `UPDATE peers SET is_busy = TRUE WHERE peer_id = ?`,
      [provider_peer_id]
    );

    res.json({ acknowledged: true });
  } catch (err) {
    next(err);
  }
}

async function completeTask(req, res, next) {
  try {
    const {
      task_id,
      provider_peer_id,
      completed_at,
      job_duration_ms,
      tokens_generated,
      status,
    } = req.body;

    if (!task_id || !provider_peer_id) {
      return res.status(400).json({ error: 'task_id and provider_peer_id are required' });
    }

    const tps = (job_duration_ms && tokens_generated && job_duration_ms > 0)
      ? tokens_generated / (job_duration_ms / 1000.0)
      : null;

    await pool.query(
      `
      UPDATE task_logs
      SET completed_at = ?,
          job_duration_ms = ?,
          tokens_generated = ?,
          tokens_per_second = ?,
          status = ?
      WHERE task_id = ?
      `,
      [new Date(completed_at), job_duration_ms || null, tokens_generated || null, tps, status || 'completed', task_id]
    );

    await pool.query(
      `UPDATE peers SET is_busy = FALSE WHERE peer_id = ?`,
      [provider_peer_id]
    );

    res.json({ acknowledged: true });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  startTask,
  completeTask,
};
