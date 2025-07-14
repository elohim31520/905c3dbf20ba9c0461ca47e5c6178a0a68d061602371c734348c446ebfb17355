export interface ResponseData<T> {
    code: number
    message: string
    success: boolean
    data: T
}

export interface FailResponseData extends Omit<ResponseData<null>, 'code'> {
    code: number | null
}

export interface RequestParams<T = any> {
    method: string
    endpoint: string
    params?: T
    quiet?: boolean
} 