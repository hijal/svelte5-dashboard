import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { validateJWT } from 'oslo/jwt';
import { redirect } from 'sveltekit-flash-message/server';
import { env } from '$env/dynamic/private';
import type { DecodedToken } from '$lib/interfaces';

const PUBLIC_ROUTES = ['/login', '/forgot-password'];

const authSetup: Handle = async ({ event, resolve }) => {
    const cookieToken = event.cookies.get('session');
    const bearerToken = event.request.headers.get('Authorization')?.split(' ')[1];

    const token = cookieToken ?? bearerToken;

    event.locals.validateToken = async () => {
        if (!token) {
            return {
                valid: false,
                user: null,
                token: null,
            };
        }

        try {
            const secretBuffer = new TextEncoder().encode(env.JWT_SECRET);
            const { payload } = (await validateJWT('HS256', secretBuffer, token)) as {
                payload: DecodedToken;
            };

            return {
                token,
                valid: true,
                user: payload,
            };
        } catch (error) {
            globalThis.console.error(error);
            return {
                valid: false,
                user: null,
                token: null,
            };
        }
    };
    return resolve(event);
};

const authGuard: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

    if (isPublicRoute) {
        return resolve(event);
    }

    const { valid, user, token } = await event.locals.validateToken();

    if (!valid || !user) {
        throw redirect(302, `/login?redirectTo=${pathname}&error=unauthenticated`);
    }

    event.locals.user = user;
    event.locals.token = token;

    if (pathname === '/login') {
        throw redirect(303, '/');
    }

    return resolve(event);
};

export const handle = sequence(authSetup, authGuard);
