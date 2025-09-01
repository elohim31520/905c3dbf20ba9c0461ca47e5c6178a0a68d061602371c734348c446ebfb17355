<template>
	<div class="max-w-800px mx-auto font-sans p-4">
		<h1 class="text-18 font-bold text-center my-4 text-gray-700">上傳截圖，自動存儲交易紀錄</h1>

		<van-notice-bar left-icon="info-o" wrapable :scrollable="false" type="warning" class="mb-6">
			請依照以下步驟操作：<br />
			1. 點擊下方按鈕，複製提示指令。<br />
			2. 選擇一個 AI 服務並前往其網站。<br />
			3. 貼上指令和您的交易截圖，取得 JSON 資料。<br />
			4. 將 AI 回傳的 JSON 資料貼回此頁面並送出。
		</van-notice-bar>

		<van-collapse v-model="activeCollapse" inset class="mb-6">
			<van-collapse-item name="1">
				<template #title>
					<div>1. 複製提示指令 (Prompt)</div>
				</template>
				<template #value>
					<van-button @click.stop="copy(promptText)" type="primary">{{
						copied ? '已複製' : '複製'
					}}</van-button>
				</template>
				<pre class="text-14 font-mono whitespace-pre-wrap break-all bg-gray-100 p-2 rounded">{{
					promptText.trim()
				}}</pre>
			</van-collapse-item>
		</van-collapse>

		<van-cell-group inset title="2. 前往 AI 服務" class="mt-6">
			<van-cell title="ChatGPT" is-link url="https://chat.openai.com/" target="_blank" />
			<van-cell title="Google Gemini" is-link url="https://gemini.google.com/" target="_blank" />
			<van-cell title="Grok (xAI)" is-link url="https://grok.x.ai/" target="_blank" />
		</van-cell-group>

		<van-cell-group inset title="3. 貼上 AI 回傳的 JSON 資料" class="mt-6">
			<van-field
				v-model="transactionsJsonString"
				rows="5"
				autosize
				type="textarea"
				placeholder="請將 AI 服務回傳的 JSON 陣列資料貼在此處"
			/>
		</van-cell-group>

		<div class="p-4 mt-4">
			<van-button
				@click="submitTransactions"
				:loading="isSubmitting"
				loading-text="儲存中..."
				type="success"
				block
				round
			>
				送出儲存
			</van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { useClipboard } from '@vueuse/core'
	import { showSuccessToast, showFailToast, showToast } from 'vant'
	import { transactionApi } from '@/api/transaction'
	import type { Transaction } from '@/types/api'

	const transactionsJsonString = ref('')
	const isSubmitting = ref(false)
	const activeCollapse = ref([])

	const promptText = ref(`
		請分析圖片中的交易紀錄，並將其轉換為以下 JSON 陣列格式。請確保 stock_id 是正確的股票代碼，transaction_type 只能是 'buy' 或 'sell'，quantity 和 price 應為數字，transaction_date 格式為 'YYYY-MM-DD'。如果圖片內容不相關或資料不完整，請回傳一個空陣列 []。

		JSON 格式範例:
		[
			{
				"stock_id": "TSLA",
				"transaction_type": "buy",
				"quantity": 5,
				"price": 200.83,
				"transaction_date": "2024-01-01"
			}
		]
	`)
	const { copy, copied } = useClipboard({ source: promptText })

	async function submitTransactions() {
		if (!transactionsJsonString.value) {
			showToast('請填入交易資料。')
			return
		}

		isSubmitting.value = true
		try {
			const transactions: Transaction[] = JSON.parse(transactionsJsonString.value)
			if (!_isArray(transactions)) {
				throw new Error('資料格式不正確，必須是一個陣列。')
			}

			const promises = transactions.map((tx) => transactionApi.recordMyTransactions(tx))
			await Promise.all(promises)

			showSuccessToast(`成功記錄 ${transactions.length} 筆交易。`)
			transactionsJsonString.value = ''
		} catch (error: any) {
			console.error('Failed to submit transactions:', error)
			let message = '提交失敗，請檢查資料格式或網路連線。'
			if (error instanceof SyntaxError) {
				message = 'JSON 格式錯誤，請檢查您的輸入。'
			} else if (error.message) {
				message = error.message
			}
			showFailToast(message)
		} finally {
			isSubmitting.value = false
		}
	}
</script>
