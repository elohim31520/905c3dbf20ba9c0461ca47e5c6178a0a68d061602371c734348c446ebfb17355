<template>
	<div class="bg-gray-50">
		<div class="mx-10 bg-white p-10 rounded-15 shadow-lg">
			<h1 class="text-[24px] font-bold mb-6 text-gray-800">交易紀錄</h1>
			<Waterfall ref="waterfallRef" :apiFunction="transactionApi.getAllTransactions">
				<template #default="{ list }">
					<van-swipe-cell
						v-for="item in list"
						:key="item.id"
						:right-width="65"
						:left-width="65"
						@close="(details) => onClose(details, item)"
					>
						<div class="mb-15 border border-gray-200 rounded-lg p-4 transition-shadow duration-300 hover:shadow-md">
							<div class="flex justify-between items-start mb-3">
								<div>
									<span class="text-[14px] text-gray-500">股票代號</span>
									<p class="font-semibold text-[18px] text-gray-900">{{ item.stock_id }}</p>
								</div>
								<span
									:class="[
										'px-3 py-1 rounded-full text-[12px] font-semibold tracking-wide',
										item.transaction_type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
									]"
								>
									{{ item.transaction_type === 'buy' ? '買入' : '賣出' }}
								</span>
							</div>

							<div class="grid grid-cols-2 gap-4 text-[14px] mb-3">
								<div>
									<span class="text-gray-500">數量</span>
									<p class="text-gray-800">{{ item.quantity }}</p>
								</div>
								<div>
									<span class="text-gray-500">價格</span>
									<p class="text-gray-800">{{ item.price }}</p>
								</div>
							</div>

							<div class="text-right text-[12px] text-gray-400">
								{{ format(item.transaction_date, 'yyyy-MM-dd') }}
							</div>
						</div>
						<template #left>
							<div class="h-full flex items-center justify-center bg-primary text-white w-65px">更新</div>
						</template>
						<template #right>
							<div class="h-full flex items-center justify-center bg-red-500 text-white w-65px">刪除</div>
						</template>
					</van-swipe-cell>
				</template>
			</Waterfall>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, useTemplateRef } from 'vue'
	import { transactionApi } from '../api/transaction'
	import { showConfirmDialog } from 'vant'
	import { format } from 'date-fns'

	defineOptions({
		name: 'records',
	})

	const waterfallRef = useTemplateRef<InstanceType<typeof Waterfall>>('waterfall')

	type Transaction = {
		id: string
		stock_id: string
		transaction_type: 'buy' | 'sell'
		quantity: number
		price: number
		transaction_date: string
	}

	const onClose = (details: any, item: Transaction) => {
		const { position, instance } = details
		switch (position) {
			case 'left':
			case 'cell':
				break
			case 'right':
				showConfirmDialog({
					title: '確認',
					message: '確定要刪除嗎？',
				})
					.then(() => {
						return transactionApi.deleteTransaction(item.id)
					})
					.then(() => {
						waterfallRef.value?.refresh()
					})
				break
		}
	}
</script>
