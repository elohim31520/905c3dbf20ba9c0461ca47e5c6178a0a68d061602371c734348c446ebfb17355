<template>
	<main class="p-4 space-y-4">
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

<script setup lang="ts"></script>
