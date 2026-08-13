<script lang="ts">
	import type { SafePersistantState } from '$lib/persistedEncryptedState.svelte';
	import type { AppStorageStructure } from '$lib/types';
	import { SinWeightProperty } from '$lib/types';

	let {
		stored,
		addSinToCommandment,
		editSin
	}: {
		stored: SafePersistantState<AppStorageStructure>;
		addSinToCommandment: (commandment: number) => void;
		editSin: (uid: string) => void;
	} = $props();
	const commandment_descriptions = [
		'1st',
		'2nd',
		'3rd',
		'4th',
		'5th',
		'6th',
		'7th',
		'8th',
		'9th',
		'10th'
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
	}

	function removeSin(uid: string) {
		stored.value.sins = stored.value.sins.filter((v) => v.uid != uid);
	}
</script>

<ol class="vertical-left-align">
	{#each commandment_descriptions as commandment_desc, index (commandment_desc)}
		<li>
			<div class="horizontal">
				<h2>{commandment_desc} commandment</h2>
				<button class="icon" onclick={() => addSinToCommandment(index)}>➕</button>
			</div>
			<ul class="vertical-left-align">
				{#each stored.value.sins.filter((s) => s.commandment == index) as sin (sin.uid)}
					<li class="horizontal">
						<button class="icon" onclick={() => removeSin(sin.uid)}>🗑️</button>
						<button
							class={sin.weight == SinWeightProperty.MORTAL
								? 'like-anchor mortal-sin'
								: 'like-anchor'}
							onclick={() => editSin(sin.uid)}>{sin.sin.split('\n')[0]}</button
						>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ol>

<button onclick={finishConfession}>Close {time_since_last_confession} of sins</button>
