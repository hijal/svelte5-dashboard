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
        proposalOptions?: string[];
        class?: string;
        label?: string | undefined;
        description?: string | undefined;
        required?: boolean;
    }

    const {
        form,
        fieldName,
        class: classname,
        label,
        description,
        proposalOptions,
        required = false,
    }: Props = $props();

    const { values } = arrayProxy(form, fieldName) as ArrayProxy<string>;

    let filterText: string = $state('');
    let items: string[] = $state(proposalOptions || []);

    function handleFilter({ detail }: { detail: { label: string; value: string }[] }) {
        if ($values.find((i) => i === filterText)) return; // Prevent duplicates
        if (detail.length === 0 && filterText.length > 0) {
            items = [filterText];
        }
    }

    function handleChange({ detail }: { detail: { value: string }[] }) {
        $values = detail.map((item: { value: string }) => item.value);
        items = proposalOptions || [];
    }

    function handleClear({ detail }: { detail: { value: string } }) {
        $values = $values.filter((value) => value !== detail.value).map((value) => value);
        items = proposalOptions || [];
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
                    class="chips"
                    clearable={false}
                    id={fieldName}
                    multiple
                    items={items.map((value) => ({ label: value, value: value }))}
                    value={$values.map((value) => ({ label: value, value: value }))}
                    placeholder={`Add ${(label || '').toLowerCase()}${proposalOptions ? ' (start typing to add a new value)' : ''}`}
                    bind:filterText
                    on:change={handleChange}
                    on:filter={handleFilter}
                    on:clear={handleClear}
                    on:blur={() => (items = proposalOptions || [])}
                    on:focus={() => (items = proposalOptions || [])}
                >
                    <div slot="empty" class="p-3 text-center">
                        <div class="text-sm text-gray-400">
                            {#if filterText.length > 0}
                                Value "{filterText}" already exists
                            {:else}
                                Start typing to add a new value
                            {/if}
                        </div>
                    </div>
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
