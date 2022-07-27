<script lang="ts">
    import type { Writable } from "svelte/store";
    import type { SearchTerms } from "../lib/Stores";
    import { Button, Icon } from "svelte-materialify";
    import {
        mdiPageFirst,
        mdiChevronLeft,
        mdiChevronRight,
        mdiPageLast,
    } from "@mdi/js";
    import type { CardSearchResults } from "../lib/Card";

    let total = 0;
    let rowsPerPage = 25;
    let currentPage = 0;
    let start = 0;
    let end = 0;
    let lastPage = 0;

    export let searchStore: Writable<SearchTerms>;
    export let resultStore: Writable<CardSearchResults>;

    searchStore.subscribe((val) => {
        console.log(JSON.stringify(val));
        currentPage = val.page;
        start = currentPage * rowsPerPage;
        if (lastPage !== 0 && currentPage > lastPage) {
            currentPage = lastPage;
        }
    });
    resultStore.subscribe((val) => {
        total = val.total;
        end = Math.min(start + rowsPerPage, total);
        lastPage = Math.max(Math.ceil(total / rowsPerPage) - 1, 0);
        if (lastPage !== 0 && currentPage > lastPage) {
            currentPage = lastPage;
        }
    });
</script>

<div class="flex items-center">
    <div class="flex-grow" />
    <div class="pl-2">
        {start + 1}-{end} of {total}
    </div>
    <Button
        aria-label="First Page"
        on:click={() => {
            searchStore.update((terms) => {
                terms.page = 0;
                return terms;
            });
        }}
        disabled={currentPage === 0}
    >
        <Icon path={mdiPageFirst} />
    </Button>
    <Button
        aria-label="Previous Page"
        on:click={() => {
            searchStore.update((terms) => {
                terms.page = --currentPage;
                return terms;
            });
        }}
        disabled={currentPage === 0}
    >
        <Icon path={mdiChevronLeft} />
    </Button>
    <Button
        aria-label="Next page"
        on:click={() => {
            searchStore.update((terms) => {
                terms.page = ++currentPage;
                return terms;
            });
        }}
        disabled={currentPage === lastPage}
    >
        <Icon path={mdiChevronRight} />
    </Button>
    <Button
        aira-label="Last page"
        on:click={() => {
            searchStore.update((terms) => {
                terms.page = lastPage;
                return terms;
            });
        }}
        disabled={currentPage === lastPage}
    >
        <Icon path={mdiPageLast} />
    </Button>
</div>
