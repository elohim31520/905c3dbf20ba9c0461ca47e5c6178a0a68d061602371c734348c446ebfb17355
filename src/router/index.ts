import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenticated } from '@/modules/auth'
import i18n from '@/i18n'

let hasPopLazypod = false
let adScriptLoaded = false
function loadAdScript() {
	if (adScriptLoaded) {
		return
	}
	const script = document.createElement('script')
	script.async = true
	script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3738209519931286'
	script.crossOrigin = 'anonymous'
	document.head.appendChild(script)
	adScriptLoaded = true
}

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta: {
			title: '首頁 - UrTrade',
			description: '查看最新的市場動態、熱力圖和市場寬度數據。',
			requiresAds: true,
		},
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/About.vue'),
		meta: {
			title: '關於我們 - UrTrade',
			description: '了解 UrTrade 的使命和願景。',
			requiresAds: true,
		},
	},
	{
		path: '/transaction',
		name: 'transaction',
		component: () => import('../views/TransactionView.vue'),
		meta: {},
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
		meta: {
			title: '投資組合 - UrTrade',
			description: '追蹤您的投資組合表現和持股詳情。',
			keepAlive: true,
			requiresAds: true,
		},
	},
	{
		path: '/companies',
		name: 'companies',
		component: () => import('../views/Companies.vue'),
		meta: {
			title: '上市公司 - UrTrade',
			description: '探索所有上市公司列表。',
			keepAlive: true,
			requiresAds: true,
		},
	},
	{
		path: '/my',
		name: 'my',
		component: () => import('../views/My.vue'),
		meta: { keepAlive: true },
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
		meta: { keepAlive: true },
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
		meta: {
			title: '公司指標 - UrTrade',
			description: '查看特定公司的詳細財務指標和市場數據。',
			requiresAds: true,
		},
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
		meta: {
			title: '市場指標 - UrTrade',
			description: '分析整體市場的關鍵指標和趨勢。',
			requiresAds: true,
		},
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

router.afterEach((to) => {
	if (to.meta.requiresAds) {
		_delay(loadAdScript, 5000)
	}
	if (to.name === 'info' && !hasPopLazypod) {
		hasPopLazypod = true
		if (i18n.global.locale.value === 'en') {
			window.open('https://lazypod.org/info-en', '_blank')
		} else {
			window.open('https://lazypod.org/iframe', '_blank')
		}
	}
})

export default router
