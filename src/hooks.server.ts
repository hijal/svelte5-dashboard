import { env } from '$env/dynamic/private';
import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { validateJWT } from 'oslo/jwt';
import { redirect } from 'sveltekit-flash-message/server';

const authSetup: Handle = async ({ event, resolve }) => {
    const cookieToken = event.cookies.get('session');
    const bearerToken = event.request.headers.get('Authorization')?.split(' ')[1];

    const token = cookieToken ?? bearerToken;

    event.locals.validateToken = async () => {
        if (!token) {
            return {
                valid: false,
                user: null,
            };
        }

        try {
            const secretBuffer = new TextEncoder().encode(env.JWT_SECRET);
            const result = (await validateJWT('HS256', secretBuffer, token)) as {
                payload: {
                    id: number;
                    email: string;
                    iat: number;
                    exp: number;
                };
            };

            return {
                valid: true,
                user: {
                    id: result.payload.id,
                    email: result.payload.email,
                    iat: result.payload.iat,
                    exp: result.payload.exp,
                },
            };
        } catch (error) {
            globalThis.console.error(error);
            return {
                valid: false,
                user: null,
            };
        }
    };
    return resolve(event);
};

const authGuard: Handle = async ({ event, resolve }) => {
    const publicRoutes = ['/login', '/forgot-password'];

    const isPublicRoute = publicRoutes.some((route) => event.url.pathname.startsWith(route));

    if (!isPublicRoute) {
        const { valid, user } = await event.locals.validateToken();

        if (!valid) {
            event.cookies.delete('session', { path: '/' });
            throw redirect(302, `/login?redirectTo=${event.url.pathname}`);
        }

        event.locals.user = user;
    }
    return resolve(event);
};

export const handle = sequence(authSetup, authGuard);
