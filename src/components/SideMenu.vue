<template>
	<van-popup
		:show="props.modelValue"
		@update:show="emit('update:modelValue', $event)"
		position="left"
		:style="{ width: '80%', height: '100%' }"
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
						<van-icon :name="item.icon" class="mr-4" />
						<span class="text-20">{{ item.text }}</span>
					</router-link>
				</template>
			</nav>
		</div>
	</van-popup>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import VanPopup from 'vant/lib/popup'
import 'vant/lib/popup/style'
import VanIcon from 'vant/lib/icon'
import 'vant/lib/icon/style'
import { isAuthenticated } from '@/modules/auth'

const menuItems = [
	{ to: '/', icon: 'home-o', text: '首頁', auth: 'always' },
	{ to: '/about', icon: 'info-o', text: '關於', auth: 'always' },
	{ to: '/transaction', icon: 'add-o', text: '紀錄', auth: 'auth' },
	{ to: '/records', icon: 'records', text: '我的紀錄', auth: 'auth' },
	{ to: '/login', icon: 'manager-o', text: '登入', auth: 'guest' },
	{ to: '/register', icon: 'user-circle-o', text: '註冊', auth: 'guest' },
	{
		to: '/portfolio',
		icon: 'chart-trending-o',
		text: '我的投資組合',
		auth: 'auth',
	},
	{
		to: '/companies',
		icon: 'chart-trending-o',
		text: '股票清單',
		auth: 'always',
	},
	{
		to: '/m7',
		icon: 'chart-trending-o',
		text: 'M7',
		auth: 'auth',
	}
]

const props = defineProps<{
	modelValue: boolean
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
}>()

const closeMenu = () => {
	emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.router-link-exact-active {
	@apply text-pink-500 font-500;
}
</style>