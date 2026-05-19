const { pool } = require('./connection');

async function runMigrations() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS peers (
        peer_id VARCHAR(255) PRIMARY KEY,
        platform ENUM('web', 'mobile') NOT NULL,
        last_used DATETIME DEFAULT NULL,
        last_heartbeat DATETIME DEFAULT NULL,
        registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_provider BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        is_busy BOOLEAN DEFAULT FALSE,
        health_check_failures TINYINT DEFAULT 0,
        rsa_public_key TEXT
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS task_logs (
        task_id VARCHAR(36) PRIMARY KEY,
        provider_peer_id VARCHAR(255) NOT NULL,
        requester_peer_id VARCHAR(255) NOT NULL,
        task_type ENUM('summarization', 'translation', 'creative_writing', 'other') NOT NULL,
        input_char_count INT DEFAULT 0,
        started_at DATETIME DEFAULT NULL,
        completed_at DATETIME DEFAULT NULL,
        job_duration_ms INT DEFAULT NULL,
        tokens_generated INT DEFAULT NULL,
        tokens_per_second FLOAT DEFAULT NULL,
        status ENUM('in_progress', 'completed', 'failed') DEFAULT 'in_progress',
        FOREIGN KEY (provider_peer_id) REFERENCES peers(peer_id)
      )
    `);

    console.log('[DB] Migrations applied successfully.');
  } finally {
    connection.release();
  }
}

module.exports = { runMigrations };
