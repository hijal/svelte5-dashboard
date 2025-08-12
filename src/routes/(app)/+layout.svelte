<script lang="ts">
    import '../../app.css';

    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import { getFlash } from 'sveltekit-flash-message';

    import type { LayoutData } from './$types';
    import Sidebar from '$components/layout/Sidebar.svelte';
    import Navbar from '$components/layout/Navbar.svelte';
    import ToastContainer from '$components/ui/ToastContainer.svelte';
    import { errorToast, successToast } from '$utils/toast.svelte';

    interface Props {
        children: Snippet;
        data: LayoutData;
    }

    let { children, data }: Props = $props();

    let sidebarOpen = $state<boolean>(false);

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

<div class="drawer lg:drawer-open">
    <input id="drawer-toggle" type="checkbox" class="drawer-toggle" bind:checked={sidebarOpen} />

    <div class="drawer-content flex flex-col">
        <Navbar data={data.user} />

        <main class="flex-1 bg-gray-50 px-4 py-8">
            {@render children()}
        </main>
    </div>

    <div class="drawer-side">
        <label for="drawer-toggle" class="drawer-overlay"></label>
        <Sidebar />
    </div>
</div>

<ToastContainer />
