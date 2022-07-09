<script lang="ts">
    import type { Card } from "../lib/Card";
    import Fab, { Icon } from "@smui/fab";
    import "../assets/css/smui-dark.css"
    import "../assets/css/smui.css"

    export let id: number;
    export let card: Card;
</script>

<div class="min-w-10 m-2">
    <Fab id={`add-card-button${id}`} aria-label="add" class="w-10 h-10">
        <Icon class="material-icons">add</Icon>
    </Fab>
</div>
