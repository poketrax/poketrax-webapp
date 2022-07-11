<script lang="ts">
    import { cardSearch, cardResults, SearchTerms } from "../lib/Stores";
    import CardPagination from "./../components/CardPagination.svelte";
    import CardCase from "../components/CardCase.svelte";
    import { CardSearchResults } from "../lib/Card";

    let results: CardSearchResults = new CardSearchResults();
    let terms: SearchTerms = new SearchTerms();

    cardSearch.subscribe((val) => {
        terms = val;
    });
    cardResults.subscribe((val) => {
        results = val;
    });

    cardSearch.set(terms);
</script>

<div class="h-[calc(100vh-11rem)] overflow-hidden">
    <div class="flex h-[calc(100vh-8rem)] overflow-auto">
        <div class="flex-grow" />
        <div>
            <CardPagination
                searchStore={cardSearch}
                resultStore={cardResults}
            />
            <div
                class="grid h-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"
                id="card-grid"
            >
                {#each results.cards as card, i}
                    <CardCase id={i} {card} />
                {/each}
            </div>
            <CardPagination
                searchStore={cardSearch}
                resultStore={cardResults}
            />
            <div>HELLO</div>
        </div>
        <div class="flex-grow" />
    </div>
</div>
