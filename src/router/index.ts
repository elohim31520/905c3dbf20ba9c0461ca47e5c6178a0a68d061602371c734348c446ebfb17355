import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/transaction',
			name: 'transaction',
			component: () => import('../views/TransactionView.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/Login.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('../views/Register.vue'),
		},
		{
			path: '/records',
			name: 'records',
			component: () => import('../views/records.vue'),
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: () => import('../views/Portfolio.vue'),
		},
		{
			path: '/companies',
			name: 'companies',
			component: () => import('../views/Companies.vue'),
		},
	],
})

export default router
