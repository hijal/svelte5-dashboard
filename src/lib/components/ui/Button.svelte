<script lang="ts" module>
    import { tv } from 'tailwind-variants';
    import type { ButtonRootProps } from '$utils/button-types';
    import { cn } from '$utils/cn';

    export const buttonVariants = tv({
        base: 'btn inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants: {
            variant: {
                default:
                    'bg-dark-purple text-white hover:bg-dark-purple/90 focus-visible:ring-dark-purple',
                secondary:
                    'bg-light-gray-blue text-dark-purple hover:bg-gray-light focus-visible:ring-light-gray-blue border border-gray-light',
                warning:
                    'bg-warning-base text-dark-purple hover:bg-warning-base/80 focus-visible:ring-warning-base',
                success:
                    'bg-success-light text-dark-purple hover:bg-success-light/80 focus-visible:ring-success-light',
                error: 'bg-error-light text-error-base hover:bg-error-light/80 focus-visible:ring-error-light',
                outline:
                    'border border-dark-purple bg-transparent text-dark-purple hover:bg-dark-purple hover:text-white focus-visible:ring-dark-purple',
                ghost: 'bg-transparent text-dark-purple hover:bg-light-gray-blue focus-visible:ring-light-gray-blue',
                link: 'text-dark-purple underline-offset-4 hover:underline bg-transparent focus-visible:ring-dark-purple',
            },
            size: {
                default: 'btn',
                sm: 'btn-sm',
                lg: 'btn-lg',
                xl: 'btn-xl',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    });
</script>

<script lang="ts">
    let {
        class: className,
        variant = 'default',
        size = 'default',
        ref = $bindable(null),
        href = undefined,
        type = 'button',
        disabled,
        children,
        ...restProps
    }: ButtonRootProps = $props();
</script>

<svelte:element
    this={href ? 'a' : 'button'}
    data-button-root
    type={href ? undefined : type}
    href={href && !disabled ? href : undefined}
    disabled={href ? undefined : disabled}
    aria-disabled={href ? disabled : undefined}
    role={href && disabled ? 'link' : undefined}
    tabindex={href && disabled ? -1 : 0}
    bind:this={ref}
    class={cn(buttonVariants({ variant, size }), className)}
    {...restProps}
>
    {@render children()}
</svelte:element>
