<script lang="ts">
    import CardCase from "../components/CardCase.svelte";
    import type { Card } from "../lib/Card";
    let temp: Card = {
        cardId: "Pokemon-GO-Charizard-010",
        variant: "Normal",
        paid: 0,
        count: 0,
        grade: "",
        idTCGP: 274439,
        name: "Charizard",
        expIdTCGP: "Pokemon GO",
        expName: "Pokemon Go",
        expCardNumber: "010",
        expCodeTCGP: "PGO",
        rarity: "Holo Rare",
        price: 1.5526923076923078,
        releaseDate: "2022-07-01T00:00:00Z",
        energyType: "Fire",
        cardType: "Pokemon",
        pokedex: 6,
        variants: '["Reverse Holofoil","Holofoil"]',
    };
    let temp2: Card = {
        cardId: "SWSH09-Brilliant-Stars-Charizard-V-(Full-Art)-153",
        collection: "Buy List",
        variant: "Holofoil",
        paid: 0,
        count: 1,
        grade: "",
        idTCGP: 263872,
        name: "Charizard V (Full Art)",
        expIdTCGP: "SWSH09 Brilliant Stars",
        expName: "Brilliant Stars",
        expCardNumber: "153",
        expCodeTCGP: "SWSH09",
        rarity: "Ultra Rare",
        price: 35.67,
        releaseDate: "2022-02-25T00:00:00Z",
        energyType: "Fire",
        cardType: "Pokemon",
        pokedex: 6,
        variants: '["Holofoil"]',
    };
</script>

<div class="h-[calc(100vh-11rem)] overflow-auto">
    <div class="flex">
        <div class="flex-grow" />
        <div
            class="grid h-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"
            id="card-grid"
        >
            <CardCase id={1} card={temp} />
            <CardCase id={1} card={temp2} />
        </div>
        <div class="flex-grow" />
    </div>
</div>
