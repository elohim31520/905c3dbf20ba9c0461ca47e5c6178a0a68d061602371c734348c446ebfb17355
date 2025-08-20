<template>
	<div class="bg-white p-10 shadow-primary">
		<div class="text-20 font-bold">公司列表</div>
		<div v-for="(company, index) in companies" :key="index" class="flex-y-center justify-between">
			<div class="w-100% flex-y-center justify-between color-#434343 h-60 px-5 shadow-primary">
				<div>{{ company.symbol }}</div>
				<div>{{ company.name }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { marketApi } from '../api/market'
	import type { Company } from '../types/api'

	defineOptions({
		name: 'companies',
	})

	const companies = ref<Company[]>([])

	onMounted(async () => {
		const response = await marketApi.getStockSymbols()
		if (response.data) {
			companies.value = response.data
		}
	})
</script>
