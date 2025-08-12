import axios, { type AxiosInstance } from 'axios';
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const cache = new Map<string, { data: unknown; timestamp: number }>();
export const CACHE_DURATION = 5 * 60 * 1000;

export function createAxios(event?: RequestEvent): AxiosInstance {
    const baseURL = env.PUBLIC_API_HOST || 'http://localhost:5173';

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (event?.request.headers.has('cookie')) {
        headers['cookie'] = event.request.headers.get('cookie')!;
    }

    return axios.create({
        baseURL,
        headers,
        withCredentials: true,
        timeout: 10000,
    });
}

export function clearApiCache(): void {
    cache.clear();
}

export function invalidateApiCache(urlPattern: string): void {
    for (const key of cache.keys()) {
        if (key.includes(urlPattern)) {
            cache.delete(key);
        }
    }
}
