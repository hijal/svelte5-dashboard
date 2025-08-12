import type { RequestEvent } from '@sveltejs/kit';
import { createAxios, cache, CACHE_DURATION } from './axios';
import { AxiosHeaders, type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

export interface ApiResponse<T = unknown> {
    data: T;
    status: number;
    message?: string;
}

function handleResponseSuccess<T>(
    response: AxiosResponse<ApiResponse<T>>,
): AxiosResponse<ApiResponse<T>> {
    if (response.config.method?.toLowerCase() === 'get' && response.config.url) {
        const cacheKey = `${response.config.url}${JSON.stringify(response.config.params ?? {})}`;
        cache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now(),
        });
    }

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

    // Request interceptor
    instance.interceptors.request.use(
        (config) => {
            if (event) {
                const authToken = event.cookies.get('token');
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
            }

            if (config.method?.toLowerCase() === 'get' && config.url) {
                const cacheKey = `${config.url}${JSON.stringify(config.params ?? {})}`;
                const cachedResponse = cache.get(cacheKey);

                if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
                    return {
                        ...config,
                        adapter: () =>
                            Promise.resolve({
                                data: cachedResponse.data,
                                status: 200,
                                statusText: 'OK',
                                headers: new AxiosHeaders(),
                                config,
                                cached: true,
                            }),
                    };
                }
            }

            return config;
        },
        (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(handleResponseSuccess, handleResponseError);

    return instance;
}
