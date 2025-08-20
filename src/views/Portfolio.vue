<template>
	<div class="bg-white p-10">
		<div class="text-16 font-bold mb-4 color-#656565">我的投資組合</div>

		<van-tabs v-model:active="activeTab" color="#F472B6">
			<van-tab title="持股詳情">
				<div v-if="portfolioData.length > 0" class="mt-10">
					<van-cell-group inset>
						<van-cell v-for="item in portfolioData" :key="item.stock_id">
							<template #title>
								<span class="font-bold">{{ item.stock_id }}</span>
							</template>
							<div>數量: {{ item.quantity }}</div>
							<div>均價: {{ item.average_price }}</div>
							<div>總值: {{ item.quantity * item.average_price }}</div>
						</van-cell>
					</van-cell-group>
				</div>
				<div v-else class="text-center text-gray-500 pt-10">正在載入資料或無持股...</div>
			</van-tab>
			<van-tab title="圖表分析">
				<div class="w-full h-[500px]">
					<PortfolioChart ref="portfolioChartRef" />
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { portfolioApi } from '../api/portfolio'
	import PortfolioChart from '../components/PortfolioChart/index.vue'

	defineOptions({
		name: 'portfolio',
	})

	type PortfolioItem = {
		stock_id: string
		quantity: number
		average_price: number
		[key: string]: any
	}

	interface PortfolioChartExposed {
		setChartOptions: (data: PortfolioItem[]) => void
	}

	const activeTab = ref(0)
	const portfolioData = ref<PortfolioItem[]>([])
	const portfolioChartRef = ref<PortfolioChartExposed | null>(null)

	onMounted(async () => {
		const res = await portfolioApi.getMyPortfolio()
		if (res.data && Array.isArray(res.data)) {
			portfolioData.value = res.data
			if (res.data.length > 0 && portfolioChartRef.value) {
				portfolioChartRef.value.setChartOptions(res.data)
			}
		} else {
			console.error('Portfolio data is not in expected format:', res.data)
			portfolioData.value = []
		}
		console.log('創建')
	})
</script>
