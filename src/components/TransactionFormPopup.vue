<template>
	<van-popup v-model:show="show" position="bottom" round>
		<div class="p-10">
			<div class="text-16 font-bold mb-4 color-#656565 text-center">更新持股</div>
			<van-form ref="formRef" @submit="onSubmit">
				<van-cell-group class="!rounded-xl overflow-hidden">
					<van-field
						v-model="form.stock_id"
						name="stock_id"
						label="股票代號"
						placeholder="請輸入股票代號"
						:rules="[{ required: true, message: '請輸入股票代號' }]"
						readonly
					/>

					<van-field name="transaction_type" label="交易類型">
						<template #input>
							<van-radio-group v-model="form.transaction_type" direction="horizontal">
								<van-radio name="buy" checked-color="#f472b6"><span class="color-green-600">買入</span></van-radio>
								<van-radio name="sell" checked-color="#f472b6"><span class="color-red-600">賣出</span></van-radio>
							</van-radio-group>
						</template>
					</van-field>

					<van-field
						v-model="form.quantity"
						type="digit"
						name="quantity"
						label="數量"
						placeholder="請輸入交易數量"
						:rules="[
							{ required: true, message: '請輸入交易數量' },
							{ pattern: /^[1-9]\d*$/, message: '請輸入正整數' },
						]"
					/>

					<van-field
						v-model="form.price"
						type="number"
						name="price"
						label="價格"
						placeholder="請輸入交易價格"
						:rules="[
							{ required: true, message: '請輸入交易價格' },
							{ pattern: /^\d+(\.\d{1,2})?$/, message: '請輸入正確的價格格式' },
						]"
					/>

					<van-field
						v-model="form.transaction_date"
						type="date"
						name="transaction_date"
						label="交易日期"
						placeholder="請選擇交易日期"
						:rules="[{ required: true, message: '請選擇交易日期' }]"
					/>
				</van-cell-group>
				<div class="px-10 py-20">
					<van-button round block type="primary" color="#f472b6" native-type="submit">紀錄</van-button>
				</div>
			</van-form>
		</div>
	</van-popup>
</template>

<script setup lang="ts">
	import { ref, watch, computed } from 'vue'
	import type { FormInstance } from 'vant'
	import type { PortfolioItem } from '@/types/portfolio'

	interface TransactionForm {
		stock_id: string
		transaction_type: 'buy' | 'sell'
		quantity: string
		price: string
		transaction_date: string
	}

	const props = defineProps<{
		modelValue: boolean
		item: PortfolioItem | null
		apiFunction: (payload: any) => Promise<any>
	}>()

	const emit = defineEmits(['update:modelValue', 'submitSuccess'])

	const show = computed({
		get: () => props.modelValue,
		set: (val) => emit('update:modelValue', val),
	})

	const formRef = ref<FormInstance>()
	const form = ref<TransactionForm>({
		stock_id: '',
		transaction_type: 'buy',
		quantity: '',
		price: '',
		transaction_date: new Date().toISOString().split('T')[0],
	})

	watch(
		() => props.item,
		(newItem) => {
			if (newItem) {
				form.value.stock_id = newItem.stock_id
				form.value.transaction_type = 'buy'
				form.value.quantity = ''
				form.value.price = ''
				form.value.transaction_date = new Date().toISOString().split('T')[0]
			}
		}
	)

	const onSubmit = async () => {
		if (!formRef.value) return

		try {
			await formRef.value?.validate()
			const payload = {
				...form.value,
				quantity: Number(form.value.quantity),
				price: Number(form.value.price),
			}
			await props.apiFunction(payload)
			showToast({
				type: 'success',
				message: '交易紀錄已儲存',
			})

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
