<script lang="ts">
	const props: { submitPassword: (val: string) => void } = $props();

	let password = $state('');
</script>

<h1>Welcome</h1>
<span>Beginner tour <a href="#">here</a></span>
<div>
	<input
		bind:value={password}
		type="password"
		name="password"
		id="password"
		placeholder="Enter a password"
	/>
	<button onclick={() => props.submitPassword(password)}>✔️</button>
</div>
