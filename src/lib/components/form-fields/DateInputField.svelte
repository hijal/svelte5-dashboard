<script lang="ts" generics="T extends Record<string, unknown>">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import {
        formFieldProxy,
        type FormFieldProxy,
        type FormPathLeaves,
        type SuperForm,
    } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';
    import { isValid, parseISO, format } from 'date-fns';
    import { DEFAULT_DATE, DEFAULT_DATE_FORMAT } from '$utils/constant';

    interface Props {
        form: SuperForm<T>;
        fieldName: FormPathLeaves<T, string>;
        class?: string;
        label?: string | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        autocomplete?: HTMLInputAttributes['autocomplete'];
        required?: boolean;
    }

    const {
        form,
        fieldName,
        class: classname,
        label,
        description,
        placeholder,
        autocomplete = 'off',
        required = false,
    }: Props = $props();

    const { value } = formFieldProxy(form, fieldName) satisfies FormFieldProxy<string>;

    // initialize and set 0001-01-01 for invalid date
    $effect(() => {
        if (!$value) {
            return;
        }
        const parsedDate = parseISO($value);
        $value = isValid(parsedDate) ? format(parsedDate, DEFAULT_DATE_FORMAT) : DEFAULT_DATE;
    });
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
                <input
                    {...props}
                    {placeholder}
                    {autocomplete}
                    type="date"
                    class="input input-bordered w-full"
                    bind:value={$value}
                />
            {/snippet}
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" id={`${fieldName}_error_message`} />
    </Field>
</div>
