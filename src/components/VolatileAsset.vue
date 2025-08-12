<template>
	<van-tabs v-model:active="activeTab" type="card" class="p-2" color="#f472b6">
		<van-tab title="強勢股">
			<div class="grid grid-cols-1 gap-4 px-5 mt-8">
				<div>
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
			</div>
		</van-tab>

		<van-tab title="弱勢股">
			<div class="grid grid-cols-1 gap-4 px-5 my-10">
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
		</van-tab>
	</van-tabs>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from 'vue'
	import { marketApi } from '../api/market'

	const winners = ref<any[]>([])
	const losers = ref<any[]>([])
	const activeTab = ref(0)

	onMounted(async () => {
		const [winnersRes, losersRes] = await Promise.all([marketApi.getStockWinners(), marketApi.getStockLosers()])

		winners.value = winnersRes.data.slice(0, 5)
		losers.value = losersRes.data.slice(0, 5)
	})
</script>
