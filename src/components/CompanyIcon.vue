<template>
	<van-image :src="logoUrl" width="40" height="40" fit="cover" lazy-load>
		<template #error>
			<SvgIcon name="icon_ghost" size="2.5rem" />
		</template>
	</van-image>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	// const DEFAULT_LOGO_URL = '/logo/default.webp'

	defineOptions({
		name: 'CompanyIcon',
	})

	const props = defineProps<{
		symbol: string
	}>()

	const logoUrl = computed(() => {
		const symbol = props.symbol?.toLowerCase()
		return `/logo/${symbol}.webp`
	})
</script>
