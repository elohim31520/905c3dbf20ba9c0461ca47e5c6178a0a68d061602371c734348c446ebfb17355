<template>
	<div class="p-4 bg-white rounded-lg shadow-primary">
		<div class="flex justify-center space-x-10 my-20">
			<div
				v-for="day in timeRanges"
				:key="day"
				@click="fetchData(day)"
				:class="[
					'px-4 py-2 rounded-md w-50 text-center',
					selectedDays === day ? 'bg-primary color-white' : 'bg-gray-200 color-gray-700 hover:bg-gray-300',
				]"
			>
				{{ day }}天
			</div>
		</div>
		<div class="h-400">
			<v-chart class="chart" :option="option" autoresize />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { marketApi } from '../api/market'
import { isAuthenticated} from '@/modules/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, GridComponent])

const timeRanges = [1, 3, 7, 30]
const selectedDays = ref(1)
const option = ref({})

const fetchData = async (days: number): Promise<void> => {
	if(selectedDays.value == days && !_isEmpty(option.value)) {
		// 如果選擇的時間範圍相同且已經初始化時，則不重取api
		return
	}
	if (days != 1 && !isAuthenticated()) {
		router.push('/login')
		return
	}
	selectedDays.value = days
	try {
		const res = await marketApi.getMomentumByRange(days)
		if (!res.success) return
		const data = res.data
		const dates = data.map((item: any) => item.createdAt)
		const volumes = data.map((item: any) => item.volume)

		option.value = {
			title: {
				text: `市場近${days}日動能`,
				left: 'center',
			},
			tooltip: {
				trigger: 'axis',
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				data: dates,
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					data: volumes,
					type: 'line',
					smooth: true,
					itemStyle: {
						color: '#f472b6',
					},
				},
			],
		}
	} catch (error) {
		console.error(`Failed to fetch ${days}-day momentum data:`, error)
	}
}

onMounted(() => {
	fetchData(selectedDays.value)
})
</script>
