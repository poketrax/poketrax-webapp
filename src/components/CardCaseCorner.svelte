<script lang="ts">
    import type { Card } from "../lib/Card";
    import Fab, { Icon } from "@smui/fab";
    import { parseGrade, Grade } from "../lib/CardDB";
    import "../assets/css/smui-dark.css";
    import "../assets/css/smui.css";

    export let id: number;
    export let card: Card;

    let grade: Grade;
    let gradeClass: string;

    if (card.grade != null && card.grade !== "") {
        grade = parseGrade(card.grade);
        gradeClass =
            "w-14 border-2 bg-white rounded-md border-gray-600 m-2 flex flex-col items-center";
        if (grade?.grader === "BGS") {
            if (grade?.grade === "8.5" || grade?.grade === "9") {
                gradeClass =
                    "w-14 border-2 rounded-md border-gray-600 opacity-100 m-2 bg-slate-300 flex flex-col items-center";
            } else if (grade?.grade === "9.5" || grade?.grade === "10") {
                gradeClass =
                    "w-14 border-2 rounded-md border-gray-600 opacity-100 bg-yellow-600 m-2 flex flex-col items-center";
            }
        }
        if (grade?.modifier === "P") {
            if (grade?.grader === "CGC") {
                gradeClass =
                    "w-14 border-2 rounded-md bg-white border-yellow-500 m-2 text-yellow-600 flex flex-col items-center";
            } else {
                gradeClass =
                    "w-14 border-2 bg-black opacity-100 rounded-md border-gray-600 bg m-2 text-yellow-600 flex flex-col items-center";
            }
        }
    }
</script>

{#if grade}
    <div class={gradeClass}>
        <div class="text-2xl">{grade?.grade}</div>
        <div class="text-xs">{grade?.grader}</div>
    </div>
{:else}
    <div class="min-w-10 m-2">
        <Fab id={`add-card-button${id}`} aria-label="add" mini>
            <Icon class="material-icons">add</Icon>
        </Fab>
    </div>
{/if}
