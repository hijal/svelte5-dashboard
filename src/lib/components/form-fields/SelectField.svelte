<script lang="ts" generics="T extends Record<string, unknown>">
    import {
        formFieldProxy,
        type FormFieldProxy,
        type FormPathLeaves,
        type SuperForm,
    } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';
    import Select from 'svelte-select';

    interface Props {
        form: SuperForm<T>;
        fieldName: FormPathLeaves<T, string | number>;
        options: { label: string; value: string | number }[];
        class?: string;
        label?: string | undefined;
        description?: string | undefined;
        clearable?: boolean;
        required?: boolean;
    }

    const {
        form,
        fieldName,
        options,
        class: classname,
        label,
        description,
        clearable = true,
        required = false,
    }: Props = $props();

    const { value } = formFieldProxy(form, fieldName) satisfies FormFieldProxy<string | number>;

    function handleChange({ detail }: { detail: { value: string } }) {
        $value = detail.value;
    }

    function handleClear() {
        $value = '';
    }
</script>

<div class={classname}>
    <Field {form} name={fieldName}>
        <Control>
            {#snippet children({ props })}
                {#if label}
                    <div class="label">
                        <Label class="label-text" for={fieldName}>
                            {label}
                            {#if required}
                                <span class="text-red-500">*</span>
                            {/if}
                        </Label>
                    </div>
                {/if}
                <Select
                    {...props}
                    {clearable}
                    items={options}
                    id={fieldName}
                    value={options.find((option) => $value === option.value)}
                    placeholder={`Select ${(label || '').toLowerCase()}`}
                    on:change={handleChange}
                    on:clear={handleClear}
                >
                    <div slot="input-hidden">
                        <input name={fieldName} type="hidden" value={$value} />
                    </div>
                </Select>
            {/snippet}
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" id={`${fieldName}_error_message`} />
    </Field>
</div>
