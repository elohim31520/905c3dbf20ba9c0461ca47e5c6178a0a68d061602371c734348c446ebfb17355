<template>
	<div class="bg-white p-10 rounded-lg shadow-primary">
		<h1 class="text-20 font-bold mb-4 color-#434343">交易紀錄</h1>
		<van-list v-model:loading="loading" :finished="finished" finished-text="沒有更多了" @load="onLoad">
			<div v-for="item in list" :key="item.id" class="bb-gray-1 pb-10 mb-4">
				<div>
					<span class="font-500">股票代號:</span> <span class="color-#565656">{{ item.stock_id }}</span>
				</div>
				<div>
					<span class="font-500">類型:</span>
					<span class="color-#565656">{{ item.transaction_type === 'buy' ? '買入' : '賣出' }}</span>
				</div>
				<div>
					<span class="font-500">數量:</span> <span class="color-#565656">{{ item.quantity }}</span>
				</div>
				<div>
					<span class="font-500">價格:</span> <span class="color-#565656">{{ item.price }}</span>
				</div>
				<div>
					<span class="font-500">日期:</span> <span class="color-#565656">{{ item.transaction_date }}</span>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { transactionApi } from '../api/transaction'
import type { ResponseData } from '../types/api'

type Transaction = {
	id: string
	stock_id: string
	transaction_type: 'buy' | 'sell'
	quantity: number
	price: number
	transaction_date: string
}

const list = ref<Transaction[]>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
	loading.value = true
	const res: ResponseData<Transaction[]> = await transactionApi.getAllTransactions()
	if (res.data && res.data.length > 0) {
		list.value.push(...res.data)
	} else {
		finished.value = true
	}
}
</script>
