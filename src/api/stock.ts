import { httpClient } from '../modules/service'
import type { ResponseData, Company } from '../types/api'

class StockApi {
	async getMarketBreadth(): Promise<ResponseData<number>> {
		return httpClient.request<number>({ method: 'GET', endpoint: '/stock/breadth' })
	}

	async getStockWinners(): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: '/stock/winners' })
	}

	async getStockLosers(): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: '/stock/losers' })
	}

	async getTodayStocks(): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: '/stock/today' })
	}
}

export const stockApi = new StockApi()
