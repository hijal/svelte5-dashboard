<script lang="ts">
    import { toasts, type ToastPosition } from '$utils/toast.svelte';
    import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-svelte';
    import { fly } from 'svelte/transition';

    interface Props {
        position?: ToastPosition;
    }

    let { position = 'bottom-right' }: Props = $props();

    const positionClasses = {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    };

    const toastTypeClasses = {
        success: 'bg-emerald-500/5 border-white/20 text-emerald-400',
        error: 'bg-red-500/5 border-white/20 text-red-400',
        warning: 'bg-amber-500/5 border-white/20 text-amber-400',
        info: 'bg-blue-500/5 border-white/20 text-blue-400',
    };

    const shadowStyles = {
        success: '0 10px 25px -5px rgba(16, 185, 129, 0.4), 0 4px 6px -2px rgba(16, 185, 129, 0.1)',
        error: '0 10px 25px -5px rgba(239, 68, 68, 0.4), 0 4px 6px -2px rgba(239, 68, 68, 0.1)',
        warning: '0 10px 25px -5px rgba(245, 158, 11, 0.4), 0 4px 6px -2px rgba(245, 158, 11, 0.1)',
        info: '0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.1)',
    };

    function getTransitionDirection() {
        if (position.includes('left')) return { x: -300 };
        if (position.includes('right')) return { x: 300 };
        return { y: position.includes('top') ? -100 : 100 };
    }
</script>

<div class="toast-container fixed z-50 flex flex-col gap-3 {positionClasses[position]}">
    {#each $toasts as toast (toast.id)}
        <div
            class="toast relative flex max-w-md items-start rounded-xl border px-5 py-4 text-sm font-semibold backdrop-blur-md {toastTypeClasses[
                toast.type
            ]}"
            style="box-shadow: {shadowStyles[toast.type]};"
            transition:fly={getTransitionDirection()}
            role="alert"
            aria-live="polite"
        >
            <div class="flex w-full items-center gap-3">
                <div class="mt-0.5 flex-shrink-0">
                    {#if toast.type === 'success'}
                        <CircleCheck size={20} />
                    {:else if toast.type === 'error'}
                        <CircleX size={20} />
                    {:else if toast.type === 'warning'}
                        <CircleAlert size={20} />
                    {:else if toast.type === 'info'}
                        <Info size={20} />
                    {/if}
                </div>

                <div class="text-dark-purple leading-6 font-normal">
                    {toast.message}
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    @media (max-width: 640px) {
        .toast-container {
            left: 1rem !important;
            right: 1rem !important;
            max-width: calc(100vw - 2rem);
        }

        .toast {
            min-width: unset;
        }
    }
</style>
