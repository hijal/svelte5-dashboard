<script lang="ts">
    import type { Component } from 'svelte';
    import { page } from '$app/state';

    import AddressBook from '$components/icons/AddressBook.svelte';
    import ApiCredentials from '$components/icons/APICredentials.svelte';
    import CreateFiat from '$components/icons/CreateFiat.svelte';
    import CreatePaymentRequest from '$components/icons/CreatePaymentRequest.svelte';
    import CryptoPayout from '$components/icons/CryptoPayout.svelte';
    import Deposit from '$components/icons/Deposit.svelte';
    import FiatPayout from '$components/icons/FiatPayout.svelte';
    import Home from '$components/icons/Home.svelte';
    import IntegrationDocs from '$components/icons/IntegrationDocs.svelte';
    import Payment from '$components/icons/Payment.svelte';
    import PaymentOption from '$components/icons/PaymentOption.svelte';
    import Payouts from '$components/icons/Payouts.svelte';
    import Refunds from '$components/icons/Refunds.svelte';
    import Statement from '$components/icons/Statement.svelte';
    import Withdrawals from '$components/icons/Withdrawals.svelte';

    interface MenuItem {
        name: string;
        href: string;
        icon: Component;
    }

    interface MenuSection {
        title: string;
        items: MenuItem[];
        showBorder?: boolean;
    }

    const currentPath = $derived(page.url.pathname);

    const menuSections = $state<MenuSection[]>([
        {
            title: '',
            items: [
                {
                    name: 'Home',
                    icon: Home,
                    href: '/',
                },
            ],
            showBorder: true,
        },
        {
            title: 'History',
            items: [
                {
                    name: 'Payment',
                    href: '/payment',
                    icon: Payment,
                },
                {
                    name: 'Refunds',
                    href: '/refund',
                    icon: Refunds,
                },
                {
                    name: 'Payouts',
                    href: '/payout',
                    icon: Payouts,
                },
                {
                    name: 'Fiat Payout',
                    href: '/fiat-payout',
                    icon: FiatPayout,
                },
                {
                    name: 'Deposit',
                    href: '/deposit',
                    icon: Deposit,
                },
                {
                    name: 'Withdrawals',
                    href: '/withdrawal',
                    icon: Withdrawals,
                },
                {
                    name: 'Statement',
                    href: '/statement',
                    icon: Statement,
                },
            ],
            showBorder: true,
        },
        {
            title: 'Tools',
            items: [
                {
                    name: 'Create Payment Req.',
                    href: '/create-payment-request',
                    icon: CreatePaymentRequest,
                },
                {
                    name: 'Crypto Payout',
                    href: '/crypto-payout',
                    icon: CryptoPayout,
                },
                {
                    name: 'Create Fiat',
                    href: '/create-fiat',
                    icon: CreateFiat,
                },
                {
                    name: 'Address Book',
                    href: '/address-book',
                    icon: AddressBook,
                },
                {
                    name: 'Payment Option',
                    href: '/payment-option',
                    icon: PaymentOption,
                },
            ],
            showBorder: true,
        },
        {
            title: 'Developers',
            items: [
                {
                    name: 'Integration Docs',
                    href: '/integration-docs',
                    icon: IntegrationDocs,
                },
                {
                    name: 'API Credentials',
                    href: '/api-credentials',
                    icon: ApiCredentials,
                },
            ],
            showBorder: false,
        },
    ]);

    const isActive = $derived((href: string): boolean => {
        return currentPath === href;
    });

    const getLinkClasses = $derived((href: string): string => {
        const baseClasses =
            'flex items-center space-x-3 rounded-lg px-2 py-1 no-underline hover:bg-gray-100 active:!bg-transparent';
        const activeClasses = 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700';

        return isActive(href) ? `${baseClasses} ${activeClasses}` : baseClasses;
    });

    const getTextClasses = $derived((href: string): string => {
        const baseClasses = 'text-base';

        if (isActive(href)) {
            return `${baseClasses} font-medium text-[#333DFF]`;
        }
        return `${baseClasses} font-normal text-main`;
    });
</script>

<aside class="text-base-content min-h-full w-80 bg-white">
    <div class="mb-0 px-4 py-5">
        <a href="/" class="no-underline">
            <img src="/logo.svg" alt="Company Logo" class="mt-0 w-32" />
        </a>
    </div>

    <nav class="px-4" aria-label="Main navigation">
        {#each menuSections as section (section)}
            <div class="mt-6 first:mt-0">
                {#if section.title}
                    <h3 class="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        {section.title}
                    </h3>
                {/if}

                <ul
                    class="menu menu-sm mt-0 w-full text-gray-200 {section.showBorder
                        ? 'border-b'
                        : ''}"
                >
                    {#each section.items as item (item.href)}
                        <li>
                            <a
                                href={item.href}
                                class={getLinkClasses(item.href)}
                                aria-current={isActive(item.href) ? 'page' : undefined}
                            >
                                <item.icon />
                                <span class={getTextClasses(item.href)}>
                                    {item.name}
                                </span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </nav>
</aside>
