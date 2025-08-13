<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';

    interface Props {
        data: T[] | undefined;
        header: Snippet;
        row: Snippet<[T]>;
        id?: string;
        class?: string;
        enablePagination?: boolean;
    }

    const { data, header, row, id, class: classname, enablePagination = false }: Props = $props();

    const currentPage = $derived(Number(page.url.searchParams.get('page')) || 1);
    const hasData = $derived(data && data.length > 0);

    const navigateToPage = (pageNum: number) => {
        const url = new URL(page.url);
        url.searchParams.set('page', pageNum.toString());
        goto(url.toString());
    };

    const getDynamicPages = (current: number): number[] => {
        const pages: number[] = [];
        for (let i = current - 2; i <= current + 2; i++) {
            if (i > 0) pages.push(i);
        }
        return pages;
    };

    const pageNumbers = $derived(getDynamicPages(currentPage));

    const canGoNext = $derived(hasData);

    const canGoPrev = $derived(currentPage > 1);

    const isPageDisabled = (pageNum: number) => {
        if (!hasData && pageNum > currentPage) {
            return true;
        }
        return false;
    };
</script>

<div class="overflow-x-auto">
    <table class="mb-2 table {classname}" {id}>
        <thead class="not-prose text-main">
            <tr>{@render header()}</tr>
        </thead>
        <tbody class="not-prose">
            {#if !hasData}
                <tr>
                    <td colspan="100" class="w-full p-4 pb-0 text-center">No data available</td>
                </tr>
            {:else}
                {#each data as T[] as d (d)}
                    <tr class="hover:bg-base-300 table-row cursor-pointer border-b">
                        {@render row(d)}
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>

    {#if enablePagination}
        <nav class="mt-0 flex items-center justify-end" aria-label="Pagination">
            <div class="flex items-center space-x-1">
                <button
                    class="text-main rounded-sm rounded-l-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium transition hover:bg-gray-50
                {canGoPrev ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}"
                    onclick={() => navigateToPage(currentPage - 1)}
                    disabled={!canGoPrev}
                >
                    Prev
                </button>

                {#each pageNumbers as pageNum (pageNum)}
                    {@const isDisabled = isPageDisabled(pageNum)}
                    <button
                        class={`rounded-sm border px-3 py-1 text-sm font-medium transition 
                    ${
                        pageNum === currentPage
                            ? 'border-main bg-main text-white'
                            : 'text-primary-text border-gray-300 bg-white hover:bg-gray-50'
                    } 
                    ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        disabled={isDisabled}
                        onclick={() => navigateToPage(pageNum)}
                    >
                        {pageNum}
                    </button>
                {/each}

                <button
                    class="text-primary-text rounded-sm rounded-r-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium transition hover:bg-gray-50
                {canGoNext ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}"
                    onclick={() => navigateToPage(currentPage + 1)}
                    disabled={!canGoNext}
                >
                    Next
                </button>
            </div>
        </nav>
    {/if}
</div>
