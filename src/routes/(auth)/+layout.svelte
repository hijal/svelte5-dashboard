<script lang="ts">
    import '../../app.css';
    import { page } from '$app/state';
    import type { Snippet } from 'svelte';
    import { getFlash } from 'sveltekit-flash-message';
    import { errorToast, successToast } from '$utils/toast.svelte';
    import ToastContainer from '$components/ui/ToastContainer.svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
    const flash = getFlash(page);

    $effect(() => {
        if ($flash) {
            if ($flash.type === 'success') {
                successToast($flash.message);
            } else {
                errorToast($flash.message);
            }

            $flash = undefined;
        }
    });
</script>

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

<ToastContainer />
