import type { RequestEvent } from '@sveltejs/kit';
import { createAxios } from './axios';

export function getApi(event?: RequestEvent) {
    const instance = createAxios(event);

    instance.interceptors.request.use(
        (config) => {
            if (event) {
                const authToken = event.cookies.get('token');
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.error('API Error details:', error);

            return Promise.reject(error);
        },
    );

    return instance;
}
