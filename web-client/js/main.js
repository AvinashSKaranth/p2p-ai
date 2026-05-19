import * as crypto from './crypto.js';
import * as api from './api.js';
import * as llm from './llm.js';
import * as ui from './ui.js';
import * as peer from './peer.js';
import * as provider from './provider.js';
import * as requester from './requester.js';

const APP_STATE = {
  rsaKeyPair: null,
  isProvider: false,
  heartbeatInterval: null,
  peerId: null,
  providerListenerSetup: false,
};

function getOrCreatePeerId() {
  let id = localStorage.getItem('peerId');
  if (!id) {
    id = `web-${window.crypto.randomUUID ? window.crypto.randomUUID() : Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem('peerId', id);
  }
  return id;
}

function regeneratePeerId() {
  const newId = `web-${window.crypto.randomUUID ? window.crypto.randomUUID() : Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem('peerId', newId);
  return newId;
}

async function init() {
  try {
    ui.setStatus('peer-status', 'Generating keys...');
    APP_STATE.rsaKeyPair = await crypto.generateRSAKeyPair();
    const publicKeyPEM = await crypto.exportRSAPublicKey(APP_STATE.rsaKeyPair.publicKey);

    ui.setStatus('peer-status', 'Checking model...');
    const modelExists = await llm.checkModelExists();
    APP_STATE.isProvider = modelExists;
    updateModelUI(modelExists);

    const peerServerHost = window.location.hostname;
    const peerServerPort = parseInt(window.location.port) || (window.location.protocol === 'https:' ? 443 : 80);
    APP_STATE.peerId = getOrCreatePeerId();

    await connectPeer(peerServerHost, peerServerPort, publicKeyPEM);

    setupUIHandlers();
    window.addEventListener('beforeunload', gracefulDisconnect);
  } catch (e) {
    console.error('[Init] Fatal error:', e);
    ui.setStatus('peer-status', 'Initialization failed');
  }
}

function connectPeer(peerServerHost, peerServerPort, publicKeyPEM) {
  return new Promise((resolve) => {
    if (peer.getPeer()) {
      peer.destroyPeer();
    }

    peer.initPeer(APP_STATE.peerId, peerServerHost, peerServerPort);
    ui.setStatus('peer-id', APP_STATE.peerId);

    peer.getPeer().on('open', async () => {
      ui.setStatus('peer-status', 'Registering...');
      try {
        await api.registerPeer(APP_STATE.peerId, 'web', APP_STATE.isProvider, publicKeyPEM);
        ui.setStatus('peer-status', APP_STATE.isProvider ? 'Online (Provider)' : 'Online');
        ui.setStatus('peer-mode', APP_STATE.isProvider ? 'Provider + Requester' : 'Requester');
        startHeartbeat();
        if (APP_STATE.isProvider && !APP_STATE.providerListenerSetup) {
          APP_STATE.providerListenerSetup = true;
          await provider.listenForTasks(APP_STATE.rsaKeyPair.privateKey);
        }
        refreshProviderCount();
        resolve();
      } catch (e) {
        console.error('[Init] Registration failed:', e);
        ui.setStatus('peer-status', 'Registration failed');
        resolve();
      }
    });

    peer.getPeer().on('error', async (err) => {
      console.error('[PeerJS] Error:', err);
      if (err.type === 'unavailable-id' || err.message?.includes('is taken')) {
        console.warn('[PeerJS] ID unavailable, regenerating...');
        peer.destroyPeer();
        APP_STATE.peerId = regeneratePeerId();
        await connectPeer(peerServerHost, peerServerPort, publicKeyPEM);
        resolve();
      } else {
        ui.setStatus('peer-status', 'PeerJS error');
        resolve();
      }
    });

    peer.getPeer().on('disconnected', () => {
      ui.setStatus('peer-status', 'Disconnected');
    });
  });
}

function startHeartbeat() {
  if (APP_STATE.heartbeatInterval) clearInterval(APP_STATE.heartbeatInterval);
  APP_STATE.heartbeatInterval = setInterval(async () => {
    try {
      await api.heartbeat(APP_STATE.peerId);
      ui.setStatus('heartbeat-status', new Date().toLocaleTimeString());
    } catch (e) {
      console.error('[Heartbeat] Failed:', e);
      ui.setStatus('heartbeat-status', 'Failed');
    }
  }, 30000);
}

function gracefulDisconnect() {
  if (APP_STATE.heartbeatInterval) clearInterval(APP_STATE.heartbeatInterval);
  try {
    navigator.sendBeacon(`${api.getServerUrl()}/peers/${APP_STATE.peerId}`, JSON.stringify({}));
  } catch {}
  peer.destroyPeer();
}

function updateModelUI(exists) {
  const statusEl = document.getElementById('model-status');
  if (exists) {
    statusEl.textContent = 'Model available';
    ui.show('btn-delete-model');
    ui.hide('btn-download-model');
  } else {
    statusEl.textContent = 'Model not downloaded';
    ui.hide('btn-delete-model');
    ui.show('btn-download-model');
  }
}

async function refreshProviderCount() {
  try {
    const { providers } = await api.getAvailableProviders(50);
    ui.setStatus('provider-count', providers.length);
  } catch {
    ui.setStatus('provider-count', '?');
  }
}

function setupUIHandlers() {
  document.getElementById('btn-send').addEventListener('click', onSend);
  document.getElementById('chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); }
  });

  document.getElementById('btn-download-model').addEventListener('click', async () => {
    ui.setStatus('model-status', 'Downloading...');
    try {
      await llm.downloadModel((progress) => {
        ui.setStatus('model-status', `Downloading... ${Math.round(progress * 100)}%`);
      });
      updateModelUI(true);
      APP_STATE.isProvider = true;
      await api.registerPeer(APP_STATE.peerId, 'web', true, await crypto.exportRSAPublicKey(APP_STATE.rsaKeyPair.publicKey));
      ui.setStatus('peer-mode', 'Provider + Requester');
      if (!APP_STATE.providerListenerSetup) {
        APP_STATE.providerListenerSetup = true;
        provider.listenForTasks(APP_STATE.rsaKeyPair.privateKey);
      }
    } catch (e) {
      console.error('[Model] Download failed:', e);
      ui.setStatus('model-status', 'Download failed');
    }
  });

  document.getElementById('btn-delete-model').addEventListener('click', async () => {
    await llm.deleteModel();
    updateModelUI(false);
    APP_STATE.isProvider = false;
    await api.registerPeer(APP_STATE.peerId, 'web', false, await crypto.exportRSAPublicKey(APP_STATE.rsaKeyPair.publicKey));
    ui.setStatus('peer-mode', 'Requester');
  });

}

async function onSend() {
  const { text } = ui.getInput();
  if (!text) return;
  ui.addMessage(text, 'user');
  ui.clearInput();

  if (APP_STATE.isProvider) {
    ui.setStatus('peer-status', 'Busy (local)');
    const msgEl = ui.addMessage('', 'assistant', 'Local inference');
    let full = '';
    try {
      await llm.runInference(text, (token) => {
        full += token;
        ui.appendToMessage(msgEl, token);
      });
    } catch (e) {
      console.error('[Local] Inference error:', e);
      ui.addMessage('Local inference failed: ' + e.message, 'system');
    } finally {
      ui.setStatus('peer-status', 'Online (Provider)');
    }
  } else {
    try {
      await requester.sendTask(text);
    } catch (e) {
      console.error('[Requester] Error:', e);
      ui.addMessage('Request failed: ' + e.message, 'system');
    }
  }
}

init();
