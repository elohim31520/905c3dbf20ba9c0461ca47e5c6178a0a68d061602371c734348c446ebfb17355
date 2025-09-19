<template>
	<main class="p-4 space-y-4">
		<MarketBreadth />
		<HeatMap class="h-500 my-10" />
		<VolatileAsset />
		<SeeMore :to="'/volatile-stock'" class="my-10" />
		<MomentumChart />

		<!-- 公司入口 -->
		<HotCompanies />
		<SeeMore :to="'/m7'" class="my-10" />
	</main>
</template>

<script setup lang="ts"></script>
