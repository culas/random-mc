<script lang="ts">
	import SubmitButton from '$lib/components/SubmitButton.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	export let error: string;
</script>

<p class="mb-4">
	A helper to keep track of the item drops in your randomized Minecraft playthrough. Inspired by <a
		href="https://www.twitch.tv/osie">Osie's</a
	>
	streams based on the <a href="https://fasguy.net/minecraft_randomizer/">Minecraft Randomizer</a>.
</p>

<form method="post" class="flex items-end gap-2 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
	<TextInput label="Name of playthrough" name="playthrough" placeholder="Enter a unique name" />
	<SubmitButton>open</SubmitButton>
</form>

{#if error}
	<p class="my-2 text-sm text-red-500">Error: {error}</p>
{/if}

<p class="text-xs mt-8">
	The name will be stripped of special characters and white space. Anyone knowing the name can
	access and modify your playthrough data. Enter a new name to create a new playthrough, or open an
	existing one with the corresponding name.
</p>
<p class="text-xs mt-4">This app is very much a work in progress, bugs are to be expected. :)</p>
