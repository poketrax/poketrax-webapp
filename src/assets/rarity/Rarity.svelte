<script lang="ts">
    import { Icon, MaterialApp } from "svelte-materialify";
    import Amazing from "./Amazing.svelte";
    import Promo from "./Promo.svelte";
    import {
        mdiStar,
        mdiStarHalfFull,
        mdiStarOutline,
        mdiShimmer,
        mdiCheckboxBlankCircle,
        mdiRhombus
    } from "@mdi/js";
    export let rarity: string;
</script>

{#if rarity === "Holo Rare"}
    <span>H</span><Icon path={mdiStar}/>
{:else if rarity === "Common"}
    <Icon path={mdiCheckboxBlankCircle} />
{:else if rarity === "Uncommon"}
    <Icon path={mdiRhombus} />
{:else if rarity === "Ultra Rare" || rarity === "Rare BREAK" || rarity === "Classic Collection"}
    <Icon path={mdiStarHalfFull}/>
{:else if rarity === "Secret Rare"}
    <Icon path={mdiStarOutline}/>
{:else if rarity === "Amazing Rare"}
    <Amazing />
{:else if rarity === "Promo"}
    <Promo />
{:else if rarity === "Shiny Holo Rare"}
    <Icon path={mdiShimmer} />
    <Icon path={mdiStar} />
{:else}
    <Icon path={mdiStar}/>
{/if}
