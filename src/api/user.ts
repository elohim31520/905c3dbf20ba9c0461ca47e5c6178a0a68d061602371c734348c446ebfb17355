import { httpClient } from '../modules/service'
import type { ResponseData } from '../types/api'
import { API_CONFIG } from '../config/api'

interface LoginParams {
    user_name: string
    pwd: string
}

interface RegisterParams extends LoginParams {
    email: string
}

interface UserData {
    id: string
    user_name: string
    email: string
    token: string
}

const saveToken = (token: string): void => {
    localStorage.setItem(API_CONFIG.TOKEN_KEY, token)
}

export const login = async (params: LoginParams): Promise<ResponseData<UserData>> => {
    const response = await httpClient.request<UserData>({
        method: 'POST',
        endpoint: '/users/login',
        params
    })
    if (response.success && response.data.token) {
        saveToken(response.data.token)
    }
    return response
}

export const register = async (params: RegisterParams): Promise<ResponseData<UserData>> => {
    const response = await httpClient.request<UserData>({
        method: 'POST',
        endpoint: '/users/register',
        params
    })
    if (response.success && response.data.token) {
        saveToken(response.data.token)
    }
    return response
}

export default {
    login,
    register,
}
