let llmEngine = null;
let isDownloading = false;

const MODEL_URL = 'https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm/resolve/main/gemma-4-E2B-it-web.task';
const MODEL_NAME = 'gemma-4-E2B-it.task';

export async function checkModelExists() {
  try {
    const dir = await navigator.storage.getDirectory();
    const fileHandle = await dir.getFileHandle(MODEL_NAME);
    const file = await fileHandle.getFile();
    return file.size > 0;
  } catch {
    return false;
  }
}

export async function deleteModel() {
  try {
    const dir = await navigator.storage.getDirectory();
    await dir.removeEntry(MODEL_NAME);
  } catch {}
}

export async function downloadModel(onProgress) {
  if (isDownloading) return;
  isDownloading = true;
  try {
    const response = await fetch(MODEL_URL);
    const total = parseInt(response.headers.get('content-length') || '0', 10);
    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      if (total > 0 && onProgress) onProgress(received / total);
    }
    const blob = new Blob(chunks);
    const dir = await navigator.storage.getDirectory();
    const fileHandle = await dir.getFileHandle(MODEL_NAME, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
    if (onProgress) onProgress(1);
  } finally {
    isDownloading = false;
  }
}

export async function loadLLM(onToken) {
  if (llmEngine) return llmEngine;
  try {
    const module = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.27/genai_bundle.mjs');
    const { FilesetResolver, LlmInference } = module;
    const fileset = await FilesetResolver.forGenAiTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.27/wasm');
    const dir = await navigator.storage.getDirectory();
    const fileHandle = await dir.getFileHandle(MODEL_NAME);
    const file = await fileHandle.getFile();
    llmEngine = await LlmInference.createFromModelPath(fileset, URL.createObjectURL(file));
    return llmEngine;
  } catch (e) {
    console.error('[LLM] Failed to load model:', e);
    throw e;
  }
}

export async function runInference(prompt, onToken) {
  const engine = await loadLLM();
  return engine.generateResponse(prompt, (partialResult, done) => {
    if (onToken) onToken(partialResult);
  });
}

export function unloadLLM() {
  llmEngine = null;
}
