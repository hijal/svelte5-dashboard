<script lang="ts">
    import { Check } from 'lucide-svelte';
    import type { PageData } from './$types';
    import LoginForm from './LoginForm.svelte';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

<svelte:head>
    <title>Login | Triple-A Merchant Dashboard</title>
</svelte:head>

<div>
    <div class="flex items-center justify-center p-4">
        <div class="w-full max-w-5xl">
            <div class="flex flex-col lg:flex-row">
                <div class="hidden flex-col justify-center p-8 lg:flex lg:p-12">
                    <h2
                        class="text-dark-purple mt-0 mb-8 text-3xl leading-normal font-bold lg:text-5xl"
                    >
                        Welcome to
                        <br />
                        <img src="/logo.svg" alt="Company Logo" class="mt-1 mb-0 w-32" />
                    </h2>

                    <div class="space-y-4">
                        <div class="flex items-center">
                            <div
                                class="bg-green-primary mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                            >
                                <Check class="text-dark-purple w-3.5" size="25" />
                            </div>
                            <span class="text-dark-purple text-base leading-6 font-medium">
                                Accept payments globally
                            </span>
                        </div>
                        <div class="flex items-center">
                            <div
                                class="bg-green-primary mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                            >
                                <Check class="text-dark-purple w-3.5" size="25" />
                            </div>
                            <span class="text-dark-purple text-base leading-6 font-medium">
                                Track earnings in real-time
                            </span>
                        </div>
                        <div class="flex items-center">
                            <div
                                class="bg-green-primary mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                            >
                                <Check class="text-dark-purple w-3.5" size="25" />
                            </div>
                            <span class="text-dark-purple text-base leading-6 font-medium">
                                Simplify payouts in digital or local currencies
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    class="border-gray-light flex flex-col justify-center rounded-lg border-[1px] bg-white p-8 lg:p-12"
                >
                    <div class="mx-auto w-full">
                        redirectTo
                        <div class="mb-8">
                            <h2 class="text-dark-purple mt-0 mb-2 text-5xl font-bold">Login</h2>
                            <p class="text-gray-dark text-lg font-normal">Continue to Triple A</p>
                        </div>

                        <LoginForm data={data.form} />

                        <div class="mt-8 text-center text-xs text-gray-500">
                            Please contact us at
                            <a
                                href="mailto:support@triple-a.io"
                                class="text-blue-600 transition-colors hover:text-blue-800"
                            >
                                support@triple-a.io
                            </a>
                            if you have any questions.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
