<template>
	<div class="w-full" :style="pageStyle">
		<iframe src="https://lazypod.org/iframe" class="w-full h-full border-0"></iframe>
	</div>
</template>

<script setup lang="ts">
	import { computed, type CSSProperties } from 'vue'

	defineOptions({
		name: 'info',
	})

	const pageStyle = computed(
		(): CSSProperties => ({
			height: `calc(100vh - 60px - 67px)`,
		})
	)
</script>
