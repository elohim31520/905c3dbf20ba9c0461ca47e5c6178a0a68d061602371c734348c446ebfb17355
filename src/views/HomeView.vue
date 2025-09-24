<template>
	<main class="p-4 space-y-4">
		<header>
			<h1 class="text-18 font-bold flex-center">{{ $t('home.title') }}</h1>
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
	import { useI18n } from 'vue-i18n'
	import { watchEffect } from 'vue'

	const { t } = useI18n()

	watchEffect(() => {
		useHead({
			title: t('home.meta_title'),
			meta: [
				{
					name: 'description',
					content: t('home.meta_description'),
				},
			],
		})
	})
</script>
