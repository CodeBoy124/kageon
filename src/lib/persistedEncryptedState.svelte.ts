import { encrypt, decrypt } from '$lib/encryption';
import { browser } from '$app/env';

export class SafePersistantState<T> {
	value: T;
	key: string;
	password: string | null;
	constructor(key: string, initial: T) {
		this.key = key;
		this.password = $state<string | null>(null);
		this.value = $state(initial);

		if (browser) {
			$effect(() => {
				if (this.password == null) return;
				encrypt(JSON.stringify(this.value), this.password).then((v) => {
					localStorage.setItem(this.key, v);
				});
			});
		}
	}

	loadData(password: string, onError: () => void, onSuccess: () => void) {
		if (browser) {
			const current = localStorage.getItem(this.key);
			if (current != null) {
				decrypt(current, password)
					.then((v) => {
						this.value = JSON.parse(v);
						this.password = password;
						onSuccess();
					})
					.catch(() => {
						onError();
					});
			} else {
				this.password = password;
				onSuccess();
			}
		}
	}
}
