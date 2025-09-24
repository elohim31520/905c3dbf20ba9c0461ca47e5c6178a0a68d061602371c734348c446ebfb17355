<template>
	<van-tabs v-model:active="activeTab" type="card" class="p-2" color="#f472b6">
		<van-tab :title="$t('volatile_asset.strong_stocks')">
			<div class="grid grid-cols-1 gap-4 px-5 mt-8">
				<div>
					<ul>
						<li
							v-for="(stock, index) in winners"
							:key="index"
							class="flex items-center py-2 px-10 py-20 shadow-primary gap-5"
						>
							<img :src="`/logo/default.webp`" class="w-40 h-40 rounded-5" />
							<span class="color-gray-600">{{ stock.name }}</span>
							<span class="text-green-600 ml-auto">{{ stock.chg }}%</span>
						</li>
					</ul>
				</div>
			</div>
		</van-tab>

		<van-tab :title="$t('volatile_asset.weak_stocks')">
			<div class="grid grid-cols-1 gap-4 px-5 my-10">
				<ul>
					<li
						v-for="(stock, index) in losers"
						:key="index"
						class="flex items-center py-2 px-10 py-20 shadow-primary gap-5"
					>
						<img :src="`/logo/default.webp`" class="w-40 h-40 rounded-5" />
						<span class="color-gray-600">{{ stock.name }}</span>
						<span class="text-red-500 ml-auto">{{ stock.chg }}%</span>
					</li>
				</ul>
			</div>
		</van-tab>
	</van-tabs>
</template>

<script lang="ts" setup>
	import { ref, onMounted, watch } from 'vue'
	import { useRouter } from 'vue-router'
	import { stockApi } from '../api/stock'

	const winners = ref<any[]>([])
	const losers = ref<any[]>([])
	const activeTab = ref(0)
	const router = useRouter()

	onMounted(async () => {
		const winnersRes = await stockApi.getStockWinners()
		winners.value = winnersRes.data
	})

	watch(activeTab, async (newTab) => {
		// 省流：如果弱勢股沒有資料，再獲取弱勢股資料
		if (newTab === 1 && losers.value.length === 0) {
			const losersRes = await stockApi.getStockLosers()
			losers.value = _reverse(losersRes.data)
		}
	})
</script>
