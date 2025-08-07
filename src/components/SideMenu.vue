<template>
	<van-popup
		:show="props.modelValue"
		@update:show="emit('update:modelValue', $event)"
		position="left"
		:style="{ width: '80%', height: '100%' }"
	>
		<div class="pt-20">
			<nav class="flex flex-col space-y-15">
				<router-link
					to="/"
					@click="closeMenu"
					class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
					active-class="color-primary"
				>
					<van-icon name="home-o" class="mr-4" />
					<span class="text-20">首頁</span>
				</router-link>
				<router-link
					to="/about"
					@click="closeMenu"
					class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
					active-class="color-primary"
				>
					<van-icon name="info-o" class="mr-4" />
					<span class="text-20">關於</span>
				</router-link>
				<router-link
					to="/transaction"
					@click="closeMenu"
					class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
					active-class="color-primary"
				>
					<van-icon name="add-o" class="mr-4" />
					<span class="text-20">紀錄</span>
				</router-link>
				<router-link
					to="/records"
					@click="closeMenu"
					class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
					active-class="color-primary"
				>
					<van-icon name="records" class="mr-4" />
					<span class="text-20">我的紀錄</span>
				</router-link>
				<router-link
					v-if="!isAuthenticated()"
					to="/login"
					@click="closeMenu"
					class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
					active-class="color-primary"
				>
					<van-icon name="manager-o" class="mr-4" />
					<span class="text-20">登入</span>
				</router-link>
				<router-link
					v-if="!isAuthenticated()"
					to="/register"
					@click="closeMenu"
					class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
					active-class="color-primary"
				>
					<van-icon name="user-circle-o" class="mr-4" />
					<span class="text-20">註冊</span>
				</router-link>
				<router-link
					to="/portfolio"
					@click="closeMenu"
					class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
					active-class="color-primary"
				>
					<van-icon name="chart-trending-o" class="mr-4" />
					<span class="text-20">我的投資組合</span>
				</router-link>
				<router-link
					to="/companies"
					@click="closeMenu"
					class="flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
					active-class="color-primary"
				>
					<van-icon name="chart-trending-o" class="mr-4" />
					<span class="text-20">股票清單</span>
				</router-link>
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