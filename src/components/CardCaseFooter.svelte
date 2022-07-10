<script lang="ts">
    import Tooltip, { Wrapper } from "@smui/tooltip";
    import type { Card } from "../lib/Card";
    import { baseURL } from "../lib/CardDB";
    import "../assets/css/smui-dark.css";
    import "../assets/css/smui.css";
    import Rarity from "../assets/rarity/Rarity.svelte";

    export let card: Card;

    let price = `$-.--`;
    let color = "";

    if (card.price != null) {
        price = `$${card.price.toFixed(2).toString()}`;
        if (card.paid != null && card.paid !== 0) {
            if (card.paid <= card.price) {
                price = `⬆︎ ${price}`;
                color = "text-green-600";
            } else {
                price = `⬇︎ ${price}`;
                color = "text-red-600";
            }
        }
    }
</script>

<div class="h-8 pl-4 pr-4 flex justify-center items-center">
    <div class="flex justify-items-center items-center h-8 w-8">
       <Wrapper>
            <img
                class="h-6"
                alt={card.expName}
                src={baseURL + "/expSymbol/" + card.expName}
            />
            <Tooltip>{card.expName}</Tooltip>
        </Wrapper>
    </div>
    <div class="grow" />
    <!--price-->
    <span class={color}>{price}</span>
    <div class="grow" />
    <span>{card.expCardNumber}</span>
    <div class="grow" />

    <Wrapper>
        <div class="flex justify-items-center items-center">
            <Rarity rarity={card.rarity} />
        </div>
        <Tooltip>{card.rarity}</Tooltip>
    </Wrapper>
</div>
