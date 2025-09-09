<template>
	<div>
		<van-nav-bar title="修改密碼" />
		<van-form @submit="onSubmit">
			<van-cell-group inset>
				<van-field
					v-model="oldPassword"
					name="oldPassword"
					label="舊密碼"
					placeholder="請輸入舊密碼"
					:rules="[{ required: true, message: '請填寫舊密碼' }]"
					type="password"
				/>
				<van-field
					v-model="newPassword"
					type="password"
					name="newPassword"
					label="新密碼"
					placeholder="請輸入新密碼"
					:rules="newPasswordRules"
				/>
				<van-field
					v-model="confirmNewPassword"
					type="password"
					name="confirmNewPassword"
					label="確認新密碼"
					placeholder="請再次輸入新密碼"
					:rules="[
						{ required: true, message: '請填寫確認新密碼' },
						{ validator: passwordValidator, message: '確認密碼與新密碼不符' },
					]"
				/>
			</van-cell-group>
			<div style="margin: 16px">
				<van-button round block type="primary" color="#f472b6" native-type="submit">確認修改</van-button>
			</div>
		</van-form>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { changePassword } from '../api/user'
	import { showToast } from 'vant'
	import { removeToken } from '../modules/auth'

	const router = useRouter()
	const oldPassword = ref('')
	const newPassword = ref('')
	const confirmNewPassword = ref('')

	const newPasswordRules = [
		{ required: true, message: '請填寫新密碼' },
		{
			pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:'",.<>/?]{6,30}$/,
			message: '新密碼長度需為 6-30 個字元，且只能包含英文字母、數字或特殊符號',
		},
	]

	const passwordValidator = (val: string) => {
		return val === newPassword.value
	}

	const onSubmit = async (values: any) => {
		const res = await changePassword({
			oldPassword: values.oldPassword,
			newPassword: values.newPassword,
			confirmNewPassword: values.confirmNewPassword,
		})
		if (res.success) {
			showToast('密碼修改成功')
			removeToken()
			router.push('/login')
		}
	}
</script>
