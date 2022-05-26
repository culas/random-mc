<script>
	import { navigating } from '$app/stores';
</script>

<div class="animate-slide h-1 bg-lime-400 absolute w-1/2" class:hidden={$navigating === null} />

<style>
	.animate-slide {
		animation: slide 0.5s ease-in-out infinite alternate-reverse;
	}

	@keyframes slide {
		0% {
			left: -50%;
		}
		100% {
			left: 100%;
		}
	}
</style>
