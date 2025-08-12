import type { Actions, RequestEvent } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from 'sveltekit-superforms';
import { redirect } from 'sveltekit-flash-message/server';

import { loginSchema } from './schema';
import { getApi } from '$lib/apiClient/axiosInstance';
import { env } from '$env/dynamic/public';
import { handleActionError } from '$lib/utils/errorHandler';

export const load = async ({ url }: RequestEvent) => {
    const redirectTo = url.searchParams.get('redirectTo') ?? '/';
    const form = await superValidate({ redirectTo }, zod4(loginSchema));
    return { form, redirectTo };
};

export const actions: Actions = {
    default: async ({ request, cookies, url }: RequestEvent) => {
        const form = await superValidate(request, zod4(loginSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { redirectTo, ...formData } = form.data;
        const axios = getApi();

        const response = await axios
            .post('/api/signin', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .catch((error) => {
                return handleActionError(error, url, cookies, {
                    redirectPath: url.pathname,
                });
            });

        if (response instanceof Response) {
            return response;
        }

        if (response.status !== 200) {
            return handleActionError(
                new Error(`Server returned ${response.status}`),
                url,
                cookies,
                { redirectPath: url.pathname },
            );
        }

        if (!response.data.token) {
            return handleActionError(
                new Error('Invalid server response: missing token'),
                url,
                cookies,
                { redirectPath: url.pathname },
            );
        }

        cookies.set('session', response.data.token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: env.PUBLIC_NODE_ENV === 'production',
            maxAge: 60 * 30,
        });

        return redirect(
            302,
            redirectTo,
            {
                type: 'success',
                message: 'Login successful!',
            },
            cookies,
        );
    },
};
