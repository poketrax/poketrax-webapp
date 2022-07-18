<script lang="ts">
    import Pokeball from "../assets/energy/pokeball.svelte";
    import type { Writable } from "svelte/store";
    import { SearchTerms } from "../lib/Stores";

    let terms = new SearchTerms();

    let name = "";
    let set = "";
    let dex = "";
    let price = "";
    let date = "";

    let priceDirection = ""
    let dateDirection = ""

    let sortClazz =
        "flex justify-center items-center h-13 min-w-[3rem] p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer";

    export let searchStore: Writable<SearchTerms>;
    searchStore.subscribe((val) => {
        terms = val;
    });

    function setSort(option) {
        switch (option) {
            case "name":
                if (terms.sort.includes("name")) {
                    searchStore.update((val) => {
                        val.sort = "";
                        name = "";
                        return val;
                    });
                } else {
                    searchStore.update((val) => {
                        val.sort = "name";
                        name = "bg-gray-200";
                        dateDirection = ""
                        priceDirection = ""
                        set = "";
                        dex = "";
                        price = "";
                        date = "";
                        return val;
                    });
                }
                break;
            case "setNumber":
                if (terms.sort.includes("setNumber")) {
                    searchStore.update((val) => {
                        val.sort = "";
                        set = "";
                        return val;
                    });
                } else {
                    searchStore.update((val) => {
                        val.sort = "setNumber";
                        dateDirection = ""
                        priceDirection = ""
                        name = "";
                        set = "bg-gray-200";
                        dex = "";
                        price = "";
                        date = "";
                        return val;
                    });
                }
                break;
            case "pokedex":
                if (terms.sort.includes("pokedex")) {
                    searchStore.update((val) => {
                        val.sort = "";
                        set = "";
                        return val;
                    });
                } else {
                    searchStore.update((val) => {
                        val.sort = "pokedex";
                        dateDirection = ""
                        priceDirection = ""
                        name = "";
                        set = "";
                        dex = "bg-gray-200";
                        price = "";
                        date = "";
                        return val;
                    });
                }
                break;
            case "price":
                if (terms.sort.includes("priceDSC")) {
                    searchStore.update((val) => {
                        val.sort = "";
                        priceDirection = ""
                        price = "";
                        return val;
                    });
                } else if (terms.sort.includes("priceASC")) {
                    searchStore.update((val) => {
                        val.sort = "priceDSC";
                        priceDirection = "⬇︎"
                        return val;
                    });
                } else {
                    searchStore.update((val) => {
                        val.sort = "priceASC";
                        priceDirection = "⬆︎"
                        dateDirection = ""
                        name = "";
                        set = "";
                        dex = "";
                        price = "bg-gray-200";
                        date = "";
                        return val;
                    });
                }
                break;
            case "date":
                if (terms.sort.includes("dateDSC")) {
                    searchStore.update((val) => {
                        val.sort = "";
                        dateDirection = ""
                        date = "";
                        return val;
                    });
                } else if (terms.sort.includes("dateASC")) {
                    searchStore.update((val) => {
                        val.sort = "dateDSC";
                        dateDirection = "⬇︎"
                        return val;
                    });
                } else {
                    searchStore.update((val) => {
                        val.sort = "dateASC";
                        dateDirection = "⬆︎"
                        priceDirection = ""
                        name = "";
                        set = "";
                        dex = "";
                        price = "";
                        date = "bg-gray-200";
                        return val;
                    });
                }
                break;
        }
    }
</script>

<div class="flex justify-center border-2 rounded-md m-4">
    <div
        class="{sortClazz} {name}"
        on:click={() => {
            setSort("name");
        }}
    >
        Name
    </div>
    <div class="bg-gray-200 w-0.5" />
    <div
        class="{sortClazz} {set}"
        on:click={() => {
            setSort("setNumber");
        }}
    >
        Set #
    </div>
    <div class="bg-gray-200 w-0.5" />
    <div
        class="{sortClazz} {dex}"
        on:click={() => {
            setSort("pokedex");
        }}
    >
        <Pokeball class="h-4 w-4" /> #
    </div>
    <div class="bg-gray-200 w-0.5" />
    <div
        class="{sortClazz} {price}"
        on:click={() => {
            setSort("price");
        }}
    >
        $ {priceDirection}
    </div>
    <div class="bg-gray-200 w-0.5" />
    <div
        class="{sortClazz} {date}"
        on:click={() => {
            setSort("date");
        }}
    >
        📅 {dateDirection}
    </div>
</div>
