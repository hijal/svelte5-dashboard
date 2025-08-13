import { getApi } from '$lib/apiClient/axiosInstance';
import type { User } from '$lib/interfaces';
import { handleActionError, processError } from '$utils/errorHandler';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
    const axios = getApi(event);

    try {
        const response = await axios.get<User>('/api/me');

        if (response.status === 200) {
            return {
                user: response.data,
            };
        }

        return {
            user: null,
        };
    } catch (error) {
        const errorDetails = processError(error);

        if (errorDetails.type === 'authentication') {
            return handleActionError(error, event.url, event.cookies, {
                redirectPath: '/login',
            });
        }

        return {
            user: null,
        };
    }
};
