import { httpClient } from '../modules/service'
import type { ResponseData } from '../types/api'
import { setToken } from '../modules/auth'

interface LoginParams {
	name: string
	pwd: string
}

interface RegisterParams extends LoginParams {
	email: string
}

interface UserData {
	id: string
	name: string
	email: string
	token: string
}

export const login = async (params: LoginParams): Promise<ResponseData<string>> => {
	const res = await httpClient.request<string>({
		method: 'POST',
		endpoint: '/users/login',
		params,
	})
	if (res.success && res.data) {
		setToken(res.data)
	}
	return res
}

export const loginWithGoogle = async (credential: string): Promise<ResponseData<string>> => {
	const res = await httpClient.request<string>({
		method: 'POST',
		endpoint: '/users/google/login',
		params: {
			credential,
		},
	})
	if (res.success && res.data) {
		setToken(res.data)
	}
	return res
}

export const register = async (params: RegisterParams): Promise<ResponseData<UserData>> => {
	const response = await httpClient.request<UserData>({
		method: 'POST',
		endpoint: '/users/register',
		params,
	})
	if (response.success && response.data.token) {
		setToken(response.data.token)
	}
	return response
}

export const changePassword = async (params: any) => {
	return await httpClient.request({
		method: 'POST',
		endpoint: '/users/password',
		params,
	})
}

export default {
	login,
	register,
	changePassword,
	loginWithGoogle,
}
