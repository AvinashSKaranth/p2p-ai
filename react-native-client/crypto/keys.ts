import { Crypto } from '@peculiar/webcrypto';

const crypto = new Crypto();

const KEY_ALGO: RsaHashedKeyGenParams = { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' };
const AES_ALGO: AesKeyGenParams = { name: 'AES-GCM', length: 256 };

export async function generateRSAKeyPair() {
  return crypto.subtle.generateKey(KEY_ALGO, true, ['encrypt', 'decrypt']);
}

export async function exportRSAPublicKey(key: CryptoKey) {
  const exported = await crypto.subtle.exportKey('spki', key);
  const b64 = arrayBufferToBase64(exported);
  return `-----BEGIN PUBLIC KEY-----\n${b64.match(/.{1,64}/g)?.join('\n') || b64}\n-----END PUBLIC KEY-----`;
}

export async function importRSAPublicKey(pem: string) {
  const b64 = pem.replace(/-----BEGIN PUBLIC KEY-----/, '').replace(/-----END PUBLIC KEY-----/, '').replace(/\s/g, '');
  const ab = base64ToArrayBuffer(b64);
  return crypto.subtle.importKey('spki', ab, KEY_ALGO, true, ['encrypt']);
}

export async function generateAESKey() {
  return crypto.subtle.generateKey(AES_ALGO, true, ['encrypt', 'decrypt']);
}

export async function encryptAESKeyWithRSA(aesKey: CryptoKey, rsaPublicKey: CryptoKey) {
  const exported = await crypto.subtle.exportKey('raw', aesKey);
  const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, rsaPublicKey, exported);
  return arrayBufferToBase64(encrypted);
}

export async function decryptAESKeyWithRSA(encryptedBase64: string, rsaPrivateKey: CryptoKey) {
  const encrypted = base64ToArrayBuffer(encryptedBase64);
  const decrypted = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, rsaPrivateKey, encrypted);
  return crypto.subtle.importKey('raw', decrypted, AES_ALGO, true, ['encrypt', 'decrypt']);
}

export async function encryptPayload(aesKey: CryptoKey, plaintext: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, encoder.encode(plaintext));
  return { iv: arrayBufferToBase64(iv), ciphertext: arrayBufferToBase64(ciphertext) };
}

export async function decryptPayload(aesKey: CryptoKey, ivBase64: string, ciphertextBase64: string) {
  const iv = base64ToArrayBuffer(ivBase64);
  const ciphertext = base64ToArrayBuffer(ciphertextBase64);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, ciphertext);
  return new TextDecoder().decode(decrypted);
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}
