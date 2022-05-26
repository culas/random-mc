<script lang="ts">
	import ChainItem from '$lib/components/ChainItem.svelte';
	import SearchIcon from '$lib/components/SearchIcon.svelte';
	import SubmitButton from '$lib/components/SubmitButton.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	export let code: string;
	export let chains: string[][];
	export let error: string;

	let search = '';

	$: filtered = search !== '' && search.length > 2;
	$: filteredChains = filtered
		? chains.filter((chain) => chain.some((item) => item.includes(search)))
		: chains;
	$: chainStarts = chains.map(([first]) => first);
	$: chainEnds = chains.map((chain) => chain[chain.length - 1]);
</script>

<h2>Playthrough: {code}</h2>

<form method="post" class="flex items-end gap-2 w-full sm:w-3/4 xl:w-1/2">
	<TextInput name="block" datalist={chainEnds} autofocus />
	<TextInput name="drop" placeholder="dropped item" datalist={chainStarts} />
	<SubmitButton>add link</SubmitButton>
</form>

{#if error}
	<p class="text-sm text-red-500">Error: {error}</p>
{/if}

<form class="relative my-8 w-full sm:w-1/2 xl:w-1/4">
	<TextInput name="search" placeholder="enter search term to filter" bind:value={search} />
	<SearchIcon />
</form>

<h2>Chains</h2>
<main>
	{#each filteredChains as chain}
		<section class="flex flex-wrap gap-2 mb-6">
			{#if chain}
				{#each chain as item}
					<ChainItem value={item} highlight={filtered && item.includes(search)} />
				{/each}
			{/if}
		</section>
	{:else}
		{#if chains.length === 0}
			no chains yet, link a block and its dropped item using the fields at the top
		{:else}
			no results found for: "{search}"
		{/if}
	{/each}
</main>
