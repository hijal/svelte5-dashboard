import { CircleAlert, CircleCheckIcon, CircleX, Info } from 'lucide-svelte';
import toast from 'svelte-french-toast';

export function createSuccessToast(message: string) {
    toast.success(message, {
        icon: CircleCheckIcon,
        style: `
            font-weight: 600;
            font-size: 14px;
            padding: 16px 20px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4), 0 4px 6px -2px rgba(16, 185, 129, 0.1);
        `,
        duration: 3000,
        className: 'success-toast',
        position: 'bottom-right',
    });
}

export function createErrorToast(message: string) {
    toast.error(message, {
        icon: CircleX,
        style: `
            font-weight: 600;
            font-size: 14px;
            padding: 16px 20px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.4), 0 4px 6px -2px rgba(239, 68, 68, 0.1);
        `,
        position: 'bottom-right',
        duration: 3000,
        className: 'error-toast',
    });
}

export function createWarningToast(message: string) {
    toast(message, {
        icon: CircleAlert,
        style: `
            font-weight: 600;
            font-size: 14px;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.4), 0 4px 6px -2px rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        `,
        position: 'bottom-right',
        className: 'warning-toast',
        duration: 3000,
    });
}

export function createInfoToast(message: string) {
    toast(message, {
        icon: Info,
        style: `
            font-weight: 600;
            font-size: 14px;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        `,
        position: 'bottom-right',
        className: 'info-toast',
        duration: 3000,
    });
}
