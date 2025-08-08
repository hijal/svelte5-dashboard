export const load = async ({ cookies }) => {
    const token = cookies.get('token');

    if (token) {
        cookies.delete('token', { path: '/' });
    }

    return {};
};
