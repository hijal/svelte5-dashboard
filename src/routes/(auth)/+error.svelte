<script lang="ts">
    import { page } from '$app/state';
    import { MoveLeft } from 'lucide-svelte';

    const status = page.status || 500;
    const message = page.error?.message || 'An error occurred';
</script>

<div class="-mt-36 flex min-h-screen items-center justify-center px-4" role="main">
    <div class="mb-0 text-center">
        <h1
            class="mb-6 text-6xl font-extrabold text-red-600 md:text-8xl"
            aria-label="error-{status}"
        >
            {status}
        </h1>

        <p class="mb-4 text-2xl font-medium md:text-3xl">
            {message}
        </p>

        <div class="mb-0 flex justify-center">
            <button
                onclick={() => history.back()}
                class="link link-hover bg-dark-purple rounded-lg px-5 py-2.5 text-white transition-all duration-200 ease-in-out"
                aria-label="Return to homepage"
            >
                <span class="flex items-center gap-2">
                    <MoveLeft size="20" aria-hidden="true" />
                    <span class="text-base font-medium">Go back</span>
                </span>
            </button>
        </div>
    </div>
</div>
