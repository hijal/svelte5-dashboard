/// <reference types="@sveltejs/kit" />

declare module '$env/dynamic/public' {
    export const env: {
        PUBLIC_API_HOST: string;
        PUBLIC_NODE_ENV: 'development' | 'production';
    };
}

declare module '$env/dynamic/private' {
    // example:
    // export const API_KEY: string;
}
