import { writable } from 'svelte/store';
import { Card, CardSearchResults } from './Card';

export const baseURL = "http://localhost:3030"

export class DbState {
    public ready: boolean = false
    public updated: boolean = false
    public newSoftware: boolean = false
}

export class SearchTerms {
    public page: number = 0
    public keyword: string = ""
    public selectedSets: Array<string> = []
    public selectedRarities: Array<string> = []
    public sort: string = ""
}

// Main Page
export const page = writable("cards")

// Card Search
export const cardSearchTermStore = writable(new SearchTerms())
export const cardResultStore = writable(new CardSearchResults())


cardSearchTermStore.subscribe(
    (terms: SearchTerms) => {
        let url = new URL(`${baseURL}/cards/${terms.page ?? 0}`)
        if (terms.selectedSets && terms.selectedSets.length !== 0) {
            url.searchParams.set(`expansions`, encodeURI(JSON.stringify(terms.selectedSets)))
        }
        if (terms.keyword) {
            url.searchParams.set(`name`, terms.keyword)
        }
        if (terms.sort) {
            url.searchParams.set('sort', terms.sort)
        }
        if (terms.selectedRarities && terms.selectedRarities.length !== 0) {
            url.searchParams.set(`rarities`, JSON.stringify(terms.selectedRarities))
        }
        fetch(url.toString())
            .then(res => res.json())
            .then(
                (data) => {
                    cardResultStore.set(data)
                },
                (err) => {
                    console.log(err)
                }
            )
    }
)

export function getVariantBG(card: Card) {
    switch (card.energyType) {
        case 'Grass':
            return `assets/revholo/grass-rev.png`
        case 'Fire':
            return `assets/revholo/fire-rev.png`
        case 'Water':
            return `assets/revholo/water-rev.png`
        case 'Psychic':
            return `assets/revholo/psychic-rev.png`
        case 'Lightning':
            return `assets/revholo/lightning-rev.png`
        case 'Fighting':
            return `assets/revholo/fighting-rev.png`
        case 'Colorless':
            return `assets/revholo/colorless-rev.png`
        case 'Darkness':
            return `assets/revholo/dark-rev.png`
        case 'Metal':
            return `assets/revholo/steel-rev.png`
        case 'Fairy':
            return `assets/revholo/fairy-rev.png`
        case 'Dragon':
            return `assets/revholo/dragon-rev.png`
        default:
            return `assets/revholo/trainer-rev.png`
    }
}