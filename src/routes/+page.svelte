<script lang="ts">
	import { ScreenKind, SinWeightProperty, type AppStorageStructure } from '$lib/types';
	import PasswordScreen from '../screens/PasswordScreen.svelte';
	import OverviewScreen from '../screens/OverviewScreen.svelte';
	import { SafePersistantState } from '$lib/persistedEncryptedState.svelte';
	import DetailScreen from '../screens/DetailScreen.svelte';

	let currentScreen = $state(ScreenKind.PASSWORD);
	let openedSinUid = $state<string | null>(null);
	let isNewSin = $state(false);

	let stored = new SafePersistantState<AppStorageStructure>('kageon_data', {
		sins: [],
		last_confession: Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24)
	});

	function onError() {
		currentScreen = ScreenKind.PASSWORD;
		alert('Incorrect password');
	}

	function onSuccess() {
		currentScreen = ScreenKind.OVERVIEW;
	}

	function receivePassword(pass: string) {
		stored.loadData(pass, onError, () => onSuccess());
	}

	function addSinToCommandment(commandment: number) {
		const uid = crypto.randomUUID();
		stored.value.sins.push({
			uid,
			weight: SinWeightProperty.VENIAL,
			commandment,
			sin: ''
		});

		openedSinUid = uid;
		isNewSin = true;
		currentScreen = ScreenKind.DETAIL;
	}

	function editSin(uid: string) {
		openedSinUid = uid;
		isNewSin = false;
		currentScreen = ScreenKind.DETAIL;
	}

	function goBackToOverview() {
		currentScreen = ScreenKind.OVERVIEW;
	}

	function createPartyEffect() {
		for (let i = 0; i < 30; i++) {
			setTimeout(() => {
				const size_options = ['large', 'x-large', 'xx-large'];
				const icon_options = ['🎈', '🌈', '😀'];
				const new_balloon_element = document.createElement('div');
				new_balloon_element.classList.add('balloon');
				new_balloon_element.innerText =
					icon_options[Math.floor(Math.random() * icon_options.length)];
				new_balloon_element.style.left = `${Math.floor(Math.random() * 100)}%`;
				new_balloon_element.style.fontSize =
					size_options[Math.floor(Math.random() * size_options.length)];
				new_balloon_element.style.animationDuration = `${5 + Math.floor(Math.random() * 6)}s`;
				document.body.appendChild(new_balloon_element);
				setTimeout(() => {
					document.body.removeChild(new_balloon_element);
				}, 10000);
			}, Math.random() * 5000);
		}
	}
</script>

<main class="vertical">
	{#if currentScreen == ScreenKind.PASSWORD}
		<PasswordScreen submitPassword={receivePassword} />
	{:else if currentScreen == ScreenKind.OVERVIEW}
		<OverviewScreen {stored} {addSinToCommandment} {editSin} {createPartyEffect} />
	{:else if currentScreen == ScreenKind.DETAIL}
		<DetailScreen {stored} {openedSinUid} {goBackToOverview} {isNewSin} />
	{:else}
		<h1>Err: unknown state</h1>
	{/if}
</main>
