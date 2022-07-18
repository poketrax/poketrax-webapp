<script lang="ts">
    import Icon from "@smui/textfield/icon";
    import type { Writable } from "svelte/store";
    import type { SearchTerms } from "../lib/Stores";
    import Textfield from "@smui/textfield";

    export let searchStore: Writable<SearchTerms>;

    let keyword = "";

    function keywordSearch() {
        searchStore.update((val) => {
            val.keyword = keyword;
            return val;
        });
    }
</script>

<div class="p-4">
    <Textfield
        variant="outlined"
        bind:value={keyword}
        on:change={keywordSearch}
        label="Keyword"
    />
</div>
