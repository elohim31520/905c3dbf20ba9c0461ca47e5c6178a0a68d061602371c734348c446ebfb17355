<template>
	<div class="p-4 space-y-4">
		<div class="mb-60">
			<TradingviewGadget :symbol="symbol" :disabled="uiStore.isMenuShown" />
		</div>

		<van-notice-bar
			v-if="showNotice"
			left-icon="info-o"
			wrapable
			:scrollable="false"
			type="warning"
			:mode="'closeable'"
			@close="showNotice = false"
		>
			什麼是PE Forwards?
			未來市盈率(FPE)是預測未來一年公司的市盈率，用以判斷當前股價對於未來一年是高估還是低估。這是一個前瞻性的估值工具，能幫助投資人從「未來」的角度來評估一家公司的股票是否值得投資。
		</van-notice-bar>

		<LineChart v-if="metrics.length" :title="`${bigSymbol} 未來市盈率 PE Forwards`" :chart-data="metrics" />
		<div v-else>
			<div class="flex-y-center justify-center font-500 mb-10">{{ `${bigSymbol} 未來市盈率 PE Forwards` }}...</div>
			<div class="flex-y-center justify-center color-primary" @click="$router.push('/login')">
				點我登入，以查看完整資料
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { metricsApi } from '@/api/metrics'
	import { useUIStore } from '@/stores/ui'
	import { isAuthenticated } from '@/modules/auth'
	import { HOT_COMPANIES } from '@/constants/hotCompanies'

	const uiStore = useUIStore()
	const router = useRouter()
	const route = useRoute()

	const symbol = computed(() => {
		return route.params.symbol as string
	})

	const bigSymbol = computed(() => {
		return symbol.value?.toUpperCase()
	})

	const showNotice = ref(true)

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
