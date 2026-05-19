# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`p2p-ai` is a distributed peer-to-peer AI inference network. Clients (web and mobile) run Gemma 4 on-device and can offload inference tasks to other peers when their own device is busy or lacks the model. A Node.js server acts only as a signaling and peer registry — no task content ever touches the server. All P2P communication is end-to-end encrypted.

This is a **monorepo** with three components:

| Directory | Purpose |
|-----------|---------|
| `web-client/` | Browser client — vanilla JS ES modules, Gemma 4 via MediaPipe WebGPU/WASM |
| `react-native-client/` | Expo/React Native mobile app (scaffolded, not yet implemented) |
| `requirements/Initial.md` | Complete system specification — server API, DB schema, encryption protocol, peer lifecycle |

## Common Commands

All commands run from the **repository root** unless noted.

### Package Manager
- Uses **pnpm** (`packageManager: "pnpm@10.33.0"` in root `package.json`)
- Run `pnpm install` from root to install server dependencies
- Run `cd react-native-client && pnpm install` for mobile client dependencies

### Server
```bash
# Start the Node.js server (requires MariaDB and .env configured)
pnpm start
# Equivalent to: node server/index.js
```

The server expects a `.env` file in the repo root with:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=...
DB_PASSWORD=...
DB_NAME=p2p_ai
```

### Web Client
```bash
# Serve the static web client (uses the `serve` package)
pnpm web
# Equivalent to: serve web-client -p 13080
```

The web client loads `index.html`, which pulls in `js/main.js` as an ES module. The `js/` directory contains the full client source (see Web Client Architecture below). MediaPipe WASM binaries are in `wasm/`.

### React Native Client
```bash
# Start the Expo dev server
pnpm expo:start

# Android
cd react-native-client && pnpm android
# iOS
cd react-native-client && pnpm ios

