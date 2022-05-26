<script lang="ts">
	import DeleteButton from './DeleteButton.svelte';

	export let value: string;
	export let highlight: boolean = false;
</script>

<div
	class="p-2 pl-4 relative rounded shadow-lg hover:shadow-xl transition duration-150 ease-in-out bg-neutral-900 text-white whitespace-nowrap"
	class:bg-yellow-600={highlight}
>
	<i class="arrow-l left-0 border-l-white" />
	<i class="arrow-r -right-2 border-l-neutral-900" class:border-l-yellow-600={highlight} />
	<span>{value}</span>
	<form method="post" action="?_method=DELETE" class="inline-block">
		<input type="text" hidden name="item" {value} />
		<DeleteButton />
	</form>
</div>

<style>
	.arrow-l,
	.arrow-r {
		@apply absolute top-3 border-solid border-l-8 border-y-transparent border-y-8 border-r-0 transition duration-150 ease-in-out;
	}

	div:first-child .arrow-l,
	div:last-child .arrow-r {
		display: none;
	}
</style>
