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
	}),
	getters: {
		portfolioList: (state) => state.portfolioData,
	},
	actions: {
		async fetchMyPortfolio() {
			try {
				const res = await portfolioApi.getMyPortfolio()
				if (_isArray(_get(res, 'data'))) {
					this.portfolioData = _get(res, 'data')
				} else {
					console.error('Portfolio data 必須是陣列:', res.data)
					this.portfolioData = []
				}
			} catch (error) {
				console.error('Failed to fetch portfolio data:', error)
				this.portfolioData = []
			}
		},
	},
})
