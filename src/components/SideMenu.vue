<template>
	<van-popup
		:show="uiStore.isMenuShown"
		@update:show="uiStore.isMenuShown = $event"
		position="left"
		:style="{ width: '80%', height: '100%' }"
		z-index="9999"
	>
		<div class="pt-20">
			<nav class="flex flex-col space-y-15">
				<template v-for="item in menuItems" :key="item.to">
					<router-link
						v-if="
							item.auth === 'always' ||
							(item.auth === 'auth' && isAuthenticated()) ||
							(item.auth === 'guest' && !isAuthenticated())
						"
						:to="item.to"
						@click="closeMenu"
						class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
						active-class="color-primary"
					>
						<SvgIcon :name="item.icon" size="1.2rem" class="mr-5" />
						<span class="text-20">{{ item.text }}</span>
					</router-link>
				</template>
				<div
					v-if="isAuthenticated()"
					@click="logout"
					class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
					active-class="color-primary"
				>
					<SvgIcon name="icon_quit" size="1.2rem" class="mr-5" />
					<span class="text-20">登出</span>
				</div>
			</nav>
		</div>
	</van-popup>
</template>

<script setup lang="ts">
	import { RouterLink } from 'vue-router'
	import VanPopup from 'vant/lib/popup'
	import 'vant/lib/popup/style'
	import { isAuthenticated, removeToken } from '@/modules/auth'
	import { useUIStore } from '@/stores/ui'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const uiStore = useUIStore()

	const menuItems = [
		{ to: '/', icon: 'icon_settings_Name2', text: '首頁', auth: 'always' },
		{ to: '/about', icon: 'icon_settings_about_us', text: '關於', auth: 'always' },
		{ to: '/transaction', icon: 'icon_menu_Opinion', text: '新增紀錄', auth: 'always' },
		{ to: '/records', icon: 'money', text: '我的紀錄', auth: 'always' },
		{
			to: '/portfolio',
			icon: 'icon_gift',
			text: '我的投資組合',
			auth: 'always',
		},
		{
			to: '/companies',
			icon: 'icon_menu_Query',
			text: '股票清單',
			auth: 'always',
		},
		{
			to: '/m7',
			icon: 'side-bar-no1',
			text: '熱門股票',
			auth: 'always',
		},
		{ to: '/market-metrics', icon: 'media', text: '市場指標', auth: 'always' },
		{ to: '/volatile-stock', icon: 'icon_ghost', text: '今日股價變動', auth: 'always' },
		{ to: '/login', icon: 'icon_user2', text: '登入', auth: 'always' },
		{ to: '/register', icon: 'icon_settings_invite', text: '註冊', auth: 'guest' },
	]

	const closeMenu = () => {
		uiStore.hideMenu()
	}

	const logout = () => {
		removeToken()
		closeMenu()
		router.push('/login').then(() => {
			window.location.reload()
		})
	}
</script>

<style scoped lang="scss">
	.router-link-exact-active {
		@apply text-pink-500 font-500;
	}
</style>
