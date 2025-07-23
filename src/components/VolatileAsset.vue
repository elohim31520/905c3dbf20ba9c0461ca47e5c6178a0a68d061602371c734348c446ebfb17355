<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { marketApi } from '../api/market'

const winners = ref<any[]>([])
const losers = ref<any[]>([])

onMounted(async () => {
	const [winnersRes, losersRes] = await Promise.all([marketApi.getStockWinners(), marketApi.getStockLosers()])

	winners.value = winnersRes.data.slice(0, 5)
	losers.value = losersRes.data.slice(0, 5)
})
</script>

<template>
	<div class="p-4 bg-white rounded-lg shadow-primary">
		<div class="grid grid-cols-1 gap-4 px-5">
			<div>
				<h3 class="font-bold text-green-600 mb-2">強勢股</h3>
				<ul>
					<li
						v-for="stock in winners"
						:key="stock.id"
						class="flex justify-between items-center py-2 px-10 py-20 shadow-primary"
					>
						<span class="color-gray-600">{{ stock.company }}</span>
						<span class="text-green-600">{{ stock.dayChg }}%</span>
					</li>
				</ul>
			</div>
			<div>
				<h3 class="font-bold text-red-500 mb-2">弱勢股</h3>
				<ul>
					<li
						v-for="stock in losers"
						:key="stock.id"
						class="flex justify-between items-center py-2 px-10 py-20 shadow-primary"
					>
						<span class="color-gray-600">{{ stock.company }}</span>
						<span class="text-red-500">{{ stock.dayChg }}%</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
