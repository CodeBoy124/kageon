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
</script>

<main class="vertical">
	{#if currentScreen == ScreenKind.PASSWORD}
		<PasswordScreen submitPassword={receivePassword} />
	{:else if currentScreen == ScreenKind.OVERVIEW}
		<OverviewScreen {stored} {addSinToCommandment} {editSin} />
	{:else if currentScreen == ScreenKind.DETAIL}
		<DetailScreen {stored} {openedSinUid} {goBackToOverview} {isNewSin} />
	{:else}
		<h1>Err: unknown state</h1>
	{/if}
</main>
