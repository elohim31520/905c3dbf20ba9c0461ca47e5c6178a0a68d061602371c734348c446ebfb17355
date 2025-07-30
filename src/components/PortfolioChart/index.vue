<template>
	<div v-if="chartOptions" class="w-full h-full">
		<v-chart :option="chartOptions" autoresize />
	</div>
	<div v-else class="text-center text-gray-500 pt-10">正在載入資料或無持股...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { portfolioApi } from '../../api/portfolio'
import type { EChartsOption } from 'echarts'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

defineOptions({
	name: 'PortfolioChart',
})

type PortfolioItem = {
	stock_id: string
	quantity: number
	average_price: number
	[key: string]: any
}

const chartOptions = ref<EChartsOption | null>(null)

const setChartOptions = (data: PortfolioItem[]) => {
	chartOptions.value = {
		title: {
			text: '投資組合佔比',
			left: 'center',
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)',
		},
		legend: {
			orient: 'horizontal',
			bottom: '5%',
			left: 'center',
			data: data.map((item) => item.stock_id),
		},
		series: [
			{
				name: '持股價值',
				type: 'pie',
				radius: ['35%', '60%'],
				center: ['50%', '50%'],
				data: data.map((item) => ({
					name: item.stock_id,
					value: item.quantity * item.average_price,
				})),
				label: {
					show: true,
					formatter: '{b}\n({d}%)',
				},
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
}

onMounted(async () => {
	try {
		const res = await portfolioApi.getMyPortfolio()
		if (res.data && Array.isArray(res.data) && res.data.length > 0) {
			setChartOptions(res.data)
		} else {
			// No data or empty data, chartOptions remains null, showing the v-else block.
			console.log('No portfolio data available to display chart.')
		}
	} catch (error) {
		console.error('Failed to fetch portfolio data:', error)
	}
})

defineExpose({
	setChartOptions,
})
</script> 