<script lang="ts">
	export let code: string;
	export let chains: string[][];
</script>

<h1>{code}</h1>

<form method="post" class="mb-8">
	<label>
		<span>block</span>
		<input type="text" name="block" placeholder="block" />
	</label>
	<label>
		<span>drop</span>
		<input type="text" name="drop" placeholder="dropped item" />
	</label>
	<button type="submit">add link</button>
</form>

<h2>Chains</h2>
<main>
	{#each chains as chain}
		<section class="flex flex-wrap gap-2 mb-6">
			{#if chain}
				{#each chain as item}
					<div class="p-2 pl-4 relative rounded shadow-lg hover:shadow-xl transition duration-150 ease-in-out bg-neutral-900 text-white whitespace-nowrap">
						<div class="arrow-l absolute left-0 top-3 border-solid border-l-white border-l-8 border-y-transparent border-y-8 border-r-0"></div>
						<div class="arrow-r absolute -right-2 top-3 border-solid border-l-neutral-900 border-l-8 border-y-transparent border-y-8 border-r-0"></div>
						<span>{item}</span>
						<form method="post" action="?_method=DELETE" class="inline-block">
							<input type="text" hidden name="item" value={item} />
							<button type="submit">X</button>
						</form>
					</div>
				{/each}
			{/if}
		</section>
	{/each}
</main>

<style>
	section button {
		display: inline-block;
		padding: 0;
		width: 20px;
		line-height: 20px;
		font-size: x-small;
		text-align: center;
		border-radius: 100%;
	}
</style>
