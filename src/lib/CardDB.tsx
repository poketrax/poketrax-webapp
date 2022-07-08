
import { CardSearch, Price, Card } from "./Card";
import { Expansion } from "./Meta";
import { Collection } from "./Collection";
import { ProductList, SealedProduct, SealedPrice } from "./SealedProduct";

export const baseURL = "http://localhost:3030/"

export class DbState {
    public ready: boolean = false
    public updated: boolean = false
    public newSoftware: boolean = false
}

/**
 * Search for Cards 
 * @param page page to request
 * @param term search term
 * @param sets set filter
 * @param rarity rarity filter
 * @param sort sort options [name, setNumber, pokedex, priceASC, priceDSC, dateASC, dateASC]
 * @returns 
 */
export function search(page: number, term?: string, sets?: string[], rarity?: string[], sort?: string): Promise<CardSearch> {
    return new Promise<CardSearch>(
        (resolve, reject) => {
            let url = new URL(`${baseURL}/cards/${page ?? 0}`)
            if (sets && sets.length !== 0) {
                url.searchParams.set(`expansions`, encodeURI(JSON.stringify(sets)))
            }
            if (term) {
                url.searchParams.set(`name`, term)
            }
            if (sort) {
                url.searchParams.set('sort', sort)
            }
            if (rarity && rarity.length !== 0) {
                url.searchParams.set(`rarities`, JSON.stringify(rarity))
            }
            fetch(url.toString())
                .then(res => res.json())
                .then(
                    (data) => {
                        resolve(data)
                    },
                    (err) => {
                        reject(err)
                    }
                )
        }
    )
}

/**
 * Search for Sealed Products
 * @param page page to request
 * @param searchTerm search term
 * @param sort sort options [name, priceASC, priceDSC]
 * @returns 
 */
export function searchProducts(page: number, searchTerm?: string, sort?: string): Promise<ProductList> {
    return new Promise(
        (resolve, reject) => {
            let url = new URL(`${baseURL}/sealed/${page}`)
            if (searchTerm) {
                url.searchParams.set('name', searchTerm)
            }
            if (sort) {
                url.searchParams.set('sort', sort)
            }
            fetch(url.toString())
                .then((res) => res.json())
                .then(
                    (data) => {
                        resolve(data)
                    },
                    (err) => {
                        console.log(err)
                        reject(err)
                    }
                )
        }
    )
}

/**
 * Get the current status of the database
 * @returns 
 */
export function getDbState(): Promise<DbState> {
    return new Promise(
        (resolve, reject) => {
            fetch(`${baseURL}/dbstatus`)
                .then(res => res.json())
                .then(
                    (data) => {
                        resolve(data)
                    })
                .catch(
                    (err) => {
                        console.log(err)
                        reject(err)
                    })
        }
    )
}

/**
 * Get list of collection meta data
 * @returns 
 */
export function getCollections(): Promise<Array<Collection>> {
    return new Promise<Array<Collection>>(
        (resolve, reject) => {
            fetch(`${baseURL}/collections`)
                .then((res) => res.json())
                .then(
                    (data) => {
                        resolve(data)
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                        reject(err)
                    }
                )
        }
    )
}

/**
 * Search for cards in a collection
 * @param collection collection name
 * @param page page to request
 * @param searchVal serach value
 * @param rarity rarity filter
 * @param sort sort option [wish, name, setNumber, pokedex, priceASC, priceDSC, dateASC, dateASC]
 * @returns 
 */
export async function getCollectionCards(collection: string, page: number, searchVal?: string, rarity?: string[], sort?: string): Promise<CardSearch> {
    return new Promise<CardSearch>(
        (resolve, reject) => {
            if (collection === '') {
                resolve(new CardSearch())
            }
            let url = new URL(`${baseURL}/collections/${collection}/cards/${page ?? 0}`)
            if (searchVal != null) {
                url.searchParams.set(`name`, searchVal)
            }
            if (sort != null) {
                url.searchParams.set('sort', sort)
            }
            if (rarity != null && rarity.length !== 0) {
                url.searchParams.set(`rarities`, JSON.stringify(rarity))
            }
            fetch(url.toString())
                .then((res) => res.json())
                .then(
                    (data) => {
                        resolve(data)
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                        reject(err)
                    }
                )
        }
    )
}

