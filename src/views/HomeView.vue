<template>
	<main class="p-4 space-y-4">
		<header>
			<h1 class="text-18 font-bold flex-center">美股市場總覽</h1>
		</header>
		<MomentumChart />
		<HeatMap class="h-500 my-10" />
		<MarketBreadth />
		<VolatileAsset />
		<SeeMore :to="'/volatile-stock'" class="my-10" />
		<!-- 公司入口 -->
		<HotCompanies />
		<SeeMore :to="'/m7'" class="my-10" />
	</main>
</template>

<script setup lang="ts">
	import { useHead } from '@vueuse/head'

	useHead({
		title: '首頁 - UrTrade',
		meta: [
			{
				name: 'description',
				content: '查看最新的市場動態、熱力圖和市場寬度數據，全面了解美股市場趨勢。',
			},
		],
	})
</script>
