import { httpClient } from '../modules/service'
import type { ResponseData, Company } from '../types/api'

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

	async getStockSymbols(): Promise<ResponseData<Company[]>> {
		return httpClient.request<Company[]>({ method: 'GET', endpoint: '/market/stock/symbols' })
	}

	async getAllCompanies(): Promise<ResponseData<Company[]>> {
		return httpClient.request<Company[]>({ method: 'GET', endpoint: '/market/stock/symbols' })
	}

	async getMarketBreadth(): Promise<ResponseData<number>> {
		return httpClient.request<number>({ method: 'GET', endpoint: '/market/stock/breadth' })
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
