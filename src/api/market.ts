import { httpClient } from '../modules/service'
import type { ResponseData } from '../types/api'

class MarketApi {
	async getAllMomentum(): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: '/market/momentum' })
	}

	async getMomentumByRange(days: number): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: `/market/momentum/range/${days}` })
	}

	async getMarketWeights(): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: '/market/weights' })
	}

	async getStockSymbols(): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: '/market/stock/symbols' })
	}

	async getMarketBreadth(): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: '/market/stock/breadth' })
	}

	async getStockWinners(): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: '/market/stock/winners' })
	}

	async getStockLosers(): Promise<ResponseData<any[]>> {
		return httpClient.request<any[]>({ method: 'GET', endpoint: '/market/stock/losers' })
	}

	async getStatementBySymbol(symbol: string): Promise<ResponseData<any>> {
		return httpClient.request<any>({ method: 'GET', endpoint: `statements/${symbol}` })
	}
}

export const marketApi = new MarketApi()
