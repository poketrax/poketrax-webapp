<script lang="ts">
    import CardCase from "../components/CardCase.svelte";
    import type { Card } from "../lib/Card";
    import {search} from "../lib/CardDB"

    let cards: Array<Card> = new Array();
    let total = 0
    let pageVal = 0
    let searchTermValue = ""
    
    function setSearchResults(page: number){
        search(0)
            .then((results) => {
                cards = results.cards
                total = results.total
            })
    }
    setSearchResults(total)
</script>

<div class="h-[calc(100vh-11rem)] overflow-hidden">
    <div class="flex h-[calc(100vh-11rem)] overflow-auto">
        <div class="flex-grow" />
        <div
            class="grid h-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"
            id="card-grid"
        >
            {#each cards as card, i}
                <CardCase id={i} {card} />
            {/each}
        </div>
        <div class="flex-grow" />
    </div>
</div>
