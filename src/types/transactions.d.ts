export interface Transaction {
	stock_id: string
	transaction_type: 'buy' | 'sell'
	quantity: number
	price: number
	transaction_date: Date
	id?: number
	user_id?: number
	createdAt?: Date
	updatedAt?: Date
}

export interface TransactionPartial {
	id: number
	stock_id: number
	type: 'buy' | 'sell'
	quantity: number
	price: number
	date: Date
}
