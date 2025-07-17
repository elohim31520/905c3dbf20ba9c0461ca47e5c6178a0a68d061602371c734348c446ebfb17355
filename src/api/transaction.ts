import { httpClient } from '../modules/service'
import type { ResponseData } from '../types/api'

type Transaction = {
	stock_id: string
	transaction_type: 'buy' | 'sell'
	quantity: number
	price: number
	transaction_date: string
}

class TransactionApi {
	/**
	 * 取得所有股票價格
	 */
	async getStockPrices(): Promise<ResponseData<any>> {
		return httpClient.request<any>({ method: 'GET', endpoint: '/market/stock/prices' })
	}

	/**
	 * 取得所有股票代號
	 */
	async getStockSymbols(): Promise<ResponseData<any>> {
		return httpClient.request<any>({ method: 'GET', endpoint: '/market/stock/symbols' })
	}

	/**
	 * 取得所有交易紀錄
	 */
	async getAllTransactions(): Promise<ResponseData<any>> {
		return httpClient.request<any>({ method: 'GET', endpoint: '/transactions' })
	}

	/**
	 * 刪除單筆交易紀錄
	 * @param id 交易紀錄 ID
	 */
	async deleteTransaction(id: string): Promise<ResponseData<any>> {
		return httpClient.request<any>({ method: 'DELETE', endpoint: `/transactions/${id}` })
	}

	/**
	 * 新增多筆交易紀錄
	 * @param transactions 交易紀錄陣列
	 */
	async recordMyTransactions(transactions: Transaction[]): Promise<ResponseData<any>> {
		const formattedTransactions = transactions.map((transaction) => {
			return {
				...transaction,
				transaction_date: this.parseDate(transaction.transaction_date) || new Date().toISOString().split('T')[0],
			}
		})
		return httpClient.request<any>({ method: 'POST', endpoint: '/transactions', params: formattedTransactions })
	}

	private parseDate(dateStr: string): string | null {
		const date_format = /^\d{4}-\d{2}-\d{2}$/
		if (date_format.test(dateStr)) {
			return dateStr
		}
		return null
	}
}

export const transactionApi = new TransactionApi()
