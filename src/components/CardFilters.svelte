<script lang="ts">
    import { setStore } from "../lib/Stores";
    import Svelecte from "svelecte/src/Svelecte.svelte";
    import Icon from "@smui/textfield/icon";
    import type { Writable } from "svelte/store";
    import type { SearchTerms } from "../lib/Stores";
    import Textfield from "@smui/textfield";
    import type { Expansion } from "src/lib/Meta";

    export let searchStore: Writable<SearchTerms>;

    let keyword = "";
    let labelAsValue = false;
    let selectedSets: Array<Expansion> = [];
    let setOptions: Array<Expansion> = [];
    let options: string[] = setOptions.map((opt) => opt.name);

    setStore.subscribe((data) => {
        setOptions = data;
        console.log(JSON.stringify(setOptions));
        options = setOptions.map((opt) => opt.name);
    });

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
<div class="p-4">

</div>