/**
 * Get Sealed products in a collection
 * @param collection name of collection 
 * @param page page to request
 * @param searchVal seach value 
 * @param sort sort [wish, name, priceASC, priceDSC]
 * @returns 
 */
export async function getCollectionSealed(collection: string, page: number, searchVal?: string, sort?: string): Promise<ProductList> {
    return new Promise<ProductList>(
        (resolve, reject) => {
            if (collection === '') {
                resolve(new ProductList())
            }
            let url = new URL(`${baseURL}/collections/${collection}/sealed/${page ?? 0}`)
            if (searchVal != null) {
                url.searchParams.set(`name`, searchVal)
            }
            if (sort != null) {
                url.searchParams.set('sort', sort)
            }
            fetch(url.toString())
                .then((res) => res.json())
                .then(
                    (data) => {
                        resolve(data)
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                        reject(err)
                    }
                )
        }
    )
}

/**
 * Add new collection. name must be unique
 * @param name 
 * @returns empty string
 */
export function addCollection(name: string): Promise<any> {
    return fetch(`${baseURL}/collections`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name })
        }
    )
}

/**
 * Delete entire collection
 * @param name 
 * @returns empty string
 */
export function deleteCollection(name: string): Promise<any> {
    return fetch(`${baseURL}/collections`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name })
        }
    )
}

/**
 * Delete card from collection. collection field must be set
 * @param card 
 * @returns 
 */
export function deleteCardFromCollection(card: Card): Promise<any> {
    return fetch(`${baseURL}/collections/card`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card)
        }
    )
}

/**
 * Delete sealed product from collection. Collection field must be set
 * @param product 
 * @returns 
 */
export function deleteSealedFromCollection(product: SealedProduct): Promise<any> {
    return fetch(
        `${baseURL}/collections/sealed`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        }
    )
}

/**
 * Add card to collection. collection field must be set
 * @param card 
 * @returns 
 */
export async function addCardToCollection(card: Card) {
    return new Promise<void>(
        (resolve, reject) => {
            if (card.collection != null &&
                card.variant != null &&
                card.count != null) {
                fetch(`${baseURL}/collections/card`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(card)
                    })
                    .then(
                        (_) => {
                            resolve()
                        }
                    ).catch(
                        (err) => {
                            console.log(err)
                            reject(err)
                        }
                    )
            } else {
                reject("missing data")
            }
        }
    )
}

/**
 * Add sealed product to collection. collection field must be set
 * @param product 
 * @returns 
 */
export async function addSealedToCollection(product: SealedProduct) {
    return new Promise<void>(
        (resolve, reject) => {
            if (product.collection != null &&
                product.count != null) {
                fetch(`${baseURL}/collections/sealed`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(product)
                    })
                    .then(
                        (_) => {
                            resolve()
                        }
                    ).catch(
                        (err) => {
                            console.log(err)
                            reject(err)
                        }
                    )
            } else {
                reject("missing data")
            }
        }
    )
}

/**
 * Get card prices
 * @param card 
 * @param start 
 * @param end 
 * @returns 
 */
export function getCardPrices(card: Card, start?: Date, end?: Date): Promise<Price[]> {
    return new Promise<Price[]>(
        (reslove, reject) => {
            let url = new URL(`${baseURL}/cards/price`)
            if (start) {
                url.searchParams.set("start", start.toISOString())
            }
            if (end) {
                url.searchParams.set("end", end.toISOString())
            }
            fetch(url,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(card)
                })
                .then((res) => res.json())
                .then(
                    (data) => {
                        reslove(data)
                    },
                    (err) => {
                        reject(err)
                    }
                )
        }
    )
}

