<script lang="ts">
	import { resolve } from '$app/paths';
	const props: { submitPassword: (val: string) => void } = $props();

	let password = $state('');
</script>

<h1>Welcome</h1>
<p class="text-center wrap-balance">
	<i>Supercharged list for recording sins and seeking forgiveness</i><br />
	💾Record - 😔Repent - 🌈Improve
</p>

<hr class="divider" />

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

<hr class="divider" />

<h3>Usefull links</h3>
<ul class="text-center">
	<li><a href={resolve('/docs')}>⭐Beginner tour</a></li>
	<li>
		<a href="https://www.jesuits.org/spirituality/the-ignatian-examen/">Daily Examine</a>
	</li>
</ul>
