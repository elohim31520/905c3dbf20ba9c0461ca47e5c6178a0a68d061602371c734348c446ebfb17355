import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenticated } from '@/modules/auth'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/About.vue'),
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
		meta: { requiresAuth: true, keepAlive: true },
	},
	{
		path: '/portfolio',
		name: 'portfolio',
		component: () => import('../views/Portfolio.vue'),
		meta: { requiresAuth: true, keepAlive: true },
	},
	{
		path: '/companies',
		name: 'companies',
		component: () => import('../views/Companies.vue'),
		meta: { keepAlive: true },
	},
	{
		path: '/my',
		name: 'my',
		component: () => import('../views/My.vue'),
		meta: {  },
	},
	{
		path: '/change-password',
		name: 'change-password',
		component: () => import('../views/ChangePassword.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/m7',
		name: 'm7',
		component: () => import('../views/M7.vue'),
		meta: { requiresAuth: true, keepAlive: true },
	},
	{
		path: '/info',
		name: 'info',
		component: () => import('../views/Info.vue'),
	},
	{
		path: '/volatile-stock',
		name: 'volatile-stock',
		component: () => import('../views/VolatileStock.vue'),
	},
	{
		path: '/company-metrics/:symbol',
		name: 'company-metrics',
		component: () => import('../views/CompanyMetrics.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/404',
		name: '404',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
	},
	{
		path: '/image-to-json',
		name: 'image-to-json',
		component: () => import('../views/ImageToJson.vue'),
	},
	{
		path: '/market-metrics',
		name: 'market-metrics',
		component: () => import('../views/MarketMetrics.vue'),
	},
]

if (import.meta.env.DEV) {
	routes.push({
		path: '/svg',
		name: 'svg',
		component: () => import('../views/Svg.vue'),
	})
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		// always scroll to top
		return { top: 0, behavior: 'smooth' }
	},
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated()) {
		next({ name: 'login' })
	} else {
		next()
	}
})

export default router
