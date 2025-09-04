<template>
	<div class="w-full overflow-hidden" :style="pageStyle">
		<iframe src="https://lazypod.org/iframe" class="w-full h-full border-0"></iframe>
	</div>
</template>

<script setup lang="ts">
	import { computed, type CSSProperties } from 'vue'

	// NOTE: 這些值是根據 App.vue 的佈局。 header 高度 60px，header 在 App.vue 中有 mb-10 的 class，換算後為 10px。
	// App.vue 的根元素有 pb-100 class，為 fixed footer 預留了 100px 的空間。
	// 因此，此頁面的實際可用高度為 100vh - (60+10)px - 100px
	const pageStyle = computed(
		(): CSSProperties => ({
			height: `calc(100vh - 70px - 100px)`,
		})
	)
</script>
