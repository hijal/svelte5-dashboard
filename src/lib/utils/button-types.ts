import type { Snippet } from 'svelte';
import type { WithChildren, WithoutChildren } from 'svelte-toolbelt';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant =
    | 'default'
    | 'secondary'
    | 'warning'
    | 'success'
    | 'error'
    | 'outline'
    | 'ghost'
    | 'link';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon';

export type ButtonRootPropsWithoutHTML = WithChildren<{
    ref?: HTMLElement | null;
    variant?: ButtonVariant;
    size?: ButtonSize;
    class?: string;
    children: Snippet;
}>;

type AnchorElement = ButtonRootPropsWithoutHTML &
    WithoutChildren<Omit<HTMLAnchorAttributes, 'href' | 'type'>> & {
        href: HTMLAnchorAttributes['href'];
        type?: never;
        disabled?: HTMLButtonAttributes['disabled'];
    };

type ButtonElement = ButtonRootPropsWithoutHTML &
    WithoutChildren<Omit<HTMLButtonAttributes, 'href' | 'type'>> & {
        type?: HTMLButtonAttributes['type'];
        disabled?: HTMLButtonAttributes['disabled'];
        href?: never;
    };

export type ButtonRootProps = AnchorElement | ButtonElement;

export type OnChangeFn<T> = (value: T) => void;
