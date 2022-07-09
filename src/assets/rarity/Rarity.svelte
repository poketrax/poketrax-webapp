<script lang="ts">
    import { Icon } from "@smui/fab";
    import Common from "./Common.svelte";
    import Amazing from "./Amazing.svelte";
    import Promo from "./Promo.svelte";
    import "../css/smui-dark.css";
    import "../css/smui.css";
    export let rarity: string;
</script>

{#if rarity === "Holo Rare"}
    <span>H</span><Icon class="material-icons">star</Icon>
{:else if rarity === "Uncommon"}
    <Common />
{:else if rarity === "Ultra Rare" || rarity === "Rare BREAK" || rarity === "Classic Collection" }
    <Icon class="material-icons">star_half</Icon>
{:else if rarity === "Secret Rare"}
    <Icon class="material-icons">grade</Icon>
{:else if rarity === "Amazing Rare"}
    <Amazing />
{:else if rarity === "Promo"}
    <Promo />
{:else if rarity === "Shiny Holo Rare"}
    <Icon class="material-icons">temp_preferences_custom</Icon>
    <Icon class="material-icons">star</Icon>
{:else}
    <Icon class="material-icons">star</Icon>
{/if}
