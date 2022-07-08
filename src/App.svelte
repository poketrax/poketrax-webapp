<script lang="ts">
  import TitleBar from "./components/TitleBar.svelte";
  import { page } from "./lib/Stores";
  import CardSearch from "./pages/CardSearch.svelte";
  import Collections from "./pages/Collections.svelte";
  import SealedProductSearch from "./pages/SealedProductSearch.svelte";
  import Sets from "./pages/Sets.svelte";

  let pageVal: string;
  page.subscribe((value) => (pageVal = value));
</script>

<TitleBar />

{#if pageVal === "cards"}
  <CardSearch />
{/if}

{#if pageVal === "sets"}
  <Sets />
{/if}

{#if pageVal === "sealedProducts"}
  <SealedProductSearch />
{/if}

{#if pageVal === "collections"}
  <Collections />
{/if}

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
