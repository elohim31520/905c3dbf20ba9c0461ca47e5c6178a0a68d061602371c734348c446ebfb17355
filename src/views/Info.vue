<template>
	<div class="w-full overflow-hidden" :style="pageStyle">
		<iframe src="https://lazypod.org/iframe" class="w-full h-full border-0"></iframe>
	</div>
</template>

<script setup lang="ts">
	import { computed, type CSSProperties } from 'vue'

	const pageStyle = computed(
		(): CSSProperties => ({
			height: `calc(100vh - ${60}px - ${67.5}px)`,
		})
	)
</script>
