<script lang="ts">
	import type { SafePersistantState } from '$lib/persistedEncryptedState.svelte';
	import type { AppStorageStructure } from '$lib/types';
	import { SinWeightProperty } from '$lib/types';

	let {
		stored,
		addSinToCommandment,
		editSin,
		createPartyEffect
	}: {
		stored: SafePersistantState<AppStorageStructure>;
		addSinToCommandment: (commandment: number) => void;
		editSin: (uid: string) => void;
		createPartyEffect: () => void;
	} = $props();
	const commandment_descriptions = [
		'1st commandment',
		'2nd commandment',
		'3rd commandment',
		'4th commandment',
		'5th commandment',
		'6th commandment',
		'7th commandment',
		'8th commandment',
		'9th commandment',
		'10th commandment',
		'Additional'
	];

	let time_since_last_confession = $derived.by(() => {
		const today_datestamp = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24);
		const days_since_last_confession = today_datestamp - stored.value.last_confession;
		if (days_since_last_confession < 7) return days_since_last_confession + 'd';
		const weeks_since_last_confession = Math.floor(days_since_last_confession / 7);
		if (weeks_since_last_confession < 52 / 12) return weeks_since_last_confession + 'w';
		const months_since_last_confession = Math.floor(days_since_last_confession / (365 / 12));
		if (months_since_last_confession < 12) return months_since_last_confession + 'm';
		const years_since_last_confession = Math.floor(days_since_last_confession / 365);
		if (years_since_last_confession < 100) return years_since_last_confession + 'y';
		const centuries_since_last_confession = Math.floor(days_since_last_confession / 365 / 100);
		return centuries_since_last_confession + 'c';
	});

	function finishConfession() {
		stored.value.last_confession = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24);
		stored.value.sins = [];
		createPartyEffect();
	}

	function removeSin(uid: string) {
		stored.value.sins = stored.value.sins.filter((v) => v.uid != uid);
	}
</script>

<ol class="vertical-left-align width-full">
	{#each commandment_descriptions as commandment_desc, index (commandment_desc)}
		<li class="width-full">
			<div class="horizontal width-full space-between">
				<h2>{commandment_desc}</h2>
				<button class="icon" onclick={() => addSinToCommandment(index)}>➕</button>
			</div>
			<ul class="vertical-left-align width-full">
				{#each stored.value.sins.filter((s) => s.commandment == index) as sin (sin.uid)}
					<li class="horizontal width-full">
						<button class="icon" onclick={() => removeSin(sin.uid)}>🗑️</button>
						<button class="like-anchor text-left" onclick={() => editSin(sin.uid)}
							>{sin.weight == SinWeightProperty.MORTAL ? '⚠️' : ''}{sin.sin.split('\n')[0]}</button
						>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ol>

<button class="width-full" onclick={finishConfession}
	>Close {time_since_last_confession} of sins</button
>
