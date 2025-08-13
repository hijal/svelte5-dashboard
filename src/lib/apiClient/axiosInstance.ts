import type { RequestEvent } from '@sveltejs/kit';
import { createAxios } from './axios';
import { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { env } from '$env/dynamic/public';

function handleResponseError(error: AxiosError): Promise<never> {
    globalThis.console.error('API Response error:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        ...(env.PUBLIC_NODE_ENV === 'development' && {
            requestHeaders: error.config?.headers,
            responseHeaders: error.response?.headers,
        }),
    });

    return Promise.reject(error);
}

function handleRequestError(error: AxiosError): Promise<never> {
    globalThis.console.error('API Request error:', {
        message: error.message,
        code: error.code,
        config: error.config,
    });
    return Promise.reject(error);
}

function handleResponseSuccess<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    if (env.PUBLIC_NODE_ENV === 'development') {
        globalThis.console.debug('API Success:', {
            url: response.config.url,
            method: response.config.method?.toUpperCase(),
            status: response.status,
            ...(response.config.url?.includes('/debug') && { data: response.data }),
        });
    }
    return response;
}

export function getApi(event?: RequestEvent): AxiosInstance {
    const instance = createAxios(event);

    instance.interceptors.request.use((config) => config, handleRequestError);
    instance.interceptors.response.use(handleResponseSuccess, handleResponseError);

    return instance;
}
