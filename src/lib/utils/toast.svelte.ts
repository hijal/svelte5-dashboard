import { writable } from 'svelte/store';

export type ToastPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration: number;
    timestamp: number;
}

function createToastStore() {
    const { subscribe, update } = writable<Toast[]>([]);

    return {
        subscribe,
        add: (toast: Omit<Toast, 'id' | 'timestamp'>) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newToast: Toast = {
                ...toast,
                id,
                timestamp: Date.now(),
            };

            update((toasts) => [...toasts, newToast]);

            setTimeout(() => {
                update((toasts) => toasts.filter((t) => t.id !== id));
            }, toast.duration);

            return id;
        },
        remove: (id: string) => {
            update((toasts) => toasts.filter((t) => t.id !== id));
        },
        clear: () => {
            update(() => []);
        },
    };
}

export const toasts = createToastStore();

export function successToast(message: string) {
    return toasts.add({
        type: 'success',
        message,
        duration: 3000,
    });
}

export function errorToast(message: string) {
    return toasts.add({
        type: 'error',
        message,
        duration: 3000,
    });
}

export function warningToast(message: string) {
    return toasts.add({
        type: 'warning',
        message,
        duration: 3000,
    });
}

export function infoToast(message: string) {
    return toasts.add({
        type: 'info',
        message,
        duration: 3000,
    });
}
