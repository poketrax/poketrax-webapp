<script lang="ts">
    import Pokeball from "./pokeball.svelte";
    export let type = "";
    export let className = "";
</script>

{#if type === ""}
    <Pokeball className={className}/>
{:else}
    <img class={className} alt={type} src={`./assets/energy/${type}.png`} />
{/if}
