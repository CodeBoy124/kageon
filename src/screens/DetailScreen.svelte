<script lang="ts">
	import type { SafePersistantState } from '$lib/persistedEncryptedState.svelte';
	import { SinWeightProperty, type AppStorageStructure } from '$lib/types';
	import { untrack } from 'svelte';

	let sin_txt_in = $state('');
	let sin_weight = $state(SinWeightProperty.VENIAL);

	const props: {
		stored: SafePersistantState<AppStorageStructure>;
		openedSinUid: string | null;
		isNewSin: boolean;
		goBackToOverview: () => void;
	} = $props();

	$effect(() => {
		const active_uid = props.openedSinUid;

		untrack(() => {
			const found_sin = props.stored.value.sins.find((s) => s.uid == active_uid);
			if (!active_uid) return;
			sin_txt_in = found_sin?.sin ?? '';
			sin_weight = found_sin?.weight ?? SinWeightProperty.VENIAL;
		});
	});

	function applyChange() {
		const active_uid = props.openedSinUid;
		const found_sin = props.stored.value.sins.find((s) => s.uid == active_uid);
		if (!active_uid) return;
		if (!found_sin) return;

		found_sin.weight = sin_weight;
		found_sin.sin = sin_txt_in;
		props.goBackToOverview();
	}

	function discardChange() {
		if (props.isNewSin) {
			props.stored.value.sins = props.stored.value.sins.filter((s) => s.uid != props.openedSinUid);
		}
		props.goBackToOverview();
	}
</script>

{#if props.openedSinUid != null}
	<div class="horizontal width-full space-center">
		<label for="sin-weight">Weight</label>
		<select bind:value={sin_weight} name="sin-weight" id="sin-weight">
			<option value={SinWeightProperty.VENIAL}>Venial</option>
			<option value={SinWeightProperty.MORTAL}>Mortal</option>
		</select>
	</div>

	<textarea class="width-full" bind:value={sin_txt_in} placeholder="Your sin"></textarea>

	<div class="horizontal width-full space-between">
		<button class="icon" onclick={discardChange}>❌</button>
		<button class="icon" onclick={applyChange}>✔️</button>
	</div>
{/if}
