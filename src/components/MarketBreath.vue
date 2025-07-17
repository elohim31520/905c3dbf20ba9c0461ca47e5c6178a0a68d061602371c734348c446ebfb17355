<template>
	<div class="bg-white p-10 shadow-primary">
		<div class="text-18 font-bold mb-4">標普500漲跌佔整體百分比:</div>
		<div class="text-16 font-bold color-primary">{{ formatFloat(marketBreadth) }}%</div>
		<v-chart class="chart" :option="chartOption" style="height: 400px" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { marketApi } from '../api/market'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const marketBreadth = ref<number>(0)

async function fetchMarketBreadth() {
	const res = await marketApi.getMarketBreadth()
	if (res.success) {
		marketBreadth.value = res.data
	}
}

const formatFloat = (value: number) => {
	const num = value * 100
	return num.toFixed(2)
}

onMounted(() => {
	fetchMarketBreadth()
})

const chartOption = computed(() => {
	return {
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)',
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['上漲', '下跌'],
		},
		series: [
			{
				name: '上漲',
				type: 'pie',
				radius: '50%',
				center: ['50%', '60%'],
				color: ['#16A34A', '#DC2626'],
				data: [
					{ value: formatFloat(	marketBreadth.value), name: '上漲' },
					{ value: formatFloat(1 - marketBreadth.value), name: '下跌' },
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	}
})
</script>
