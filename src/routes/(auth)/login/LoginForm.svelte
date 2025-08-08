<script lang="ts">
    import { dev } from '$app/environment';
    import { Eye, EyeOff, Lock, Mail } from 'lucide-svelte';
    import type { Infer } from 'sveltekit-superforms/server';
    import { zod4Client } from 'sveltekit-superforms/adapters';
    import SuperDebug, { superForm, type SuperValidated } from 'sveltekit-superforms';

    import { loginSchema, type LoginSchema } from './schema';
    import InputField from '$components/form-fields/InputField.svelte';
    import SubmitButton from '$components/form-fields/SubmitButton.svelte';
    import { errorToast, successToast } from '$utils/toast.svelte';

    interface Props {
        data: SuperValidated<Infer<LoginSchema>>;
    }
    const { data }: Props = $props();

    const form = superForm(data, {
        validators: zod4Client(loginSchema),
        resetForm: false,
        onResult({ result }) {
            if (result.type === 'success') {
                successToast('Login successful!');
            }
        },
        onError({ result }) {
            errorToast(result.error.message || 'Unknown error');
        },
    });
    const { form: formData, message, enhance } = form;

    let showPassword = $state(false);
    const togglePasswordVisibility = () => {
        showPassword = !showPassword;
    };
</script>

{#if $message}<h3>{$message}</h3>{/if}

<form class="space-y-6" method="POST" action="?" use:enhance>
    <div>
        <label for="email" class="mb-2 block text-sm font-medium text-gray-700">Email</label>
        <InputField {form} fieldName="email" type="email" placeholder="Type your email">
            {#snippet leftIcon()}
                <div
                    class="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4"
                >
                    <Mail size="16" color="currentColor" />
                </div>
            {/snippet}
        </InputField>
    </div>
    <div>
        <label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
        <InputField
            {form}
            fieldName="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Your password"
        >
            {#snippet leftIcon()}
                <div
                    class="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4"
                >
                    <Lock size="16" color="currentColor" />
                </div>
            {/snippet}
            {#snippet rightIcon()}
                <div class="absolute inset-y-0 right-0 z-20 flex items-center pr-4">
                    <button
                        type="button"
                        class="z-50 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onclick={togglePasswordVisibility}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {#if showPassword}
                            <EyeOff size="16" color="currentColor" />
                        {:else}
                            <Eye size="16" color="currentColor" />
                        {/if}
                    </button>
                </div>
            {/snippet}
        </InputField>
    </div>
    <div class="flex items-center justify-between">
        <a
            href="/forgot-password"
            class="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
        >
            Forgot Password?
        </a>
    </div>
    <SubmitButton {form} class="w-full">Login</SubmitButton>
    <div class="text-center text-sm text-gray-600">
        Don't have an account yet?
        <a href="/" class="font-medium text-blue-600 transition-colors hover:text-blue-800">
            Click here
        </a>
    </div>
</form>
<div class="mt-4">
    <SuperDebug data={$formData} display={dev} />
</div>
