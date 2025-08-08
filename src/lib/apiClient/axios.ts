import axios from 'axios';
import type { RequestEvent } from '@sveltejs/kit';
import { PUBLIC_API_HOST } from '$env/static/public';

export function createAxios(event?: RequestEvent) {
    const baseURL = PUBLIC_API_HOST || 'http://localhost:5173';

    const headers: Record<string, string> = {};

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
