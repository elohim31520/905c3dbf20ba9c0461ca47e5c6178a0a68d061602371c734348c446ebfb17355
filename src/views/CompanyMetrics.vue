<template>
	<div class="p-4 space-y-4">
		<TradingviewGadget :symbol="symbol" :disabled="uiStore.isMenuShown" />
		<div class="mt-40">
			<LineChart v-if="metrics.length" :title="`${bigSymbol} 未來市盈率 PE Forwards`" :chart-data="metrics" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue'
	import TradingviewGadget from '@/components/TradingviewGadget.vue'
	import LineChart from '@/components/LineChart.vue'
	import { useRoute } from 'vue-router'
	import { metricsApi } from '@/api/metrics'
	import { useUIStore } from '@/stores/ui'
	import { isAuthenticated } from '@/modules/auth'
	import { HOT_COMPANIES } from '@/constants/hotCompanies'

	const uiStore = useUIStore()

	const route = useRoute()

	const symbol = computed(() => {
		return route.params.symbol as string
	})

	const bigSymbol = computed(() => {
		return symbol.value?.toUpperCase()
	})

	const metrics = ref<any[]>([])

	const getMetrics = async (symbol: string, days: number = 60) => {
		// 只有熱門股票的資料可以不做認證就可以看
		if (!HOT_COMPANIES.includes(_toUpper(symbol)) && !isAuthenticated()) return
		const response = await metricsApi.getStatementBySymbol(symbol, days)
		metrics.value = _reverse(_get(response, 'data', []))
	}

	onMounted(() => {
		getMetrics(symbol.value)
	})
</script>
