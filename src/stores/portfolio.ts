import { defineStore } from 'pinia'
import { portfolioApi } from '../api/portfolio'

type PortfolioItem = {
	stock_id: string
	quantity: number
	average_price: number
	[key: string]: any
}

export const usePortfolioStore = defineStore('portfolio', {
	state: () => ({
		portfolioData: [] as PortfolioItem[],
		isLoading: false,
	}),
	getters: {
		portfolioList: (state) => state.portfolioData,
	},
	actions: {
		async fetchMyPortfolio() {
			this.isLoading = true
			try {
				const res = await portfolioApi.getMyPortfolio()
				if (res.data && Array.isArray(res.data)) {
					this.portfolioData = res.data
				} else {
					console.error('Portfolio data 必須是陣列:', res.data)
					this.portfolioData = []
				}
			} catch (error) {
				console.error('Failed to fetch portfolio data:', error)
				this.portfolioData = []
			} finally {
				this.isLoading = false
			}
		},
	},
})
