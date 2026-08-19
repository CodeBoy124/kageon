<script lang="ts">
	import type { SafePersistantState } from '$lib/persistedEncryptedState.svelte';
	import type { AppStorageStructure } from '$lib/types';
	import { CommandmentsVariant, SinWeightProperty } from '$lib/types';

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

	const commandment_titles = [
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

	const commandment_names = {
		[CommandmentsVariant.CATHOLIC]: [
			'I am the Lord thy God: You shall have no other gods but me.',
			'You shall not take the name of the Lord your God in vain.',
			"Remember to keep holy the Lord's Day.",
			'Honor your father and mother.',
			'You shall not kill.',
			'You shall not commit adultery.',
			'You shall not steal.',
			'You shall not bear false witness against your neighbor.',
			"You shall not covet your neighbor's wife.",
			"You shall not covet your neighbor's goods.",
			null
		],
		[CommandmentsVariant.PROTESTANT]: [
			'I am the Lord thy God: You shall have no other gods but me.',
			'You shall not make unto you any graven images.',
			'You shall not take the name of the Lord your God in vain.',
			"Remember to keep holy the Lord's Day.",
			'Honor your mother and father.',
			'You shall not murder.',
			'You shall not commit adultery.',
			'You shall not steal.',
			'You shall not bear false witness.',
			'You shall not covet anything that belongs to your neighbor.',
			null
		]
	};

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

<select bind:value={stored.value.commandments_variant}>
	<option value={CommandmentsVariant.CATHOLIC}>Catholic variant</option>
	<option value={CommandmentsVariant.PROTESTANT}>Protestant variant</option>
</select>

<ol class="vertical-left-align width-full">
	{#each commandment_titles as commandment_desc, index (commandment_desc)}
		<li class="width-full vertical">
			<div class="width-full">
				<div class="horizontal width-full space-between">
					<h2>{commandment_desc}</h2>
					<button class="icon" onclick={() => addSinToCommandment(index)}>➕</button>
				</div>
				{#if commandment_names[stored.value.commandments_variant ?? CommandmentsVariant.CATHOLIC][index] != null}
					<p>
						<i>
							{commandment_names[stored.value.commandments_variant ?? CommandmentsVariant.CATHOLIC][
								index
							]}
						</i>
					</p>
				{/if}
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
