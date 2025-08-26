<template>
	<van-tabs v-model:active="activeTab" type="card" class="p-2" color="#f472b6">
		<van-tab title="強勢股">
			<div class="grid grid-cols-1 gap-4 px-5 mt-8">
				<div>
					<ul>
						<li
							v-for="stock in winners"
							:key="stock.id"
							class="flex items-center py-2 px-10 py-20 shadow-primary gap-5"
						>
							<img :src="`/logo/${stock.symbol || 'default'}.png`" class="w-40 h-40 rounded-5" />
							<span class="color-gray-600">{{ stock.company }}</span>
							<span class="text-green-600 ml-auto">{{ stock.dayChg }}%</span>
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
						:key="stock.symbol"
						class="flex items-center py-2 px-10 py-20 shadow-primary gap-5"
					>
						<img :src="`/logo/${stock.symbol || 'default'}.png`" class="w-40 h-40 rounded-5" />
						<span class="color-gray-600">{{ stock.company }}</span>
						<span class="text-red-500 ml-auto">{{ stock.dayChg }}%</span>
					</li>
				</ul>
			</div>
		</van-tab>

		<div class="flex-y-center justify-center w-100% h-20 color-pink-300 my-10" @click="router.push('/volatile-stock')">
			看更多
			<van-icon name="arrow-down" size="1.5rem" />
		</div>
	</van-tabs>
</template>

<script lang="ts" setup>
	import { ref, onMounted, watch } from 'vue'
	import { useRouter } from 'vue-router'
	import { marketApi } from '../api/market'

	const winners = ref<any[]>([])
	const losers = ref<any[]>([])
	const activeTab = ref(0)
	const router = useRouter()

	onMounted(async () => {
		const winnersRes = await marketApi.getStockWinners()
		winners.value = winnersRes.data
	})

	watch(activeTab, async (newTab) => {
		// 省流：如果弱勢股沒有資料，再獲取弱勢股資料
		if (newTab === 1 && losers.value.length === 0) {
			const losersRes = await marketApi.getStockLosers()
			losers.value = losersRes.data
		}
	})
</script>