/**
 * Download a csv or json file with pricing data for the card provided
 * @param product 
 * @param start 
 * @param end 
 * @param type 'json' or 'csv'

export async function downloadCardPrices(card: Card, start: Date, end: Date, type: string) {
    //Get results
    let results = await axios.post(`${baseURL}/cards/price?start=${encodeURI(start.toISOString())}&end=${encodeURI(end.toISOString())}&type=${type}`, card)
    let data = ""
    if (type === 'json') {
        data = JSON.stringify(results.data)
    } else {
        data = results.data
    }
    //attach to local storage
    const blob = new Blob([data], { type: `application/${type}` });
    const url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.download = `${card.name}-prices.${type}`;
    link.href = url;
    //create link and start download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove()
} */

/**
 * Get product prices
 * @param product 
 * @param start 
 * @param end 
 * @returns 
 */
export function getProductPrices(product: SealedProduct, start: Date, end: Date): Promise<SealedPrice[]> {
    return new Promise<SealedPrice[]>(
        (reslove, reject) => {
            let url = new URL(`${baseURL}/sealed/price`)
            if (start) {
                url.searchParams.set("start", start.toISOString())
                url.searchParams.set("end", end.toISOString())
            }
            fetch(url,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(product)
                })
                .then((res) => res.json())
                .then(
                    (data) => {
                        reslove(data)
                    },
                    (err) => {
                        reject(err)
                    }
                )
        }
    )
}

/**
 * Download a csv or json file with pricing data for the product provided
 * @param product 
 * @param start 
 * @param end 
 * @param type 'json' or 'csv'

export async function downloadProductPrices(product: SealedProduct, start: Date, end: Date, type: string) {
    let results = await axios.post(`${baseURL}/sealed/price?start=${encodeURI(start.toISOString())}&end=${encodeURI(end.toISOString())}`, product)
    const blob = new Blob([results.data], { type: `application/${type}` });
    const url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.download = `${product.name}-prices.${type}`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove()
} */

/**
 * Get set expantions
 * @returns 
 */
export function expansions(): Promise<Expansion[]> {
    return new Promise<Expansion[]>(
        (resolve, reject) => {
            fetch(`${baseURL}/expansions`)
                .then(res => res.json())
                .then(
                    (data) => {
                        resolve(data)
                    },
                    (err) => {
                        reject(err)
                    }
                )
        }
    )
}

export class Grade {
    public grader: string
    public grade: string
    public modifier?: string

    constructor(grader: string, grade: string, modifier?: string) {
        this.grade = grade
        this.grader = grader
        this.modifier = modifier
    }
}

const gradeRegEx = [
    /(PSA)-(1\.5|10|[1-9])-?(OC|MK|MC|ST|PD|OF)?/g,
    /(CGC)-(10|[1-9]\.?5?)-?(P|E)?/g,
    /(BGS)-(10|[1-9]\.?5?)-?(P)?/g,
    /(ACE)-(10|[1-9])/g,
    /(AGS)-(10|[1-9])/g
]
/**
 * returns parsed grade or null if invalid
 * @param grade 
 * @returns 
 */
export function parseGrade(grade: string): Grade | null {
    let normalGrade = grade.toUpperCase().trim()
    let parsedGrade;
    for (let regex of gradeRegEx) {
        regex.lastIndex = 0
        let parts = regex.exec(normalGrade)
        if (parts != null) {
            parsedGrade = new Grade(parts[1], parts[2], parts[3])
        }
    }
    return parsedGrade
}

export async function rarities(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fetch(`${baseURL}/card/rarities`)
            .then((res) => res.json())
            .then(
                (data) => {
                    resolve(data)
                },
                (err) => {
                    reject(err)
                }
            )

    })
}

function downloadURI(uri: string, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove()
}

export function downloadCollection(collection: string, type: string) {
    fetch(`${baseURL}/collections/download/${collection}/${type}`)
        .then((res) => res.json())
        .then(
            (json) => {
                let data = json
                if (type === 'JSON') {
                    data = JSON.stringify(json, null, 1)
                }
                let extention = type.toLowerCase()
                extention = extention.split("-")[0]
                const blob = new Blob([data], { type: `application/${extention}` });
                const url = URL.createObjectURL(blob);
                downloadURI(url, `${collection}.${extention}`)
            }
        )
}

