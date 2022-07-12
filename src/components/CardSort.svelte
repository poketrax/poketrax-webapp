<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { SearchTerms } from '../lib/Stores';

    let terms = new SearchTerms()

    export let searchStore : Writable<SearchTerms>
    searchStore.subscribe((val) => {
        terms = val
    })


</script>

<div class="flex justify-center">
    <div class=" ">Name</div>
    <div>Set #</div>
    <div>Dex #</div>
    <div>$</div>
    <div>📅</div>
</div>