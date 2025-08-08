<script lang="ts">
</script>

<div class="navbar justify-between bg-white px-4 shadow-sm lg:px-6">
    <div class="navbar-start lg:hidden">
        <label for="drawer-toggle" class="btn btn-square btn-ghost lg:hidden">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                ></path>
            </svg>
        </label>
    </div>

    <div class="navbar-center flex justify-center lg:justify-start">
        <div class="flex items-center space-x-6">
            <div class="dropdown dropdown-bottom">
                <div tabindex="0" role="button" class="btn btn-ghost btn-sm normal-case">
                    <span class="text-gray-700">Din Islam</span>
                    <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </div>
                <ul
                    class="dropdown-content menu bg-base-100 rounded-box z-[1] mt-1 w-52 p-2 shadow"
                >
                    <li>No content for now</li>
                </ul>
            </div>

            <div class="hidden items-center space-x-6 md:flex">
                <div class="text-sm">
                    <div class="text-xs text-gray-500">Crypto payment</div>
                    <div class="font-semibold text-gray-900">USD 50.50</div>
                </div>
                <div class="text-sm">
                    <div class="text-xs text-gray-500">Test balance available</div>
                    <div class="font-semibold text-gray-900">USD 0.00</div>
                </div>
            </div>
        </div>
    </div>

    <div class="navbar-end">
        <div class="dropdown dropdown-end">
            <div
                tabindex="0"
                role="button"
                class="btn flex items-center space-x-2 px-2 py-2 normal-case"
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
                <div class="hidden text-left lg:block">
                    <div class="text-sm font-medium text-gray-900">Din Islam</div>
                    <div class="text-xs text-gray-500">din@itopup.com</div>
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
                    <span class="text-sm font-medium">Din Islam</span>
                    <span class="text-xs text-gray-500">din@example.com</span>
                </li>
                <div class="divider my-1"></div>
                <li><a href="/profile" class="text-sm">Profile</a></li>
                <li><a href="/settings" class="text-sm">Settings</a></li>
                <li><a href="/logout" class="text-sm">Logout</a></li>
            </ul>
        </div>
    </div>
</div>
