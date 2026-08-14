<script lang="ts">
	import { resolve } from '$app/paths';
	const props: { submitPassword: (val: string) => void } = $props();

	let password = $state('');
</script>

<h1>Welcome</h1>
<span>Beginner tour <a href={resolve('/docs/')}>here</a></span>
<div class="horizontal">
	<input
		bind:value={password}
		type="password"
		name="password"
		id="password"
		placeholder="Enter a password"
	/>
	<button class="icon" onclick={() => props.submitPassword(password)}>✔️</button>
</div>
