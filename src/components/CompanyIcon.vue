<template>
	<van-image :src="logoUrl" width="40" height="40" fit="cover" lazy-load>
		<template #error>
			<img :src="DEFAULT_LOGO_URL" class="w-40 h-40 rounded-5 object-cover" />
		</template>
	</van-image>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	const DEFAULT_LOGO_URL = '/logo/default.webp'

	defineOptions({
		name: 'CompanyIcon',
	})

	const props = defineProps<{
		symbol: string
	}>()

	const logoUrl = computed(() => {
		const symbol = props.symbol?.toLowerCase()
		if (!symbol) return DEFAULT_LOGO_URL
		return `/logo/${symbol}.webp`
	})
</script>
