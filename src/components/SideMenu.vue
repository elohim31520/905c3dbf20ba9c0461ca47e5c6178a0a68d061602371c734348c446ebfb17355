<template>
	<van-popup
		:show="modelValue"
		@update:show="$emit('update:modelValue', $event)"
		position="left"
		:style="{ width: '80%', height: '100%' }"
	>
		<div class="pt-20">
			<nav class="flex flex-col space-y-6 items-center">
				<router-link to="/" @click="closeMenu" class="p-3 rounded-lg text-gray-700 hover:bg-gray-200">首頁</router-link>
				<router-link to="/about" @click="closeMenu" class="p-3 rounded-lg text-gray-700 hover:bg-gray-200"
					>關於</router-link
				>
				<router-link to="/transaction" @click="closeMenu" class="p-3 rounded-lg text-gray-700 hover:bg-gray-200"
					>交易</router-link
				>
				<router-link to="/login" @click="closeMenu" class="p-3 rounded-lg text-gray-700 hover:bg-gray-200"
					>登入</router-link
				>
				<router-link to="/register" @click="closeMenu" class="p-3 rounded-lg text-gray-700 hover:bg-gray-200"
					>註冊</router-link
				>
			</nav>
		</div>
	</van-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import VanPopup from 'vant/lib/popup'
import 'vant/lib/popup/style'

export default defineComponent({
	name: 'SideMenu',
	components: {
		RouterLink,
		VanPopup,
	},
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
	},
	emits: ['update:modelValue'],
	methods: {
		closeMenu() {
			this.$emit('update:modelValue', false)
		},
	},
})
</script>
