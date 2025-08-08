import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        csp: {
            mode: 'auto',
            directives: {
                'default-src': ["'self'"],
                'script-src': ["'self'"],
                'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
                'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
                'img-src': ["'self'", 'data:'],
                'connect-src': ["'self'", 'https://api.triple-a.io'],
                'frame-ancestors': ["'none'"],
                'form-action': ["'self'"],
                'base-uri': ["'self'"],
                'object-src': ["'self'"],
                'media-src': ["'self'", 'blob:'],
                'frame-src': ["'self'", 'blob:'],
            },
        },
        alias: {
            '$components/*': './src/lib/components/*',
            '$utils/*': './src/lib/utils/*',
            '$routes/*': './src/routes/*',
        },
    },
};

export default config;
