<script lang="ts">
    import Pokeball from "./pokeball.svelte";
    export let type = "";
    let clazz;
	export { clazz as class };
</script>

{#if type === "" || type === "trainer"}
    <Pokeball class={clazz}/>
{:else}
    <img class={clazz} alt={type} src={`./assets/energy/${type}.png`} />
{/if}
