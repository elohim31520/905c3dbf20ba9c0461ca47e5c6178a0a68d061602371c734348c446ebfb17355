<template>
	<div class="bg-white p-10">
		<div class="text-16 font-bold mb-4 color-#656565">我的投資組合</div>

		<van-tabs v-model:active="activeTab" color="#F472B6">
			<van-tab title="持股詳情">
				<div v-if="portfolioStore.portfolioData.length > 0" class="mt-10">
					<van-cell-group inset>
						<van-cell v-for="item in portfolioStore.portfolioData" :key="item.stock_id">
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
					<PortfolioChart ref="portfolioChartRef"/>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import PortfolioChart from '../components/PortfolioChart/index.vue'
	import { usePortfolioStore } from '@/stores/portfolio'

	const portfolioStore = usePortfolioStore()

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
		portfolioStore.fetchMyPortfolio()
	})
</script>
