<template>
	<v-chart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
	import { computed, provide, reactive } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart } from 'echarts/charts'
	import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
	import VChart, { THEME_KEY } from 'vue-echarts'
	import type { EChartsOption } from 'echarts'

	use([
		CanvasRenderer,
		LineChart,
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		GridComponent
	])

	provide(THEME_KEY, '#fff')

	const props = defineProps<{
		title: string
		lineColor?: string
		chartData: any[]
	}>()

	const xAxisData = computed(() => {
		return props.chartData.map(item =>
			new Date(item.createdAt).toLocaleDateString()
		)
	})

	const seriesData = computed(() => {
		return props.chartData.map(item =>
			parseFloat(item.peForward)
		)
	})

	const option = computed<EChartsOption>(() => ({
		title: {
			text: props.title,
			left: 'center'
		},
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			type: 'category',
			data: xAxisData.value
		},
		yAxis: {
			type: 'value',
			scale: true
		},
		series: [
			{
				type: 'line',
				smooth: true,
				data: seriesData.value,
				itemStyle: {
					color: props.lineColor || '#f472b6',
				},
			},
		],
	}))
</script>

<style scoped>
	.chart {
		height: 100vh;
	}
</style>
