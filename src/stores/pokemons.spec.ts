import { describe, it, test, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePokemonStore } from './pokemon'

describe('Data Store Test', () => {
    let store: any = null

    beforeEach(() => {
        
        // create a fresh Pinia instance and make it active so it's automatically picked
        setActivePinia(createPinia())

        // create an instance of the data store
        store = usePokemonStore()

    })

    test('Test intial values ', () => {
        expect(store.count).toEqual(0)
        expect(store.pageSize).toEqual(25)
        expect(store.order).toEqual('baseExperience');
    })

    test('Test fetch', async ()=>{
        await store.fetchPokemons();
        expect(store.data).toHaveLength(150)
    })

    test('Test filterData', async ()=>{
        await store.fetchPokemons();
        expect(store.pokemons).toHaveLength(27)
        expect(store.getPages).toEqual(6)
    })

    test('Test order', ()=>{
        store.order = 'ASC';
        expect(store.order).toEqual('ASC')
    })

    test('Test Search'), async ()=>{
        store.query="art"
        await store.fetchPokemons();
        expect(store.pokemons).toHaveLength(1)
    }

})