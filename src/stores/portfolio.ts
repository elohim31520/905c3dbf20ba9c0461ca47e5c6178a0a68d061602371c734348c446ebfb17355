import { defineStore } from 'pinia'
import { portfolioApi } from '../api/portfolio'

type PortfolioItem = {
	id?: number
	stock_id: string
	quantity: number
	average_price: number
	[key: string]: any
}

export const usePortfolioStore = defineStore('portfolio', {
	state: () => ({
		portfolioData: [] as PortfolioItem[],
		usdInfo: null as PortfolioItem | null,
		isLoading: false,
	}),
	getters: {
		portfolioList: (state) => state.portfolioData,
		usdBalance: (state) => state.usdInfo?.average_price ?? 0,
	},
	actions: {
		async fetchMyPortfolio() {
			this.isLoading = true
			try {
				const res = await portfolioApi.getMyPortfolio()
				if (res.data && Array.isArray(res.data)) {
					this.usdInfo = res.data.find((item) => item.stock_id === 'USD') || null

					this.portfolioData = res.data
				} else {
					console.error('Portfolio data 必須是陣列:', res.data)
					this.portfolioData = []
					this.usdInfo = null
				}
			} catch (error) {
				console.error('Failed to fetch portfolio data:', error)
				this.portfolioData = []
				this.usdInfo = null
			} finally {
				this.isLoading = false
			}
		},
	},
})
