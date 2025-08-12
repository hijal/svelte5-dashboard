import type { RequestEvent } from '@sveltejs/kit';
import { createAxios } from './axios';
import { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

export interface ApiResponse<T = unknown> {
    data: T;
    status: number;
    message?: string;
}

function handleResponseSuccess<T>(
    response: AxiosResponse<ApiResponse<T>>,
): AxiosResponse<ApiResponse<T>> {
    return response;
}

function handleResponseError(error: AxiosError): Promise<never> {
    console.error('Response Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
    });

    if (error.response?.status === 401) {
        console.error('Unauthorized access - token might be expired');
    }

    return Promise.reject(error);
}

export function getApi(event?: RequestEvent): AxiosInstance {
    const instance = createAxios(event);

    instance.interceptors.response.use(handleResponseSuccess, handleResponseError);

    return instance;
}
