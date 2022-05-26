<script lang="ts">
	export let name: string;
	export let label: string = name;
	export let placeholder: string = name;
	export let datalist: string[] | undefined = undefined;
	export let autofocus: boolean | null | undefined = undefined;
</script>

<label class="block sm:inline-block grow">
	<span>{label}</span>
	<input type="text" {autofocus} {name} {placeholder} list="{name}-datalist" class="w-full" />
</label>

{#if datalist}
	<datalist id="{name}-datalist">
		{#each datalist as value}
			<option {value} />
		{/each}
	</datalist>
{/if}
