<script lang="ts">
	import { browser } from '$app/env';

	import '../app.css';
	const version = browser
		? document?.head.querySelector<HTMLMetaElement>('[name=version]')?.content ?? ''
		: '';
</script>

<main class="container mx-auto px-4 flex-grow">
	<h1>
		<a href="/">Random Minecraft Tracker</a>
		<span
			class="inline-block rounded align-top bg-lime-400 text-white text-bold text-xs text-center px-1"
			>BETA</span
		>
	</h1>
	<slot />
</main>

<footer class="text-center p-2 text-xs text-neutral-400">
	by celep, v{version}, <a href="https://github.com/culas/random-mc">GitHub</a>
</footer>
