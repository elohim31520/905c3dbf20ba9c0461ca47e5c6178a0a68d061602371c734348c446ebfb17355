<template>
	<div class="grid grid-cols-1 gap-4 px-5 mt-8">
		<div>
			<ul>
				<li v-for="stock in stocks" :key="stock.id" class="flex items-center py-2 px-10 py-20 shadow-primary gap-5">
					<img :src="`/logo/${stock.symbol || 'default'}.webp`" class="w-40 h-40 rounded-5" />
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
	import { marketApi } from '../api/market'

	const stocks = ref<any[]>([])
	const router = useRouter()

	onMounted(async () => {
		const response = await marketApi.getTodayStocks()
		stocks.value = response.data
	})
</script>
