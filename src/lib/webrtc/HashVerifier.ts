export async function sha256(data: ArrayBuffer | Uint8Array): Promise<string> {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  const digest = await crypto.subtle.digest('SHA-256', bytes as unknown as BufferSource);
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
}
export async function verifySha256(data: ArrayBuffer | Uint8Array, expected: string): Promise<boolean> { return (await sha256(data)).toLowerCase() === expected.toLowerCase(); }
