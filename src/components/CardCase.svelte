<script lang="ts">
    import CardCaseFooter from "./CardCaseFooter.svelte";
    import type { Card } from "../lib/Card";
    import Energy from "../assets/energy/Energy.svelte";
    import CardCaseImage from "./CardCaseImage.svelte";
    import firstEd from "../assets/modifiers/1st-edition.png";
    import CardCaseCorner from "../components/CardCaseCorner.svelte";
    import { getVariantBG } from "../lib/CardDB";

    export let id: number;
    export let card: Card;
</script>

<div id={`card-case${id}`} class="mdc-elevation--z5 w-72 h-fit rounded-md">
    <!-- Title -->
    <div
        class="h-16 mt-4 mb-2 ml-4 mr-4 rounded-md"
        style="background-image: url({getVariantBG(card)})"
    >
        <div class="w-64 h-16 rounded-md flex items-center">
            <Energy class="ml-2 h-6 w-6" type={card.energyType} />
            <div class="pl-2 text-lg truncate" id="card-case-title">
                <span>{card.name}</span>
            </div>
            <div class="flex-grow" />
            {#if card.variant?.includes("1st Edition")}
                <img class="w-8 m-2" src={firstEd} alt="1st ed" />
            {/if}
            <CardCaseCorner {id} {card} />
        </div>
    </div>
    <CardCaseImage {id} {card} />
    <CardCaseFooter {id} {card} />
</div>

<style lang="scss">
    @use "@material/elevation/mdc-elevation";
</style>
