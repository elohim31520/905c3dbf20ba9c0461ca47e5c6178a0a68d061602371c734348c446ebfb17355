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
				<div class=" color-primary font-bold px-20 pt-10">註冊</div>
				<div class="color-primary font-bold px-20 pt-10 ml-auto">忘記密碼？</div>
			</div>
			<div style="margin: 16px">
				<van-button round block type="primary" color="#f472b6" native-type="submit"> 登入 </van-button>
			</div>
		</van-form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import { login } from '../api/user'

const router = useRouter()
const username = ref('')
const password = ref('')

const onSubmit = async (values: any) => {
	const res = await login({
		name: values.username,
		pwd: values.password,
	})
	if (res.success) {
		showToast('登入成功')
		router.push('/')
	}
}
</script>
