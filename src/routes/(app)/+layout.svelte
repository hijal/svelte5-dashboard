<script lang="ts">
    import '../../app.css';
    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import { Toaster } from 'svelte-5-french-toast';
    import { getFlash } from 'sveltekit-flash-message';
    import Sidebar from '$components/layout/Sidebar.svelte';
    import Navbar from '$components/layout/Navbar.svelte';
    import { createErrorToast, createSuccessToast } from '$utils/toast';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    let sidebarOpen = $state<boolean>(false);

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

<div class="drawer lg:drawer-open">
    <input id="drawer-toggle" type="checkbox" class="drawer-toggle" bind:checked={sidebarOpen} />

    <div class="drawer-content flex flex-col">
        <Navbar />

        <main class="flex-1 bg-gray-50 px-4 py-8">
            {@render children()}
        </main>
    </div>

    <div class="drawer-side">
        <label for="drawer-toggle" class="drawer-overlay"></label>
        <Sidebar />
    </div>
</div>

<Toaster />
