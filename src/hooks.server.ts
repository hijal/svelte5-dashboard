import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const publicRoutes = ['/login', '/forgot-password'];

    const token =
        event.request.headers.get('Authorization')?.split(' ')[1] ?? event.cookies.get('token');

    if (publicRoutes.includes(event.url.pathname)) {
        if (token) {
            throw redirect(302, '/');
        }
        return resolve(event);
    }

    if (!token) {
        throw redirect(302, '/login');
    }

    return resolve(event);
};
