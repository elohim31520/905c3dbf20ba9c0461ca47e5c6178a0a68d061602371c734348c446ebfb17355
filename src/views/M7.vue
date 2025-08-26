<template>
	<LineChart v-if="metrics[TSLA].length" title="Tesla 未來市盈率 PE Forwards" :chart-data="metrics[TSLA]" />
</template>

<script setup lang="ts">
	import { onMounted, reactive } from 'vue'
	import { metricsApi } from '@/api/metrics'
	import LineChart from '@/components/LineChart.vue'

	const TSLA = 'TSLA' as const

	const metrics = reactive({
		TSLA: [] as any[],
	})

	onMounted(async () => {
		const response = await metricsApi.getStatementBySymbol(TSLA)
		metrics[TSLA] = response.data
	})
</script>

<style scoped></style>