export async function renameCollection(collection: string, newName: string, update: (percent: number, done: boolean) => void) {
    let total = 0
    let processed = 0
    let pages = 0
    let i = 0

    addCollection(newName)
    do {
        try {
            let results = await getCollectionCards(collection, i)
            if (total === 0) {
                pages = Math.ceil(results.total / 25)
                total = results.total
            }
            for (let card of results.cards) {
                card.collection = newName
                addCardToCollection(card)
                processed++
            }
        }
        catch (err) {
            console.log(err)
        }
        i++
        update(processed / total, false)
    } while (i < pages)
    deleteCollection(collection)
    update(1, true)
}

export function openLink(type: string, product: Card | SealedProduct) {
    let card = product as Card
    if (card.cardId != null) {
        fetch(`${baseURL}/openlink`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: type, card: product })
            })
    } else {
        fetch(`${baseURL}/openlink`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: type, product: product })
            }
        )
    }

}

export function getCollectionValue(collection: string) {
    return fetch(`${baseURL}/collections/${collection}/value`)
}
/*
export function getRarity(rarity: string) {
    switch (rarity) {
        case "Rare":
            return (<IoStarSharp></IoStarSharp>)
        case "Holo Rare":
            return (<div className='flex justify-items-center items-center'><div>H</div><IoStarSharp></IoStarSharp></div>)
        case "Uncommon":
            return (<BsDiamondFill></BsDiamondFill>)
        case "Ultra Rare":
            return (<IoStarHalfSharp></IoStarHalfSharp>)
        case "Secret Rare":
            return (<div className='flex justify-items-center items-center'><div>S</div><IoStarOutline></IoStarOutline></div>)
        case "Amazing Rare":
            return (<img className='w-5 h-5' alt="" src={`./assests/amazing.svg`}></img>)
        case "Shiny Holo Rare":
            return (<div className='flex justify-items-center items-center'><BsStars></BsStars><IoStarSharp></IoStarSharp></div>)
        case "Prism Rare":
            return (<IoStarSharp></IoStarSharp>)
        case "Rare BREAK":
            return (<IoStarHalfSharp></IoStarHalfSharp>)
        case "Classic Collection":
            return (<IoStarHalfSharp></IoStarHalfSharp>)
        case "Rare Ace":
            return (<IoStarSharp></IoStarSharp>)
        case "Promo":
            return (<img className='w-5 h-5' alt="" src={`${baseURL}/expSymbol/Sword%20&%20Shield%20Promos`}></img>)
        case "Radiant Rare":
            return (<IoStarSharp></IoStarSharp>)
        default:
            return (<BsFillCircleFill></BsFillCircleFill>)
    }
}*/
/*
export function getEnergy(energyType: string) {
    let _class = 'w-5 h-5 ml-2'
    switch (energyType) {
        case "Fire":
            return <img className={_class} alt="" src={`./assests/fire.png`}/>
        case "Water":
            return (<img className={_class} alt="" src={`./assests/water.png`}></img>)
        case "Grass":
            return (<img className={_class} alt="" src={`./assests/grass.png`}></img>)
        case "Fighting":
            return (<img className={_class} alt="" src={`./assests/fighting.png`}></img>)
        case "Psychic":
            return (<img className={_class} alt="" src={`./assests/Psychic.png`}></img>)
        case "Lightning":
            return (<img className={_class} alt="" src={`./assests/electric.png`}></img>)
        case "Colorless":
            return (<img className={_class} alt="" src={`./assests/colorless.png`}></img>)
        case "Darkness":
            return (<img className={_class} alt="" src={`./assests/dark.png`}></img>)
        case "Metal":
            return (<img className={_class} alt="" src={`./assests/steel.png`}></img>)
        case "Dragon":
            return (<img className={_class} alt="" src={`./assests/dragon.png`}></img>)
        case "Fairy":
            return (<img className={_class} alt="" src={`./assests/fairy.png`}></img>)
        default:
            return (<CgPokemon className={_class}></CgPokemon>)
    }
}*/
