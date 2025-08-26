<template>
	<main class="p-4 space-y-4">
		<MarketBreadth />
		<VolatileAsset />
		<MomentumChart />

		<!-- 公司入口 -->
		<div class="space-y-4">
			<div class="text-20 font-bold color-#434343">探索熱門公司</div>
			<div class="grid grid-cols-3 gap-15 mb-20">
				<div
					v-for="company in companies"
					:key="company.id"
					@click="handleClick(company.id)"
					class="group relative cursor-pointer overflow-hidden rounded-10 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
				>
					<img
						:src="`/logo/${company.id}.webp`"
						class="h-full w-full transition-transform duration-300 group-hover:scale-110 object-cover"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
					<div
						class="absolute bottom-0 left-0 w-full p-4 transform-gpu translate-y-4 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
					>
						<div class="text-16 font-bold uppercase tracking-wider text-white">
							{{ company.id }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex-y-center justify-center color-primary">
			點我看更多
			<SvgIcon name="icon_arrow_right" size="1rem"/>

		</div>
		<TradingviewGadget symbol="TSLA" />
	</main>
</template>

<script setup lang="ts">
	import VolatileAsset from '../components/VolatileAsset.vue'
	import MomentumChart from '../components/MomentumChart.vue'
	import MarketBreadth from '../components/MarketBreath.vue'
	import { useRouter } from 'vue-router'
	import { ref } from 'vue'
	import TradingviewGadget from '../components/TradingviewGadget.vue'

	const companies = ref([
		{ id: 'tsla' },
		{ id: 'nvda' },
		{ id: 'pltr' },
		{ id: 'amzn' },
		{ id: 'goog' },
		{ id: 'meta' },
		{ id: 'msft' },
	])

	const router = useRouter()

	const handleClick = (feature: string) => {
		router.push({ path: '/recommend', query: { id: feature } })
	}
</script>
