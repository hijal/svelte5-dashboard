import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { validateJWT } from 'oslo/jwt';
import { redirect } from 'sveltekit-flash-message/server';
import { env } from '$env/dynamic/private';
import type { DecodedToken } from '$lib/interfaces';

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
    const publicRoutes = ['/login', '/forgot-password'];

    const isPublicRoute = publicRoutes.some((route) => event.url.pathname.startsWith(route));

    const isAuthRoute = (pathname: string): boolean => {
        const authPatterns = ['/login', '/forgot-password'];

        return authPatterns.some((pattern) => pathname.startsWith(pattern));
    };

    const isCurrentlyAuthRoute = isAuthRoute(event.url.pathname);

    const { valid, user, token } = await event.locals.validateToken();

    if (valid) {
        event.locals.decodedToken = user;
        event.locals.token = token;

        if (isCurrentlyAuthRoute) {
            const redirectTo = event.url.searchParams.get('redirectTo') ?? '/';
            throw redirect(302, redirectTo);
        }
    } else {
        if (event.cookies.get('session')) {
            event.cookies.delete('session', { path: '/' });
        }

        if (!isPublicRoute) {
            throw redirect(302, `/login?redirectTo=${event.url.pathname}`);
        }
    }

    return resolve(event);
};

export const handle = sequence(authSetup, authGuard);
