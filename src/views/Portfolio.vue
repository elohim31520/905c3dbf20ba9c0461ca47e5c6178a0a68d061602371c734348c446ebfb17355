<template>
	<div class="bg-white p-10">
		<div class="text-16 font-bold mb-4 color-#656565">我的投資組合</div>

		<van-tabs v-model:active="activeTab" color="#F472B6">
			<van-tab title="持股詳情">
				<div v-if="portfolioData.length > 0" class="mt-10">
					<van-cell-group inset>
						<van-cell v-for="item in portfolioData" :key="item.stock_id">
							<template #title>
								<span class="font-bold">{{ item.stock_id }}</span>
							</template>
							<div>數量: {{ item.quantity }}</div>
							<div>均價: {{ item.average_price }}</div>
							<div>總值: {{ item.quantity * item.average_price }}</div>
						</van-cell>
					</van-cell-group>
				</div>
				<div v-else class="text-center text-gray-500 pt-10">正在載入資料或無持股...</div>
			</van-tab>
			<van-tab title="圖表分析">
				<div v-if="chartOptions" class="w-full h-[500px]">
					<v-chart :option="chartOptions" autoresize />
				</div>
				<div v-else class="text-center text-gray-500 pt-10">正在載入資料或無持股...</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { portfolioApi } from '../api/portfolio'
import type { EChartsOption } from 'echarts'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

type PortfolioItem = {
	stock_id: string
	quantity: number
	average_price: number
	[key: string]: any
}

const activeTab = ref(0)
const portfolioData = ref<PortfolioItem[]>([])
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
	const res = await portfolioApi.getMyPortfolio()
	if (res.data && Array.isArray(res.data)) {
		portfolioData.value = res.data
		if (res.data.length > 0) {
			setChartOptions(res.data)
		}
	} else {
		console.error('Portfolio data is not in expected format:', res.data)
		portfolioData.value = []
	}
})
</script>
