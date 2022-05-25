<script lang="ts">
	export let code: string;
	export let chains: string[][];
</script>

<h1>{code}</h1>

<form method="post">
	<label>
		block
		<input type="text" name="block" />
	</label>
	<label>
		drop
		<input type="text" name="drop" />
	</label>
	<button type="submit">add link</button>
</form>

<h2>Chains</h2>
<main>
	{#each chains as chain}
		<section>
			{#if chain}
				{#each chain as item}
					<div>
						{item}
						<form method="post" action="?_method=DELETE">
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
	section {
		display: flex;
		flex-wrap: wrap;
		max-width: 100%;
		overflow: hidden;
	}

	div {
		padding: 0.5rem;
		white-space: nowrap;
	}

	div + div::before {
		content: '>';
		margin-right: 1rem;
	}
</style>
