<template>
	<div>
		<van-nav-bar title="登入" />
		<van-form @submit="onSubmit">
			<van-cell-group inset>
				<van-field
					v-model="username"
					name="username"
					label="帳號"
					placeholder="請輸入帳號"
					:rules="[{ required: true, message: '請填寫帳號' }]"
				/>
				<van-field
					v-model="password"
					type="password"
					name="password"
					label="密碼"
					placeholder="請輸入密碼"
					:rules="[{ required: true, message: '請填寫密碼' }]"
				/>
			</van-cell-group>
			<div class="flex-y-center">
				<div class="color-primary font-bold px-20 pt-10" @click="router.push('/register')">註冊</div>
				<div class="color-primary font-bold px-20 pt-10 ml-auto" @click="router.push('/change-password')">
					忘記密碼？
				</div>
			</div>
			<div style="margin: 16px">
				<van-button round block type="primary" color="#f472b6" native-type="submit">登入</van-button>
			</div>
			<div class="flex-center m-16">
				<GoogleSignInButton
					size="large"
					type="standard"
					@success="handleGoogleLogin"
					@error="handleGoogleLoginError"
				></GoogleSignInButton>
			</div>
		</van-form>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { login, loginWithGoogle } from '../api/user'
	import { useStorage } from '@vueuse/core'
	import { GoogleSignInButton } from 'vue3-google-signin'

	const router = useRouter()
	const username = ref('')
	const password = ref('')
	const storedUsername = useStorage('username', '')

	const onSubmit = async (values: any) => {
		const res = await login({
			name: values.username,
			pwd: values.password,
		})
		if (res.success) {
			storedUsername.value = values.username
			showToast('登入成功')
			router.push('/')
		}
	}

	const handleGoogleLogin = async (response: any) => {
		const { credential } = response
		if (!credential) {
			return handleGoogleLoginError()
		}
		try {
			const res = await loginWithGoogle(credential)
			if (res.success) {
				showToast('Google 登入成功')
				router.push('/')
			} else {
				handleGoogleLoginError()
			}
		} catch (error) {
			handleGoogleLoginError()
		}
	}

	const handleGoogleLoginError = () => {
		console.error('Google 登入失敗')
		showToast('Google 登入失敗')
	}
</script>
