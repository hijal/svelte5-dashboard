<script lang="ts" generics="T extends Record<string, unknown>">
    import { fileProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';

    interface Props {
        form: SuperForm<T>;
        fieldName: FormPathLeaves<T, File>;
        class?: string;
        label?: string;
        description?: string;
        accept?: string;
        multiple?: boolean;
        required?: boolean;
    }

    const {
        form,
        fieldName,
        class: classname = '',
        label,
        description,
        accept = '*/*',
        multiple = false,
        required = false,
    }: Props = $props();

    const file = fileProxy(form, fieldName);
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
                    type="file"
                    {accept}
                    {multiple}
                    id={fieldName}
                    class="file-input file-input-bordered w-full"
                    bind:files={$file}
                    onwheel={(e) => (e.target as HTMLInputElement)?.blur()}
                />
            {/snippet}
        </Control>

        {#if description}
            <Description>{description}</Description>
        {/if}

        <FieldErrors class="invalid mt-2 text-xs text-red-400" id={`${fieldName}_error_message`} />
    </Field>
</div>
