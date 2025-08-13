import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { handleThrowActionError } from '$utils/errorHandler';
import type { User } from '$lib/interfaces';
import { getApi } from '$lib/apiClient/axiosInstance';

export const load: PageServerLoad = async (event: RequestEvent) => {
    const axios = getApi(event);

    try {
        const response = await axios.get<User[]>('/api/users');

        if (response.status !== 200) {
            handleThrowActionError(new Error(`Server returned ${response.status}`), {
                fallbackStatus: response.status,
            });
        }

        return {
            users: response.data,
        };
    } catch (error) {
        handleThrowActionError(error);
    }
};
