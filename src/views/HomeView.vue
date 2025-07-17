<script setup lang="ts">
import VolatileAsset from '../components/VolatileAsset.vue'
import MomentumChart from '../components/MomentumChart.vue'
import MarketBreadth from '../components/MarketBreath.vue'
</script>

<template>
	<main class="p-4 space-y-4">
		<MarketBreadth />
		<VolatileAsset />
		<MomentumChart />
	</main>
</template>
