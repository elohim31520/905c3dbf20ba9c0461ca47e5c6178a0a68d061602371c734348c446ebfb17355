<template>
	<div class="grid grid-cols-1 gap-4 px-5 mt-8">
		<div>
			<ul>
				<li v-for="stock in stocks" :key="stock.id" class="flex items-center py-2 px-10 py-20 shadow-primary gap-5">
					<CompanyIcon :symbol="stock.symbol" />
					<span class="color-gray-600">{{ stock.company }}</span>
					<span class="text-green-600 ml-auto" :class="{ 'text-red-600': +stock.dayChg < 0 }">{{ stock.dayChg }}%</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from 'vue'
	import { useRouter } from 'vue-router'
	import { stockApi } from '../api/stock'
	import CompanyIcon from '../components/CompanyIcon.vue'

	const stocks = ref<any[]>([])
	const router = useRouter()

	onMounted(async () => {
		const response = await stockApi.getTodayStocks()
		stocks.value = response.data
	})
</script>
