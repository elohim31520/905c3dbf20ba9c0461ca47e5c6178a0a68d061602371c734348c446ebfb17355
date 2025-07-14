import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { API_CONFIG } from '../config/api'
import type { ResponseData, FailResponseData, RequestParams } from '../types/api'

const getToken = (): string | null => {
    return localStorage.getItem(API_CONFIG.TOKEN_KEY)
}

const getHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    }
    
    const token = getToken()
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    
    return headers
}

class HttpClient {
    private static instance: HttpClient
    private service: AxiosInstance

    private constructor() {
        this.service = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: getHeaders(),
        })

        this.setupInterceptors()
    }

    public static getInstance(): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient()
        }
        return HttpClient.instance
    }

    private setupInterceptors(): void {
        this.service.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const headers = getHeaders()
                Object.entries(headers).forEach(([key, value]) => {
                    config.headers.set(key, value)
                })
                return config
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            },
        )

        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                return response
            },
            (error: AxiosError) => {
                const response: FailResponseData = {
                    success: false,
                    data: null,
                    code: error.response?.status || null,
                    message: error.message || '請求失敗'
                }
                return Promise.reject(response)
            },
        )
    }

    public async request<T>({
        method,
        endpoint,
        params,
        quiet = false
    }: RequestParams): Promise<ResponseData<T>> {
        try {
            const response: AxiosResponse<ResponseData<T>> = await this.service({
                method,
                url: endpoint,
                ...(method.toUpperCase() === 'GET' ? { params } : { data: params }),
            })

            if (!quiet) {
                console.log('API Response:', response.data)
            }
            return response.data
        } catch (err) {
            if (!quiet) {
                console.error('Request failed:', err)
            }
            throw err
        }
    }
}

export const httpClient = HttpClient.getInstance()
export type { InternalAxiosRequestConfig as AxiosRequestConfig }
