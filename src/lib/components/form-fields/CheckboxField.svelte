<script lang="ts" generics="T extends Record<string, unknown>">
    import {
        formFieldProxy,
        type FormFieldProxy,
        type FormPathLeaves,
        type SuperForm,
    } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';

    interface Props {
        form: SuperForm<T>;
        fieldName: FormPathLeaves<T, boolean>;
        label: string | undefined;
        class?: string;
        description?: string | undefined;
        required?: boolean;
    }

    const {
        form,
        fieldName,
        label,
        class: classname,
        description,
        required = false,
    }: Props = $props();

    const { value } = formFieldProxy(form, fieldName) satisfies FormFieldProxy<boolean>;
</script>

<div class={classname}>
    <Field {form} name={fieldName}>
        <Control>
            {#snippet children({ props })}
                <input
                    {...props}
                    type="checkbox"
                    class="checkbox checkbox-info"
                    bind:checked={$value}
                />
                <div class="label">
                    <Label class="label-text">
                        {label}
                        {#if required}
                            <span class="text-red-500">*</span>
                        {/if}
                    </Label>
                </div>
            {/snippet}
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" id={`${fieldName}_error_message`} />
    </Field>
</div>
