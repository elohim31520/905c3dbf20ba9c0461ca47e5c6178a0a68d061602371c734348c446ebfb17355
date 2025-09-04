<template>
	<van-popup v-model:show="show" position="bottom" round>
		<div class="p-10">
			<div class="text-16 font-bold mb-4 color-#656565 text-center">
				{{ isUpdateMode ? '更新可用美金餘額' : '新增可用美金餘額' }}
			</div>
			<van-form ref="formRef" @submit="onSubmit">
				<van-cell-group class="!rounded-xl overflow-hidden">
					<van-field
						v-model="form.price"
						type="number"
						name="price"
						label="美金餘額"
						placeholder="請輸入可用美金餘額"
						:rules="[
							{ required: true, message: '請輸入可用美金餘額' },
							{ pattern: /^\d+(\.\d{1,2})?$/, message: '請輸入正確的金額格式' },
						]"
					/>
				</van-cell-group>
				<div class="px-10 py-20">
					<van-button round block type="primary" color="#f472b6" native-type="submit">
						{{ isUpdateMode ? '更新' : '新增' }}
					</van-button>
				</div>
			</van-form>
		</div>
	</van-popup>
</template>

<script setup lang="ts">
	import { ref, watch, computed } from 'vue'
	import type { FormInstance } from 'vant'
	import { portfolioApi } from '@/api/portfolio'
	import { usePortfolioStore } from '@/stores/portfolio'

	const portfolioStore = usePortfolioStore()

	interface PortfolioForm {
		stock_id: string
		quantity: number
		price: string
	}

	type PortfolioItem = {
		stock_id: string
		quantity: number
		average_price: number
		id: number
		[key: string]: any
	}

	const props = defineProps<{
		modelValue: boolean
	}>()

	const emit = defineEmits(['update:modelValue', 'submitSuccess'])

	const show = computed({
		get: () => props.modelValue,
		set: (val) => emit('update:modelValue', val),
	})

	const usdInfo = computed(() => portfolioStore.usdInfo)
	const isUpdateMode = computed(() => !!usdInfo.value)

	const formRef = ref<FormInstance>()
	const form = ref<PortfolioForm>({
		stock_id: 'USD',
		quantity: 1,
		price: '',
	})

	watch(
		usdInfo,
		(newItem) => {
			if (newItem) {
				form.value.price = String(newItem.average_price)
			} else {
				form.value.price = ''
			}
		},
		{ immediate: true }
	)

	const onSubmit = async () => {
		if (!formRef.value) return

		try {
			await formRef.value?.validate()
			const payload = {
				stock_id: form.value.stock_id,
				quantity: form.value.quantity,
				average_price: Number(form.value.price),
			}
			if (isUpdateMode.value) {
				await portfolioApi.updateMyPortfolio(payload)
			} else {
				await portfolioApi.createMyPortfolio(payload)
			}
			showToast({
				type: 'success',
				message: isUpdateMode.value ? '更新成功' : '新增成功',
			})

			//更新usdInfo
			portfolioStore.usdInfo = payload

			emit('submitSuccess')
			show.value = false
		} catch (error) {
			console.error(error)
			showToast({
				type: 'fail',
				message: '請檢查輸入資料',
			})
		}
	}
</script>
