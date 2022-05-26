<script lang="ts">
	export let name: string;
	export let value: any | undefined = undefined;
	export let label: string = name;
	export let placeholder: string = name;
	export let datalist: string[] | undefined = undefined;
	export let autofocus: boolean | null | undefined = undefined;
</script>

<label class="block sm:inline-block grow w-full text-neutral-500 text-sm">
	<span class="block">{label}</span>
	<input type="text" {autofocus} {name} {placeholder} list="{name}-datalist" bind:value />
</label>

{#if datalist}
	<datalist id="{name}-datalist">
		{#each datalist as value}
			<option {value} />
		{/each}
	</datalist>
{/if}

<style>
	input {
		@apply w-full p-2 text-base font-normal text-gray-700 placeholder-neutral-300 bg-white bg-clip-padding border border-solid border-neutral-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-lime-600 focus:outline-none;
	}
</style>
