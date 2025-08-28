<template>
	<div class="bg-white p-10">
		<div class="text-16 font-bold mb-4 color-#656565">我的投資組合</div>

		<van-tabs v-model:active="activeTab" color="#F472B6">
			<van-tab title="持股詳情">
				<div v-if="portfolioStore.portfolioData.length > 0" class="mt-10">
					<van-cell-group>
						<van-swipe-cell
							v-for="item in portfolioStore.portfolioData"
							:key="item.stock_id"
							:right-width="65"
							:left-width="65"
							async-close
							@close="(e) => onClose(e, item)"
						>
							<van-cell>
								<template #title>
									<span class="font-bold">{{ item.stock_id }}</span>
								</template>
								<div>數量: {{ item.quantity }}</div>
								<div>均價: {{ item.average_price }}</div>
								<div>總值: {{ item.quantity * item.average_price }}</div>
							</van-cell>
							<template #left>
								<div class="h-full flex items-center justify-center bg-primary text-white w-65px">更新</div>
							</template>
							<template #right>
								<div class="h-full flex items-center justify-center bg-red-500 text-white w-65px">刪除</div>
							</template>
						</van-swipe-cell>
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
	import { usePortfolioStore } from '@/stores/portfolio'
	import { portfolioApi } from '@/api/portfolio'

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
	const portfolioChartRef = ref<PortfolioChartExposed | null>(null)

	const onClose = (event: any, item: PortfolioItem) => {
		const { position, instance } = event
		switch (position) {
			case 'left':
			case 'cell':
				instance.close()
				break
			case 'right':
				showConfirmDialog({
					title: '確認',
					message: '確定要刪除嗎？',
				})
					.then(() => {
						portfolioApi.deleteMyPortfolio(item.id).then(res => {
							
						})
						instance.close()
					})
					.catch(() => {
						instance.close()
					})
				break
		}
	}

	onMounted(async () => {
		portfolioStore.fetchMyPortfolio()
	})
</script>