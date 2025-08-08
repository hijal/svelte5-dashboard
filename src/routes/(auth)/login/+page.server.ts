import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { loginSchema } from './schema';
import { fail } from 'sveltekit-superforms';
import { getApi } from '$lib/apiClient/axiosInstance';
import { AxiosError } from 'axios';
import { redirect } from 'sveltekit-flash-message/server';
import { env } from '$env/dynamic/public';

export const load = async () => {
    const form = await superValidate(zod4(loginSchema));
    return { form };
};

export const actions = {
    default: async ({ request, cookies, url }) => {
        const form = await superValidate(request, zod4(loginSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        let response;
        let errorMessage = 'An unexpected error occurred';

        try {
            const axios = getApi();
            response = await axios.post('/api/signin', form.data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    errorMessage =
                        error.response.data?.message ??
                        error.response.data?.error ??
                        `Server error: ${error.response.status}`;
                } else if (error.request) {
                    errorMessage = 'Network error: Unable to connect to server';
                } else {
                    errorMessage = error.message;
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            return redirect(
                302,
                url.pathname,
                {
                    type: 'error',
                    message: errorMessage,
                },
                cookies,
            );
        }

        if (response.status === 200 && response.data.token) {
            cookies.set('token', response.data.token, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: env.PUBLIC_NODE_ENV === 'production',
                maxAge: 60 * 30,
            });

            return redirect(
                302,
                '/',
                {
                    type: 'success',
                    message: 'Login successful!',
                },
                cookies,
            );
        } else {
            return redirect(
                302,
                url.pathname,
                {
                    type: 'error',
                    message: 'Login failed: Invalid response from server',
                },
                cookies,
            );
        }
    },
};
