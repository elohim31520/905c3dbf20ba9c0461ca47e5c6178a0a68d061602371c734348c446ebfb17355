import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { requiresAuth: true },
		},
		{
			path: '/transaction',
			name: 'transaction',
			component: () => import('../views/TransactionView.vue'),
			meta: { requiresAuth: true },
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
			component: () => import('../views/Records.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: () => import('../views/Portfolio.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/companies',
			name: 'companies',
			component: () => import('../views/Companies.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/my',
			name: 'my',
			component: () => import('../views/My.vue'),
		}
	],
})

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token')
	if (to.matched.some(record => record.meta.requiresAuth) && !token) {
		next({ name: 'login' })
	} else {
		next()
	}
})

export default router
