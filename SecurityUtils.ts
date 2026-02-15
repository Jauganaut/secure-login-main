
/**
 * Security utilities for encryption and anti-tamper logic.
 */

export async function encryptData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataUint8 = encoder.encode(data);
  
  // Create a random initialization vector
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  // Generate an ephemeral key for this session
  const key = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt']
  );

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    dataUint8
  );

  const exportedKey = await window.crypto.subtle.exportKey('raw', key);
  
  // Package as base64 [key_raw]:[iv]:[encrypted_data]
  const result = {
    k: btoa(String.fromCharCode(...new Uint8Array(exportedKey))),
    i: btoa(String.fromCharCode(...iv)),
    d: btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)))
  };

  return btoa(JSON.stringify(result));
}

export function getFingerprint(): string {
  const n = window.navigator;
  const components = [
    n.userAgent,
    n.language,
    (new Date()).getTimezoneOffset(),
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    n.hardwareConcurrency
  ];
  return btoa(components.join('|'));
}
export function isBotLikely(): boolean {
  const n = window.navigator as any;
  if (n.webdriver) return true;
  // Fix: Cast window to any to access non-standard chrome property used for bot detection
  if (!(window as any).chrome && n.vendor === 'Google Inc.') return true;
  if (n.plugins.length === 0) return true;
  return false;
}
