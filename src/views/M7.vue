<template>
	<LineChart v-if="teslaMetrics.length" title="Tesla 未來市盈率 PE Forwards" :chart-data="teslaMetrics" />
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { metricsApi } from '@/api/metrics'
	import LineChart from '@/components/LineChart.vue'

	const teslaMetrics = ref<any[]>([])

	onMounted(async () => {
		const response = await metricsApi.getStatementBySymbol('TSLA')
		teslaMetrics.value = response.data
	})
</script>

<style scoped></style>
