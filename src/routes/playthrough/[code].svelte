<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';

	export let code: string;
	export let chains: string[][];
	export let error: string;

	let search = '';

	$: filtered = search && search.length > 2;
	$: filteredChains = filtered
		? chains.filter((chain) => chain.some((item) => item.includes(search)))
		: chains;
	$: chainStarts = chains.map(([first]) => first);
	$: chainEnds = chains.map((chain) => chain[chain.length - 1]);
</script>

<h2>Playthrough: {code}</h2>

<form method="post" class="mb-8 flex items-end gap-2 w-full sm:w-3/4 xl:w-1/2">
	<TextInput name="block" datalist={chainEnds} autofocus />
	<TextInput name="drop" placeholder="dropped item" datalist={chainStarts} />
	<button type="submit" class="btn">add link</button>
	{#if error}
		<p class="text-sm text-red-500">Error: {error}</p>
	{/if}
</form>

<form class="relative mb-8 w-full sm:w-1/2 xl:w-1/4">
	<TextInput name="search" placeholder="enter search term to filter" bind:value={search}></TextInput>
	<svg
		class="w-4 absolute bottom-3 right-2 text-neutral-300"
		aria-hidden="true"
		focusable="false"
		data-prefix="fas"
		data-icon="search"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
	>
		<path
			fill="currentColor"
			d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
		/>
	</svg>
</form>

<h2>Chains</h2>
<main>
	{#each filteredChains as chain}
		<section class="flex flex-wrap gap-2 mb-6">
			{#if chain}
				{#each chain as item}
					<div
						class="p-2 pl-4 relative rounded shadow-lg hover:shadow-xl transition duration-150 ease-in-out bg-neutral-900 text-white whitespace-nowrap"
						class:bg-yellow-600={filtered && item.includes(search)}
					>
						<div
							class="arrow-l absolute left-0 top-3 border-solid border-l-white border-l-8 border-y-transparent border-y-8 border-r-0 transition duration-150 ease-in-out"
						/>
						<div
							class="arrow-r absolute -right-2 top-3 border-solid border-l-neutral-900 border-l-8 border-y-transparent border-y-8 border-r-0 transition duration-150 ease-in-out"
							class:border-l-yellow-600={filtered && item.includes(search)}
						/>
						<span>{item}</span>
						<form method="post" action="?_method=DELETE" class="inline-block">
							<input type="text" hidden name="item" value={item} />
							<button
								type="submit"
								class="bg-white bg-opacity-20 hover:bg-red-600 transition duration-150 ease-in-out rounded-full"
								>&#x2715;</button
							>
						</form>
					</div>
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

<style>
	section button {
		width: 20px;
		line-height: 20px;
		font-size: x-small;
		vertical-align: text-bottom;
	}

	section > div:first-child .arrow-l,
	section > div:last-child .arrow-r {
		display: none;
	}
</style>
