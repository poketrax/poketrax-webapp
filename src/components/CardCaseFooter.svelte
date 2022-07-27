<script lang="ts">
    import { Tooltip } from "svelte-materialify";
    import type { Card } from "../lib/Card";
    import { baseURL } from "../lib/Stores";
    import "../assets/css/smui-dark.css";
    import "../assets/css/smui.css";
    import Rarity from "../assets/rarity/Rarity.svelte";
    import { beforeUpdate } from "svelte";

    export let card: Card;

    let price = `$-.--`;
    let color = "";

    beforeUpdate(() => {
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
    });
</script>

<div class="h-8 pl-4 pr-4 flex justify-center items-center">
    <div class="flex justify-items-center items-center h-8 w-8">
        <Tooltip top>
            <img
                class="h-6"
                alt={card.expName}
                src={baseURL + "/expSymbol/" + card.expName}
            />
            <span slot="tip">{card.expName}</span>
        </Tooltip>
    </div>
    <div class="grow" />
    <!--price-->
    <span class={color}>{price}</span>
    <div class="grow" />
    <span>{card.expCardNumber}</span>
    <div class="grow" />

    <Tooltip top>
        <div class="flex justify-items-center items-center">
            <Rarity rarity={card.rarity} />
        </div>
        <span slot="tip">{card.rarity}</span>
    </Tooltip>
</div>
