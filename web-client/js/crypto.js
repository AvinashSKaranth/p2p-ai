const KEY_ALGO = { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' };
const AES_ALGO = { name: 'AES-GCM', length: 256 };

export async function generateRSAKeyPair() {
  return window.crypto.subtle.generateKey(KEY_ALGO, true, ['encrypt', 'decrypt']);
}

export async function exportRSAPublicKey(key) {
  const exported = await window.crypto.subtle.exportKey('spki', key);
  const b64 = arrayBufferToBase64(exported);
  return `-----BEGIN PUBLIC KEY-----\n${b64.match(/.{1,64}/g).join('\n')}\n-----END PUBLIC KEY-----`;
}

export async function importRSAPublicKey(pem) {
  const b64 = pem.replace(/-----BEGIN PUBLIC KEY-----/, '').replace(/-----END PUBLIC KEY-----/, '').replace(/\s/g, '');
  const ab = base64ToArrayBuffer(b64);
  return window.crypto.subtle.importKey('spki', ab, KEY_ALGO, true, ['encrypt']);
}

export async function generateAESKey() {
  return window.crypto.subtle.generateKey(AES_ALGO, true, ['encrypt', 'decrypt']);
}

export async function encryptAESKeyWithRSA(aesKey, rsaPublicKey) {
  const exported = await window.crypto.subtle.exportKey('raw', aesKey);
  const encrypted = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, rsaPublicKey, exported);
  return arrayBufferToBase64(encrypted);
}

export async function decryptAESKeyWithRSA(encryptedBase64, rsaPrivateKey) {
  const encrypted = base64ToArrayBuffer(encryptedBase64);
  const decrypted = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, rsaPrivateKey, encrypted);
  return window.crypto.subtle.importKey('raw', decrypted, AES_ALGO, true, ['encrypt', 'decrypt']);
}

export async function encryptPayload(aesKey, plaintext) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const ciphertext = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, encoder.encode(plaintext));
  return { iv: arrayBufferToBase64(iv), ciphertext: arrayBufferToBase64(ciphertext) };
}

export async function decryptPayload(aesKey, ivBase64, ciphertextBase64) {
  const iv = base64ToArrayBuffer(ivBase64);
  const ciphertext = base64ToArrayBuffer(ciphertextBase64);
  const decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, ciphertext);
  return new TextDecoder().decode(decrypted);
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}
