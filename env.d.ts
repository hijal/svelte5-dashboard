/// <reference types="@sveltejs/kit" />

declare module '$env/static/public' {
    // example:
    export const PUBLIC_API_HOST: string;
    export const PUBLIC_NODE_ENV: 'development' | 'production';
}

declare module '$env/static/private' {
    // example:
    // export const API_KEY: string;
}
