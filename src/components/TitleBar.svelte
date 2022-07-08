<script lang="ts">
    import logo from "../assets/poketrax.png"
    import { page } from "../lib/Stores";

    let gotoCards = () => {page.set("cards")}
    let gotoSets = () => {page.set("sets")}
    let gotoSealedProducts = () => {page.set("sealedProducts")}
    let gotoCollections = () => {page.set("collections")}
</script>

<div class="sticky top-0 w-full h-16 bg-gray-400 flex flex-row">
    <div class="h-16 flex-none flex flex-row">
        <img
            class="h-16 w-16 p-1"
            src={logo}
            alt="logo"
        />
        <span class="font-sans text-3xl pt-3 pl-2">
            PokéTrax
        </span>
        <span class="pl-6 flex ">
            <button
                id="cards-page"
                class="hover:text-blue-700"
                on:click={gotoCards}
            >
                Cards
            </button>
            <div class="w-6"></div>
            <button
                id="sets-page"
                class="hover:text-blue-700"
                on:click={gotoSets}
            >
                Sets
            </button>
            <div class="w-6"></div>
            <button
                id="sealed-page"
                class="hover:text-blue-700"
                on:click={gotoSealedProducts}
            >
                Sealed Products
            </button>
            <div class="w-6"></div>
            <button
                id="collection-page"
                class="hover:text-blue-700"
                on:click={gotoCollections}
            >
                Collections
            </button>
        </span>
    </div>
</div>