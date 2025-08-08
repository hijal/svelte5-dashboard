<script lang="ts">
    import type { Snippet } from 'svelte';
    import { X } from 'lucide-svelte';
    import { fade, scale, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    interface Props {
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
        size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
        position?: 'top' | 'middle' | 'bottom' | 'start' | 'end';
        backdrop?: boolean;
        showCloseButton?: boolean;
        closeOnBackdropClick?: boolean;
        closeOnEscape?: boolean;
        preventBodyScroll?: boolean;
        teleportTo?: string | HTMLElement;
        animation?: 'fade' | 'scale' | 'slide' | 'none';
        animationDuration?: number;
        closeButtonColor?: string;
        modalClass?: string;
        modalBoxClass?: string;
        triggerClass?: string;
        titleClass?: string;
        descriptionClass?: string;
        children: Snippet;
        trigger?: Snippet;
        footer?: Snippet;
        title?: Snippet;
        description?: Snippet;
    }

    let {
        open = $bindable(false),
        onOpenChange,
        title,
        description,
        children,
        trigger,
        footer,
        size = 'md',
        position = 'middle',
        backdrop = true,
        showCloseButton = true,
        closeOnBackdropClick = true,
        closeOnEscape = true,
        preventBodyScroll = true,
        teleportTo,
        animation = 'fade',
        animationDuration = 300,
        closeButtonColor = '#ff0000',
        modalClass = '',
        modalBoxClass = '',
        triggerClass = '',
        titleClass = '',
        descriptionClass = '',
    }: Props = $props();

    let modalToggle: HTMLInputElement;
    let dialogElement = $state<HTMLDialogElement | null>(null);
    let modalContainer: HTMLElement;

    function handleToggleChange() {
        const newOpen = modalToggle.checked;
        updateOpenState(newOpen);
    }

    function handleClose() {
        updateOpenState(false);
    }

    function updateOpenState(newOpen: boolean) {
        open = newOpen;
        onOpenChange?.(open);

        if (preventBodyScroll) {
            if (open) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    const sizeClasses = {
        xs: 'max-w-xs sm:w-64',
        sm: 'max-w-sm sm:w-80',
        md: 'max-w-md sm:w-96 sm:max-w-md',
        lg: 'max-w-lg sm:w-11/12 sm:max-w-2xl lg:max-w-3xl',
        xl: 'max-w-xl sm:w-11/12 sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl',
        full: 'h-full sm:w-11/12 sm:max-w-7xl sm:h-auto md:h-full',
    };

    const positionClasses = {
        top: 'modal-top',
        middle: 'modal-middle',
        bottom: 'modal-bottom',
        start: 'modal-start',
        end: 'modal-end',
    };

    const getDefaultTriggerClass = () => (triggerClass ? '' : 'btn btn-primary');
    const getDefaultTitleClass = () => (titleClass ? '' : 'text-lg font-bold');
    const getDefaultDescriptionClass = () => (descriptionClass ? '' : 'text-sm opacity-70 mb-4');

    const modalId = $state(`modal-${Math.random().toString(36).slice(2)}`);

    function handleBackdropClick() {
        if (closeOnBackdropClick) {
            handleClose();
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' && open && closeOnEscape) {
            handleClose();
        }
    }

    function handleModalOpen() {
        if (open && dialogElement) {
            const focusableElements = dialogElement.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            const firstFocusable = focusableElements[0] as HTMLElement;
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }

    function getTeleportTarget(): HTMLElement {
        if (typeof teleportTo === 'string') {
            const element = document.querySelector(teleportTo) as HTMLElement;
            if (!element) {
                return document.body;
            }
            return element;
        }
        return teleportTo || document.body;
    }

    function teleportModal() {
        if (modalContainer && open) {
            const target = getTeleportTarget();
            if (target && modalContainer.parentNode !== target) {
                target.appendChild(modalContainer);
            }
        }
    }

    function getModalTransition(node: HTMLElement) {
        const duration = animationDuration;
        const easing = quintOut;

        switch (animation) {
            case 'scale':
                return scale(node, { duration, easing, start: 0.8 });
            case 'slide':
                return fly(node, {
                    duration,
                    easing,
                    opacity: 0,
                });
            case 'fade':
                return fade(node, { duration, easing, delay: 100 });
            case 'none':
                return { duration: 0 };
            default:
                return fade(node, { duration, easing });
        }
    }

    function getBackdropTransition(node: HTMLElement) {
        return fade(node, { duration: animationDuration, easing: quintOut });
    }

    $effect(() => {
        if (modalToggle) {
            modalToggle.checked = open;
        }

        if (open) {
            handleModalOpen();
        }

        if (teleportTo && open) {
            teleportModal();
        }

        return () => {
            if (preventBodyScroll) {
                document.body.style.overflow = '';
            }
        };
    });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if trigger}
    <label for={modalId} class="{getDefaultTriggerClass()} {triggerClass}">
        {@render trigger()}
    </label>
{/if}

<input
    type="checkbox"
    bind:this={modalToggle}
    id={modalId}
    class="modal-toggle"
    checked={open}
    onchange={handleToggleChange}
    aria-hidden="true"
/>

<div bind:this={modalContainer}>
    {#if open}
        <dialog
            bind:this={dialogElement}
            class="modal {positionClasses[position]} {modalClass} modal-open"
            aria-labelledby={title ? `${modalId}-title` : undefined}
            aria-describedby={description ? `${modalId}-description` : undefined}
            aria-modal="true"
        >
            <div
                class="modal-box relative {sizeClasses[size]} {modalBoxClass}"
                transition:getModalTransition
            >
                {#if showCloseButton}
                    <button
                        type="button"
                        class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2 z-10"
                        aria-label="Close modal"
                        onclick={handleClose}
                    >
                        <X size={20} color={closeButtonColor} />
                    </button>
                {/if}

                {#if title}
                    <div id="{modalId}-title" class="{getDefaultTitleClass()} {titleClass}">
                        {@render title()}
                    </div>
                {/if}

                {#if description}
                    <div
                        id="{modalId}-description"
                        class="{getDefaultDescriptionClass()} {descriptionClass}"
                    >
                        {@render description()}
                    </div>
                {/if}

                <div class="modal-content">
                    {@render children()}
                </div>

                {#if footer}
                    <div class="modal-action mt-6">
                        {@render footer()}
                    </div>
                {/if}
            </div>

            {#if backdrop}
                <div
                    class="modal-backdrop cursor-pointer"
                    onclick={handleBackdropClick}
                    aria-label="Close modal"
                    role="presentation"
                    transition:getBackdropTransition
                ></div>
            {/if}
        </dialog>
    {/if}
</div>
