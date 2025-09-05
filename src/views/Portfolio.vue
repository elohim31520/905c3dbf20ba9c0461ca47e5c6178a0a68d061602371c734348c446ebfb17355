<template>
	<div class="bg-white p-10">
		<div class="text-16 font-bold mb-4 color-#656565">我的投資組合</div>

		<van-notice-bar
			v-if="showNotice"
			left-icon="info-o"
			wrapable
			:scrollable="false"
			type="warning"
			class="mb-6"
			:mode="'closeable'"
			@close="showNotice = false"
		>
			注意：這裡持倉的均價與您的券商計算方式可能不同，券商是以FIFO LIFO計算均價，而我們是以平均成本計算均
			價。
		</van-notice-bar>

		<van-tabs v-model:active="activeTab" color="#F472B6">
			<van-tab title="持股詳情">
				<div v-if="portfolioStore.portfolioData.length > 0" class="mt-10">
					<van-cell-group>
						<van-swipe-cell
							v-for="item in portfolioStore.portfolioData"
							:key="item.stock_id"
							:right-width="65"
							:left-width="65"
							@close="(details) => onClose(details, item)"
						>
							<van-cell>
								<template #title>
									<span class="font-bold">{{ item.stock_id }}</span>
								</template>
								<div>數量: {{ item.quantity }}</div>
								<div>均價: {{ item.average_price }}</div>
								<div>總值: {{ formatNumber(item.quantity * item.average_price) }}</div>
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

		<TransactionFormPopup
			v-model="showUpdatePopup"
			:item="selectedItemForUpdate"
			@submit-success="onUpdateSuccess"
			:api-function="
				(payload) =>
					portfolioApi.updateMyPortfolio({
						stock_id: payload.stock_id,
						quantity: payload.quantity,
						average_price: payload.price,
					})
			"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { usePortfolioStore } from '@/stores/portfolio'
	import { portfolioApi } from '@/api/portfolio'
	import { formatNumber } from '@/modules/util'

	const portfolioStore = usePortfolioStore()

	const showNotice = ref(true)

	defineOptions({
		name: 'portfolio',
	})

	type PortfolioItem = {
		id?: number
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
	const showUpdatePopup = ref(false)
	const selectedItemForUpdate = ref<PortfolioItem | null>(null)

	const onClose = (details: any, item: PortfolioItem) => {
		const { position } = details

		switch (position) {
			case 'left':
				selectedItemForUpdate.value = item
				showUpdatePopup.value = true
				break
			case 'cell':
				break
			case 'right':
				showConfirmDialog({
					title: '確認',
					message: '確定要刪除嗎？',
				})
					.then(() => {
						if (!item.id) {
							showToast('缺少項目ID，無法刪除')
							return Promise.reject('Missing item id')
						}
						return portfolioApi.deleteMyPortfolio(item.id)
					})
					.then(() => {
						portfolioStore.fetchMyPortfolio()
						showToast('刪除成功')
					})
				break
		}
	}

	const onUpdateSuccess = () => {
		portfolioStore.fetchMyPortfolio()
	}

	onMounted(async () => {
		portfolioStore.fetchMyPortfolio()
	})
</script>
