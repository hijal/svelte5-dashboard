<script lang="ts" generics="T extends Record<string, unknown>">
    import {
        arrayProxy,
        type ArrayProxy,
        type FormPathArrays,
        type SuperForm,
    } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';
    import Select from 'svelte-select';
    interface Props {
        form: SuperForm<T>;
        fieldName: FormPathArrays<T>;
        options: { label: string; value: string | number }[];
        class?: string;
        label?: string | undefined;
        description?: string | undefined;
        maxSelected?: number;
        required?: boolean;
    }

    const {
        form,
        fieldName,
        options,
        class: classname,
        label,
        description,
        maxSelected,
        required = false,
    }: Props = $props();

    const { values } = (arrayProxy(form, fieldName) as ArrayProxy<string>) || { values: [] };

    function handleChange({ detail }: { detail: { value: string }[] }) {
        if (maxSelected && $values.length >= maxSelected) {
            $values = $values.slice(0, maxSelected); // Limit selection
        } else {
            $values = detail.map((item: { value: string }) => item.value); // Update if within the limit
        }
    }

    function handleClear({ detail }: { detail: { value: string } }) {
        $values = $values.filter((value) => value !== detail.value).map((value) => value);
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
                    clearable={false}
                    multiple
                    items={options}
                    id={fieldName}
                    value={options.filter((option) => $values?.includes(option.value))}
                    placeholder={`Select ${(label || '').toLowerCase()}`}
                    on:change={handleChange}
                    on:clear={handleClear}
                >
                    <div slot="input-hidden">
                        {#each $values as value (value)}
                            <input type="hidden" name={fieldName} {value} />
                        {/each}
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
