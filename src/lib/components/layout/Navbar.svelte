<script lang="ts">
    interface Props {
        data?: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            gender: string;
            country: string;
            created_at: string;
            updated_at: string;
        } | null;
    }

    const { data }: Props = $props();

    const user = data;

    let accounts = [user ? `${user.first_name} ${user.last_name}` : 'Select Account'];
    let fiatBalances = ['USDT 1,879,654.55', 'USD 1,200,000.00'];
    let cryptoBalances = ['USD 579,654.55', 'USDT 300,000.00'];
    let testBtcBalances = ['USD 12,876.76', 'USD 5,000.00'];
</script>

<div class="flex items-center justify-between bg-white px-4 py-1.5 shadow-sm lg:px-6">
    <div class="flex flex-wrap items-center gap-x-2">
        <div>
            <div class="mb-1 text-sm text-gray-500">Account</div>
            <select class="select select-bordered select-sm w-full min-w-xs">
                {#each accounts as acc (acc)}
                    <option>{acc}</option>
                {/each}
            </select>
        </div>

        <div>
            <div class="mb-1 text-sm text-gray-500">Fiat Payout Balance</div>
            <div class="flex items-center">
                <select class="select select-bordered select-sm w-full min-w-xs">
                    {#each fiatBalances as bal (bal)}
                        <option>{bal}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div>
            <div class="mb-1 text-sm text-gray-500">Crypto Payments/Payouts Balance</div>
            <select class="select select-bordered select-sm w-full min-w-xs">
                {#each cryptoBalances as bal (bal)}
                    <option>{bal}</option>
                {/each}
            </select>
        </div>

        <div>
            <div class="mb-1 text-sm text-gray-500">Available Test BTC Balance</div>
            <select class="select select-bordered select-sm w-full min-w-xs">
                {#each testBtcBalances as bal (bal)}
                    <option>{bal}</option>
                {/each}
            </select>
        </div>
    </div>

    <div class="dropdown dropdown-end pt-2">
        <div
            tabindex="0"
            role="button"
            class="flex cursor-pointer items-center space-x-3 rounded-lg p-2 hover:bg-gray-50"
        >
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                <svg class="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </div>
            <div class="hidden lg:block">
                <div class="text-sm font-medium text-gray-900">
                    {user?.first_name}
                    {user?.last_name}
                </div>
                <div class="text-xs text-gray-500">{user?.email}</div>
            </div>
            <svg
                class="h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                ></path>
            </svg>
        </div>
        <ul class="dropdown-content menu bg-base-200 rounded-box z-[1] mt-1 w-52 p-2 shadow">
            <li class="menu-title">
                <span class="text-sm font-medium">{user?.first_name} {user?.last_name}</span>
                <span class="text-xs text-gray-500">{user?.email}</span>
            </li>
            <div class="divider my-1"></div>
            <li><a href="/profile" class="text-sm">Profile</a></li>
            <li><a href="/settings" class="text-sm">Settings</a></li>
            <li><a href="/logout" class="text-sm">Logout</a></li>
        </ul>
    </div>
</div>
