<template>
	<main class="p-4 space-y-4">
		<MarketBreadth />
		<VolatileAsset />
		<MomentumChart />

		<!-- 公司入口 -->
		<HotCompanies />

		<div class="flex-y-center justify-center color-primary">
			點我看更多
			<SvgIcon name="icon_arrow_right" size="1rem"/>

		</div>
		<TradingviewGadget symbol="TSLA" />
	</main>
</template>

<script setup lang="ts">
</script>
