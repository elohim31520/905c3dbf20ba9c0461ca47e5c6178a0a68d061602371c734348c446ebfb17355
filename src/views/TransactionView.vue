<template>
	<div class="w-full mx-auto pt-10">
		<van-form ref="formRef" @submit="onSubmit" class="shadow-2xl">
			<van-cell-group class="!rounded-xl overflow-hidden">
				<van-field
					v-model="form.stock_id"
					name="stock_id"
					label="股票代號"
					placeholder="請輸入股票代號"
					:rules="[{ required: true, message: '請輸入股票代號' }]"
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
			<!-- button要放這裡才能讓van-form的驗證生效 -->
			<div class="px-10 py-20">
				<van-button round block type="primary" color="#f472b6" native-type="submit">紀錄</van-button>
			</div>

			<div class="rounded-30 flex-y-center justify-center color-primary bd-1 border-#f472b6 mt-10 w-95% h-44 mx-auto"
			@click="$router.push('/image-to-json')">
				上傳截圖紀錄
			</div>
		</van-form>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { showToast } from 'vant'
	import type { FormInstance } from 'vant'
	import { transactionApi } from '../api/transaction'
	import emitter from '@/modules/emitter'
	import { useRouter } from 'vue-router'

	const router = useRouter()

	interface TransactionForm {
		stock_id: string
		transaction_type: 'buy' | 'sell'
		quantity: string
		price: string
		transaction_date: string
	}

	const getInitialFormState = (): TransactionForm => ({
		stock_id: '',
		transaction_type: 'buy',
		quantity: '',
		price: '',
		transaction_date: new Date().toISOString().split('T')[0],
	})

	const formRef = ref<FormInstance>()
	const form = ref<TransactionForm>(getInitialFormState())

	const onSubmit = async () => {
		if (!formRef.value) return

		try {
			await formRef.value?.validate()
			const payload = {
				...form.value,
				quantity: Number(form.value.quantity),
				price: Number(form.value.price),
			}
			await transactionApi.recordMyTransactions(payload)
			showToast({
				type: 'success',
				message: '交易紀錄已儲存',
			})

			// 刷新交易紀錄和投資組合頁面
			emitter.emit('refresh', 'records')
			emitter.emit('refresh', 'portfolio')
			form.value = getInitialFormState()
			formRef.value?.resetValidation()
		} catch (error) {
			console.error(error)
			showToast({
				type: 'fail',
				message: '請檢查輸入資料',
			})
		}
	}
</script>
