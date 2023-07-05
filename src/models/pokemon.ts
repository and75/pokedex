
interface Ref {
    name : string
    url : string
}
interface Abilities{
    ability : Ref,
    is_hidden: boolean,
    slot: number
}
interface GameIndices{
    game_index: number
    version: Ref
}
interface Sprites {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
    other: {
        dream_world : {
            front_default: string
            front_female: null | string
        }
    }
}
interface Types {
    slot : number
    type  : Ref
}
export interface PokemonInterface {
    abilities : Abilities[]
    base_experience : number
    game_indices:GameIndices[] | null
    height:null | null
    id:number 
    is_default:boolean | null
    name: string
    order:number
    species: Ref
    sprites: Sprites,
    types : Types[]
    weight : number | null
}

export class Pokemon implements PokemonInterface {
    
    abilities : Abilities[]
    base_experience : number
    game_indices:GameIndices[] | null
    height:null | null
    id:number 
    is_default:boolean | null
    name: string
    order:number
    species: Ref
    sprites: Sprites
    types : Types[]
    weight : number | null

    constructor(data: PokemonInterface) {
        this.abilities = data.abilities;
        this.base_experience = data.base_experience;
        this.game_indices = data?.game_indices;
        this.height = data?.height;
        this.id = data?.id;
        this.is_default = data?.is_default;
        this.name = data?.name;
        this.order = data?.order;
        this.species = data?.species;
        this.sprites = data?.sprites;
        this.types = data?.types;
        this.weight = data?.weight
    }

}

