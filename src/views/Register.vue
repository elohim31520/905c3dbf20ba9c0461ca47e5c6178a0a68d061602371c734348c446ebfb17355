<template>
	<div>
		<van-nav-bar title="註冊" />
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
					v-model="email"
					name="email"
					label="電子郵件"
					placeholder="請輸入電子郵件"
					:rules="[{ required: true, message: '請填寫電子郵件' }]"
				/>
				<van-field
					v-model="password"
					type="password"
					name="password"
					label="密碼"
					placeholder="請輸入密碼"
					:rules="[{ required: true, message: '請填寫密碼' }]"
				/>
				<van-field
					v-model="confirmPassword"
					type="password"
					name="confirmPassword"
					label="確認密碼"
					placeholder="請再次輸入密碼"
					:rules="[{ validator: passwordValidator, message: '兩次輸入的密碼不一致' }]"
				/>
			</van-cell-group>
			<div style="margin: 16px">
				<van-button round block type="primary" color="#f472b6" native-type="submit"> 註冊 </van-button>
			</div>
		</van-form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/user'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const passwordValidator = (val: string) => {
	return val === password.value
}

const onSubmit = async (values: any) => {
	const res = await register({
		name: values.username,
		pwd: values.password,
		email: values.email,
	})
	if (res.success) {
		showToast('註冊成功')
		router.push('/')
	}
}
</script>