# Lint
cd react-native-client && pnpm lint
```

### Docker
```bash
# Build the Docker image
pnpm docker:build
# Publish to GHCR
pnpm docker:publish
# Build and publish
pnpm docker
```

The Dockerfile copies `server/` and `web-client/` into the image; `react-native-client/` is excluded via `.dockerignore`.

### Tests
There are no tests in this repo yet.

## High-Level Architecture

### P2P Inference Flow

1. **Registration:** Each client generates an RSA-OAEP 2048-bit key pair on mount, then calls `POST /peers/register` with its PeerJS ID and public key.
2. **Heartbeat:** Clients send `POST /peers/heartbeat` every 30 seconds. The server marks peers inactive if they miss two heartbeat windows (with 3 health-check retries).
3. **Provider Selection:** Requesters call `GET /peers/available?count=N`. The server returns the least-recently-used idle providers and their RSA public keys.
4. **Encrypted Task Dispatch:** The requester generates a fresh AES-256-GCM key per task, encrypts the payload with AES, encrypts the AES key with the provider's RSA public key, and sends the envelope over PeerJS DataConnection.
5. **Inference:** The provider decrypts the task, calls `POST /tasks/start` (server marks `is_busy = true`), runs Gemma 4 inference, and streams encrypted token chunks back to the requester.
6. **Completion:** The provider calls `POST /tasks/complete` with metrics; the server marks `is_busy = false` and derives `tokens_per_second`.

### Encryption

- **Hybrid RSA + AES scheme:** RSA-OAEP is used only to encrypt the per-request AES key. AES-GCM encrypts all actual content.
- **AES keys are request-scoped:** Stored in a `Map` keyed by `request_id`, never module-level. Both sides purge the key from the Map on `done: true`.
- **Fresh IV per message:** A new 12-byte random IV is generated for every AES-GCM encryption call. Reusing an IV with the same key is a critical vulnerability.
- **RSA private keys live only in memory** and are regenerated on every reconnect.

### Server Architecture

| File | Responsibility |
|------|----------------|
| `server/index.js` | Express app setup, route wiring, PeerServer (`/peer-server`), static file serving for `web-client/` |
| `server/db/connection.js` | `mysql2/promise` pool configured from `.env` |
| `server/db/migrations.js` | Auto-runs `CREATE TABLE IF NOT EXISTS` for `peers` and `task_logs` on startup |
| `server/routes/peers.js` | `POST /peers/register`, `POST /peers/heartbeat`, `GET /peers/available`, `DELETE /peers/:peer_id` |
| `server/routes/tasks.js` | `POST /tasks/start`, `POST /tasks/complete` |
| `server/jobs/health-check.js` | 60-second interval job: increments `health_check_failures` for stale peers, marks inactive after 3 failures, fails in-progress tasks |
| `server/middleware/error-handler.js` | Generic Express error handler |

Important implementation details:
- `getAvailableProviders` uses `SELECT ... FOR UPDATE` inside a transaction to prevent race conditions when updating `last_used`.
- `deletePeer` (graceful disconnect) marks `is_active = false`, `is_busy = false`, and updates any in-progress `task_logs` to `status = 'failed'`.
- The health check job updates `is_provider = false` when evicting a peer.

### Web Client Architecture

The web client is a set of vanilla JS ES modules in `web-client/js/` — no bundler is used in development, though `bundle.js` (from the upstream MediaPipe sample) is also present and may be stale.

| Module | Responsibility |
|--------|----------------|
| `main.js` | App bootstrap: RSA key generation, model check, PeerJS init, registration, heartbeat, UI event wiring |
| `crypto.js` | RSA-OAEP key pair generation/export/import, AES-GCM key generation, encrypt/decrypt helpers |
| `peer.js` | PeerJS wrapper: init, connect, destroy, connection event handling |
| `api.js` | HTTP fetch wrappers for all server endpoints |
| `provider.js` | Listens for incoming PeerJS DataConnections, decrypts tasks, runs local inference via `llm.js`, streams encrypted tokens back, calls `/tasks/start` and `/tasks/complete` |
| `requester.js` | Fetches available providers, encrypts and dispatches tasks over PeerJS, decrypts streamed token responses |
| `llm.js` | MediaPipe LLM Inference API wrapper: model download (OPFS), load, `runInference(prompt, onToken)` |
| `ui.js` | DOM helpers for chat messages, status updates, input handling |

Key web client behaviors:
- Peer ID is persisted in `localStorage` and regenerated if unavailable on the PeerJS server.
- If the Gemma 4 model exists in OPFS, the client registers as a provider and starts listening for tasks.
- Local inference takes priority: if the model is present, user prompts are handled locally first; P2P offloading is used only when the local device is not a provider.
- Model file is downloaded from HuggingFace (`gemma-4-E2B-it-web.task`) and stored via the Origin Private File System API.

### React Native Client Architecture

- **Framework:** Expo ~54 with `expo-router` (file-based routing). Entry point would be `app/_layout.tsx`, main screen `app/index.tsx`.
- **On-Device Inference:** `react-native-litert-lm` bridge to LiteRT-LM. Model file: `gemma-4-E2B-it.litertlm`.
- **P2P:** `@thyreality-inc/react-native-peerjs` (dependency present, not yet integrated).
- **Crypto:** `@peculiar/webcrypto` and `react-native-get-random-values` are installed for WebCrypto API support.
- **Current State:** `app/`, `components/`, and `hooks/` directories are empty. The mobile client is scaffolded but has no implementation yet.

## Important Design Constraints

- **`is_busy` is set by the provider, not the server.** The server only marks a peer busy when the provider itself calls `POST /tasks/start`. This prevents phantom busy states from failed connection attempts.
- **Server never sees task content.** Only metadata (char counts, timestamps, token counts) is persisted in `task_logs`.
- **Provider selection is fair-cycling** (`last_used ASC`) to distribute load across the pool.
- **Re-activation without deletion.** Inactive peers are not deleted from the DB; they re-enter the pool automatically on reconnection.
