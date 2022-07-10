import { writable } from 'svelte/store';

export const page = writable("cards")
export const cardSearchTerm = writable("cardSearchTerm")
export const cardRarities = writable([])
export const cardSets = writable([])