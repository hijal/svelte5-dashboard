<script lang="ts" generics="T extends Record<string, unknown>">
    import { type SuperForm } from 'sveltekit-superforms';
    import type { Snippet } from 'svelte';

    interface Props {
        form: SuperForm<T>;
        class?: string;
        children?: Snippet;
        id?: string;
        disabled?: boolean;
    }

    const { form, class: classname, children, id: identifier, disabled = false }: Props = $props();

    const { submitting } = form;
</script>

<button
    type="submit"
    class={`btn btn-primary ${classname}`}
    disabled={$submitting || disabled}
    id={identifier}
>
    {#if $submitting}
        <span class="loading loading-spinner loading-sm"></span>
    {:else if children}
        {@render children()}
    {:else}
        Submit
    {/if}
</button>
