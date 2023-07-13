<script setup lang="ts">
/**
 * Pokedex test tecnique
 * @author Andrea Porcella 2023
 * @componenet Filter
 */

import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'

const { count, getFilters, order, selectedFilters } = storeToRefs(usePokemonStore());
const { setOrder, setSelectedFilter, search } = usePokemonStore();
const query = ref("");

// Order Action
const onOrderChange = () => {
  setOrder();
}
// Filter action
const onFilterChange = (filter: string, value: any) => {
  setSelectedFilter(filter, value)
}

// Watch the change of query value to search start
watch(query,  () => {
  search(query);
}, { immediate: true })

</script>

<template>
  <section class="filter">
    <form>
      <div class="formBlock">
        <label>Filtrer par type</label>
        <details role="list">
          <summary aria-haspopup="listbox">Type</summary>
          <ul role="listbox">
            <li v-for="(item, index) in getFilters.types">
              <label for="item">
                <input type="checkbox" id="small" :value="item" @change="onFilterChange('type', item)">
                {{ item }}
              </label>
            </li>
          </ul>
        </details>
      </div>
      <div class="formBlock">
        <label>Filtrer par base d'expérience</label>
        <details role="list">
          <summary aria-haspopup="listbox">Base experience</summary>
          <ul role="listbox">
            <li v-for="(item, index) in getFilters.species">
              <label for="item">
                <input type="checkbox" id="small" :value="item" @change="onFilterChange('species', item)">
                {{ item }}
              </label>
            </li>
          </ul>
        </details>
      </div>
      <div class="formBlock">
        <label>Trier par</label>
        <select @change="onOrderChange()" v-model="order">
          <option value="ASC">Alfabetic ASC</option>
          <option value="DESC">Alfabetic DESC</option>
          <option value="baseExperience">Pertinence(BaseExperience)</option>
        </select>
      </div>
    </form>
  </section>
  <section class="resume">
    <p> Pokémon trouvé <b>{{ count }}</b>
      <span v-if="query.length > 0">/ Query : <b>{{ query }}</b></span>
      <span v-if="selectedFilters.types.size > 0">/ Type : <b>{{ [...selectedFilters.types].join(' , ') }}</b></span>
      <span v-if="selectedFilters.species.size > 0"> / Base Ex : <b>{{ [...selectedFilters.species].join(' , ') }}</b></span>
    </p>
  </section>
</template>

<style scoped>
.filter {
  margin: 0;
}
.filter form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}
.filter form .formBlock {
  flex: 25%;
  margin: 0;
}
.filter form .formBlock input,
.filter form .formBlock select,
.filter form .formBlock summary {
  font-size: 0.9rem;
}
.filter form .formBlock label {
  font-size: 0.5rem;
  text-transform: uppercase;
}
.filter form .formBlock details ul {
  height: 200px;
  overflow-y: scroll;
}
.resume {
  margin: 0 0 1.5rem;
}
.resume p {
  margin: 0;
  text-align: center;
  font-size: 0.75rem;
}

@media screen and (min-width: 820px) {
  .filter {
    margin: 0 4rem;
  }
  .filter form {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
}</style>
