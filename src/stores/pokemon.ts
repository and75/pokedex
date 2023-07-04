import { defineStore, type SubscriptionCallbackMutationPatchFunction } from 'pinia';

import { type Payload } from '@/interface/payload';
import { type PokemonInterface } from '@/interface/pokemon';
import { Pokemon } from '@/interface/pokemon';

import axios from 'axios'
interface Filters {
  types: Set<string>
  species: Set<number>
}
interface State {
  count: number
  pokemons: PokemonInterface[]
  data: PokemonInterface[]
  filteredPokemons: PokemonInterface[]
  filters: Filters
  selectedFilters: Filters
  query: string
  page: number
  pageSize: number
  order: string | null
  loading: boolean
  error: any | null
  detail : PokemonInterface | null
}

export const usePokemonStore = defineStore('authUser', {
  // convert to a function
  state: (): State => ({
    count: 0,
    pokemons: [],
    data: [],
    filteredPokemons: [],
    filters: { types: new Set(), species: new Set() },
    selectedFilters: { types: new Set(), species: new Set() },
    query: "",
    page: 1,
    pageSize: 27,
    order: 'baseExperience',
    loading: true,
    error: null,
    detail : null
  }),
  getters: {
    getPages: (state) => {
      return Math.round(state.count / state.pageSize)
    },
    getFilters: (state) => {
      let bx: number[] = [];
      let tp: string[] = [];
      state.data.forEach((item, index) => {
        item.types.map(i => i.type).map(i => { tp.push(i.name) });
        bx.push(item.base_experience);
      })

      //order filter value
      tp.sort();
      bx.sort((a, b) => b - a);

      //Remove double and set on state filter
      state.filters.types = new Set(tp);
      state.filters.species = new Set(bx);
      return state.filters;
    }
  },
  actions: {
    /**
     * Fetch global value
     */
    async fetchPokemons() {
      //Open loading
      this.loading = true
      try {
        //get pokemon basic list
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');

        //get pokemon and merge on list
        this.data = await Promise.all(
          response.data.results.map(async (el: any, index: number) => {
            let det = await axios.get(el.url);
            return { ...el, ...det.data }
          })
        )
        this.filterData();

      } catch (error: any) {
        // Set Error
        this.error = error
      } finally {
        // Close loading
        this.loading = false
      }
    },
    async fetchDetail(id: any) {
     
      //Open loading
      this.loading = true
      let finded:PokemonInterface;

      try {

        //get pokemon basic list
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id);
        //get pokemon and merge on list
        this.detail = response.data; 

      } catch (error: any) {
        // Set Error
        this.error = error
      } finally {
        // Close loading
        this.loading = false
        
      }
    },
    /**
     * Set the filters from existing data
     * @param filter 
     * @param value 
     */
    setSelectedFilter(filter: string, value: any) {
      if (filter == 'type') {
        if (this.selectedFilters?.types.has(value)) {
          this.selectedFilters?.types.delete(value)
        } else {
          this.selectedFilters?.types.add(value);
        }
      }
      if (filter == 'species') {
        if (this.selectedFilters?.species.has(value)) {
          this.selectedFilters?.species.delete(value)
        } else {
          this.selectedFilters?.species.add(value);
        }
      }
      this.filterData();
    },
    /**
     * Function to display result
     */
    filterData(): void {

      let filtered: PokemonInterface[] = this.data;

      this.page = 1;

      if (this.query?.length > 0) {
        const regex = new RegExp('^' + this.query + '');
        const finded: PokemonInterface[] = this.data.filter(item => regex.test(item.name))
        if (finded && finded.length > 0) {
          filtered = finded;
        }
      }

      //Filter BaseEx data
      if (this.selectedFilters.species.size > 0) {
        this.order = 'baseExperience';
        filtered = filtered.filter((item: PokemonInterface) => {
          //Apply filter by BaseEx
          return this.selectedFilters.species.has(item.base_experience)
        })
      }

      //Filter data
      if (this.selectedFilters.types.size > 0) {
        this.order = 'baseExperience';
        filtered = filtered.filter((item: PokemonInterface) => {
          //Apply filter by type
          return item.types.map((iz: any) => { return iz.type }).some((fz: any) => this.selectedFilters.types.has(fz.name));
        })
      }


      //Sort filterd
      filtered.sort(
        (a: PokemonInterface, b: PokemonInterface) => {
          if (this.order != "baseExperience") {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase

            if (nameA < nameB) {
              if (this.order == 'ASC') { return - 1 };
              if (this.order == 'DESC') { return 1 };
            }
            if (nameA > nameB) {
              if (this.order == 'ASC') { return 1 };
              if (this.order == 'DESC') { return -1 };
            }
            // names must be equal
            return 0;
          }
          else {
            return b.base_experience - a.base_experience;
          }
        }
      )

      //Set result count
      this.count = Math.round(filtered.length);

      //Update pokemons result
      this.pokemons = filtered.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);;
      this.filteredPokemons = filtered;

    },
    setPage(page: number): void {
      this.page = page;
      this.pokemons = this.filteredPokemons.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
    },
    setOrder(): void {
      this.filterData();
    },
    search(): void {
      this.filterData()
    },
    // easily reset state using `$reset`
    clear() {
      this.$reset()
    }
  }
})