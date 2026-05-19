const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { ExpressPeerServer } = require('peer');

const { runMigrations } = require('./db/migrations');
const { errorHandler } = require('./middleware/error-handler');
const { startHealthCheckScheduler } = require('./jobs/health-check');

const {
  registerPeer,
  heartbeat,
  getAvailableProviders,
  deletePeer,
} = require('./routes/peers');

const {
  startTask,
  completeTask,
} = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.url}`);
  next();
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://unpkg.com", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "ws:", "wss:", "blob:", "https://unpkg.com", "https://cdn.jsdelivr.net", "https://huggingface.co", "https://*.hf.co"],
      imgSrc: ["'self'", "data:", "blob:"],
      fontSrc: ["'self'", "data:"],
    },
  },
}));
app.use(cors());
app.use(express.json());

app.post('/peers/register', registerPeer);
app.get('/peers/available', getAvailableProviders);
app.post('/peers/heartbeat', heartbeat);
app.delete('/peers/:peer_id', deletePeer);

app.post('/tasks/start', startTask);
app.post('/tasks/complete', completeTask);

app.get('/health', (req, res) => {
  console.log('[Health] handler called');
  res.json({ status: 'ok' });
});

const peerServer = ExpressPeerServer(server, {
  path: '/',
  corsOptions: { origin: '*' },
});

app.use('/peer-server', peerServer);

app.use(express.static(path.join(__dirname, '..', 'web-client')));

app.use((req, res, next) => {
  console.log(`[404] ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

async function main() {
  await runMigrations();
  startHealthCheckScheduler();

  server.listen(PORT, () => {
    console.log(`[Server] HTTP API and PeerServer listening on port ${PORT}`);
  });

  peerServer.on('connection', (client) => {
    console.log(`[PeerServer] Client connected: ${client.id}`);
  });

  peerServer.on('disconnect', (client) => {
    console.log(`[PeerServer] Client disconnected: ${client.id}`);
  });

  peerServer.on('error', (err) => {
    console.error('[PeerServer] Error:', err.message);
  });
}

main().catch((err) => {
  console.error('[Fatal] Server failed to start:', err);
  process.exit(1);
});
