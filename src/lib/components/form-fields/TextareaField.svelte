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
        fieldName: FormPathLeaves<T, string>;
        class?: string;
        label?: string | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean;
    }

    const {
        form,
        fieldName,
        class: classname,
        label,
        description,
        placeholder,
        required = false,
    }: Props = $props();

    const { value } = formFieldProxy(form, fieldName) satisfies FormFieldProxy<string>;
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
                <textarea
                    {...props}
                    {placeholder}
                    class="textarea textarea-bordered h-24 w-full"
                    bind:value={$value}
                ></textarea>
            {/snippet}
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" id={`${fieldName}_error_message`} />
    </Field>
</div>
