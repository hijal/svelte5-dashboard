import type { LayoutServerLoad } from './$types';
import { getApi } from '$lib/apiClient/axiosInstance';

export const load: LayoutServerLoad = async (event) => {
    const axios = getApi(event);
    let user = null;
    let isLoggedIn = false;

    const response = await axios.get<{
        data: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            gender: string;
            country: string;
            created_at: string;
            updated_at: string;
        };
    }>('/api/user');

    if (response.status !== 200) {
        return {
            user,
            isLoggedIn,
        };
    }

    user = response.data.data;
    isLoggedIn = true;

    return {
        user,
        isLoggedIn,
    };
};
