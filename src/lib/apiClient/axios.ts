import axios, { type AxiosInstance } from 'axios';
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export function createAxios(event?: RequestEvent): AxiosInstance {
    const baseURL = env.PUBLIC_API_HOST || 'http://localhost:5173';

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (event?.request.headers.has('cookie')) {
        headers['cookie'] = event.request.headers.get('cookie')!;
    }

    const token = event?.locals.token;

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return axios.create({
        baseURL,
        headers,
        withCredentials: true,
        timeout: 10000,
    });
}
