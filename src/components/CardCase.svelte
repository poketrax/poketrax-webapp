<script lang="ts">
    import type { Card } from "../lib/Card";
    import Energy from "../assets/energy/Energy.svelte";
    import firstEd from "../assets/modifiers/1st-edition.png";
    import CardCaseCorner from "../components/CardCaseCorner.svelte"
    import { baseURL } from "../lib/CardDB";

    const rainbowHolo = `linear-gradient(
                            90deg,
                            rgba(255, 0, 0, 1) 0%,
                            rgba(255, 154, 0, 1) 10%,
                            rgba(208, 222, 33, 1) 20%,
                            rgba(79, 220, 74, 1) 30%,
                            rgba(63, 218, 216, 1) 40%,
                            rgba(47, 201, 226, 1) 50%,
                            rgba(28, 127, 238, 1) 60%,
                            rgba(95, 21, 242, 1) 70%,
                            rgba(186, 12, 248, 1) 80%,
                            rgba(251, 7, 217, 1) 90%,
                            rgba(255, 0, 0, 1) 100%`;
    export let id: number;
    export let card: Card;

    function getVariantBG() {
        switch (card.energyType) {
            case 'Grass':
                return `assets/revholo/grass-rev.png`
            case 'Fire':
                return `assets/revholo/fire-rev.png`
            case 'Water':
                return `assets/revholo/water-rev.png`
            case 'Psychic':
                return `assets/revholo/psychic-rev.png`
            case 'Lightning':
                return `assets/revholo/lightning-rev.png`
            case 'Fighting':
                return `assets/revholo/fighting-rev.png`
            case 'Colorless':
                return `assets/revholo/colorless-rev.png`
            case 'Darkness':
                return `assets/revholo/dark-rev.png`
            case 'Metal':
                return `assets/revholo/steel-rev.png`
            case 'Fairy':
                return `assets/revholo/fairy-rev.png`
            case 'Dragon':
                return `assets/revholo/dragon-rev.png`
            default:
                return `assets/revholo/trainer-rev.png`
        }
    }
</script>

<div id={`card-case${id}`} class="mdc-elevation--z5 w-72 h-fit rounded-md">
    <!-- Title -->
    <div class="relative h-16 mt-4 mb-2 ml-4 mr-4 rounded-md" 
    style="background-image: url({getVariantBG()})">
        <div class="absolute w-64 h-16 rounded-md flex items-center" >
            <Energy 
                class="ml-2 h-6 w-6" 
                type={card.energyType} />
            <div 
                class="pl-2 text-lg truncate" 
                id="card-case-title" 
                >
                <span>{card.name}</span>
            </div>
            <div class="flex-grow" />
            {#if card.variant?.includes("1st Edition")}
                <img
                    class="w-8 m-2"
                    src={firstEd}
                    alt="1st ed"
                />
            {/if}
            <CardCaseCorner id={id} card={card}/>
        </div>
    </div>
    <!-- Card Img -->

</div>

<style lang="scss">
    @use "@material/elevation/mdc-elevation";

</style>
 