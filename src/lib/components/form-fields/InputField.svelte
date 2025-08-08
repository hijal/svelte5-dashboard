<!-- <script lang="ts" generics="T extends Record<string, unknown>">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import {
        formFieldProxy,
        type FormFieldProxy,
        type FormPathLeaves,
        type SuperForm,
    } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';
    import type { Snippet } from 'svelte';

    interface Props {
        form: SuperForm<T>;
        fieldName: FormPathLeaves<T, string | number>;
        class?: string;
        type?: HTMLInputAttributes['type'];
        label?: string | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        autocomplete?: HTMLInputAttributes['autocomplete'];
        step?: HTMLInputAttributes['step'];
        required?: boolean;
        leftIcon?: Snippet;
        rightIcon?: Snippet;
    }

    const {
        form,
        fieldName,
        class: classname,
        type = 'text',
        label,
        description,
        placeholder,
        autocomplete = 'off',
        step,
        required = false,
        leftIcon,
        rightIcon,
    }: Props = $props();

    const { value } = formFieldProxy(form, fieldName) satisfies FormFieldProxy<string | number>;
</script>

<div class={classname}>
    <Field {form} name={fieldName}>
        <Control>
            {#snippet children({ props })}
                {#if label}
                    <div class="label">
                        <Label class="label-text">
                            {label}
                            {#if required}
                                <span class="text-red-500">*</span>
                            {/if}
                        </Label>
                    </div>
                {/if}
                <div class="relative">
                    <div class="relative">
                        <input
                            {...props}
                            {type}
                            {placeholder}
                            {autocomplete}
                            {step}
                            bind:value={$value}
                            onwheel={(e) => (e.target as HTMLInputElement)?.blur()}
                            id={fieldName}
                            class="input w-full rounded-lg border py-3 pr-4 pl-12 focus:border-transparent"
                            required
                        />
                        {#if leftIcon}
                            <div
                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
                            >
                                {@render leftIcon()}
                            </div>
                        {/if}

                        {#if rightIcon}
                            <div
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4"
                            >
                                {@render rightIcon()}
                            </div>
                        {/if}
                    </div>
                </div>
            {/snippet}
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" id={`${fieldName}_error_message`} />
    </Field>
</div> -->

<script lang="ts" generics="T extends Record<string, unknown>">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import {
        formFieldProxy,
        type FormFieldProxy,
        type FormPathLeaves,
        type SuperForm,
    } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';
    import type { Snippet } from 'svelte';
    interface Props {
        form: SuperForm<T>;
        fieldName: FormPathLeaves<T, string | number>;
        class?: string;
        type?: HTMLInputAttributes['type'];
        label?: string | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        autocomplete?: HTMLInputAttributes['autocomplete'];
        step?: HTMLInputAttributes['step'];
        required?: boolean;
        leftIcon?: Snippet;
        rightIcon?: Snippet;
    }
    const {
        form,
        fieldName,
        class: classname,
        type = 'text',
        label,
        description,
        placeholder,
        autocomplete = 'off',
        step,
        required = false,
        leftIcon,
        rightIcon,
    }: Props = $props();
    const { value } = formFieldProxy(form, fieldName) satisfies FormFieldProxy<string | number>;
</script>

<div class={classname}>
    <Field {form} name={fieldName}>
        <Control>
            {#snippet children({ props })}
                {#if label}
                    <div class="label">
                        <Label class="label-text">
                            {label}
                            {#if required}
                                <span class="text-red-500">*</span>
                            {/if}
                        </Label>
                    </div>
                {/if}
                <div class="relative">
                    <div class="relative">
                        <input
                            {...props}
                            {type}
                            {placeholder}
                            {autocomplete}
                            {step}
                            bind:value={$value}
                            onwheel={(e) => (e.target as HTMLInputElement)?.blur()}
                            id={fieldName}
                            class="input w-full rounded-lg border py-3 pr-4 focus:z-10 focus:border-transparent {leftIcon
                                ? 'pl-12'
                                : ''}"
                            required
                        />
                        {#if leftIcon}
                            {@render leftIcon()}
                        {/if}
                        {#if rightIcon}
                            {@render rightIcon()}
                        {/if}
                    </div>
                </div>
            {/snippet}
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" id={`${fieldName}_error_message`} />
    </Field>
</div>
