<script lang="ts">
    import type { Card } from "../lib/Card";
    import { baseURL, getVariantBG } from "../lib/Stores";
    import CircularProgress from "@smui/circular-progress/dist/CircularProgress.svelte";

    let imgLoaded = false;
    export let id: number;
    export let card: Card;

    function imgError(ev){
        imgLoaded = true
        ev.target.src = "./assets/pokemon-back.png"
    }

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
</script>

<div class="relative">
    <div class="absolute flex items-center justify-center w-72 h-[357px]">
        {#if !imgLoaded}
            <CircularProgress style="height: 100px; width: 100px;" indeterminate />
        {/if}
    </div>
    <div class="flex justify-center align-middle">
        <img
            class={`w-64 h-[357px] rounded-xl cursor-pointer ${
                card.collection != null && card.count <= 0 ? "opacity-40" : ""
            }`}
            id={`card-img${id}`}
            style="visability: ${imgLoaded ? 'visible' : 'hidden'}"
            src={baseURL + "/cardImg/" + encodeURIComponent(card.cardId)}
            alt={card.name}
            on:click={() => {}}
            on:load={() => {
                imgLoaded = true;
            }}
            on:error={imgError}
        />
        {#if card.variant === "Reverse Holofoil"}
            <div class="w-64 h-[357px] absolute rounded-md">
                <img
                    class="flex items-center justify-center w-64 h-full rounded-md opacity-80"
                    alt="holo-overlay"
                    src={getVariantBG(card)}
                    onClick={() => {}}
                />
            </div>
        {:else if card.variant?.includes("Holofoil")}
            <div class="w-64 h-[357px] absolute rounded-md">
                <div
                    class="flex items-center justify-center w-64 h-full rounded-md opacity-30"
                    style="background: {rainbowHolo}"
                    onClick={() => {}}
                />
            </div>
        {/if}
    </div>
</div>

<!--rev holo-->

<!--holofoil-->
