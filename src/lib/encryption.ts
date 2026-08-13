const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function deriveKey(password: string, salt: ArrayBuffer) {
	const passwordKey = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		'PBKDF2',
		false,
		['deriveKey']
	);

	return crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt,
			iterations: 100_000,
			hash: 'SHA-256'
		},
		passwordKey,
		{
			name: 'AES-GCM',
			length: 256
		},
		false,
		['encrypt', 'decrypt']
	);
}

export async function encrypt(text: string, password: string) {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const iv = crypto.getRandomValues(new Uint8Array(12));

	const key = await deriveKey(password, salt.buffer);

	const ciphertext = await crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv
		},
		key,
		encoder.encode('check' + text)
	);

	// Store salt + IV + ciphertext together
	const result = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);

	result.set(salt, 0);
	result.set(iv, salt.length);
	result.set(new Uint8Array(ciphertext), salt.length + iv.length);

	return btoa(String.fromCharCode(...result));
}

export async function decrypt(encrypted: string, password: string) {
	const data = Uint8Array.from(atob(encrypted), (c) => c.charCodeAt(0));

	const salt = data.slice(0, 16);
	const iv = data.slice(16, 28);
	const ciphertext = data.slice(28);

	const key = await deriveKey(password, salt.buffer);

	const plaintext = await crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv
		},
		key,
		ciphertext
	);

	const decrypted_txt = decoder.decode(plaintext);
	if (!decrypted_txt.startsWith('check')) throw new DOMException('UnauthorizedAccess');

	return decrypted_txt.slice('check'.length);
}
