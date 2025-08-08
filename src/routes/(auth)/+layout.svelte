<script lang="ts">
    import '../../app.css';
    import { page } from '$app/state';
    import { createErrorToast, createSuccessToast } from '$utils/toast';
    import type { Snippet } from 'svelte';
    import { Toaster } from 'svelte-french-toast';
    import { getFlash } from 'sveltekit-flash-message';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
    const flash = getFlash(page);

    $effect(() => {
        if ($flash) {
            if ($flash.type === 'success') {
                createSuccessToast($flash.message);
            } else {
                createErrorToast($flash.message);
            }

            $flash = undefined;
        }
    });
</script>

<Toaster position="bottom-right" />

<main class="min-h-screen bg-gray-50 px-2 py-4">
    <div class="hidden px-2 py-0 lg:block">
        <a href="/" class="mt-0 no-underline">
            <img src="/logo.svg" alt="Company Logo" class="mt-1 w-32" />
        </a>
    </div>
    <div class="mt-20 max-h-screen">
        {@render children()}
    </div>
</main>
