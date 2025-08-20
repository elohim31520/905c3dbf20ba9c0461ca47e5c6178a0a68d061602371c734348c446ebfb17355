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
	import { companiesApi } from '@/api/companies'
	import type { ResponseData } from '@/types/api'

	defineOptions({
		name: 'companies',
	})

	const companies = ref<ResponseData | null>(null)
	const loading = ref(true)

	onMounted(async () => {
		const response = await companiesApi.getStockSymbols()
		if (response.data) {
			companies.value = response.data
		}
	})
</script>
