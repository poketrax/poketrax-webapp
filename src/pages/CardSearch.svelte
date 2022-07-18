<script lang="ts">
    import CardPagination from "./../components/CardPagination.svelte";
    import CardCase from "../components/CardCase.svelte";
    import { CardSearchResults } from "../lib/Card";
    import CardSort from "../components/CardSort.svelte";
    import CardFilters from "../components/CardFilters.svelte";
    import {
        cardSearchTermStore,
        cardResultStore,
        SearchTerms,
    } from "../lib/Stores";

    let results: CardSearchResults = new CardSearchResults();
    let terms: SearchTerms = new SearchTerms();

    cardSearchTermStore.subscribe((val) => {
        terms = val;
    });
    cardResultStore.subscribe((val) => {
        results = val;
    });

    cardSearchTermStore.set(terms);
</script>

<div class="flex">
    <CardFilters searchStore={cardSearchTermStore} />
    <div class="flex-grow" />
    <CardSort searchStore={cardSearchTermStore} />
</div>

<div class="h-[calc(100vh-11rem)] overflow-hidden">
    <div class="flex h-[calc(100vh-11rem)] overflow-auto">
        <div class="flex-grow" />
        <div>
            <CardPagination
                searchStore={cardSearchTermStore}
                resultStore={cardResultStore}
            />
            <div
                class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"
                id="card-grid"
            >
                {#each results.cards as card, i}
                    <CardCase id={i} {card} />
                {/each}
            </div>
            <CardPagination
                searchStore={cardSearchTermStore}
                resultStore={cardResultStore}
            />
        </div>
        <div class="flex-grow" />
    </div>
</div>
