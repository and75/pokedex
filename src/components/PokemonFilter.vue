<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'

const { count, query, getFilters, order, selectedFilters } = storeToRefs(usePokemonStore());
const { setOrder, setSelectedFilter, search } = usePokemonStore();

console.log(getFilters);
const onOrderChange = () => {
  setOrder();
}
const onFilterChange = (filter: string, value: any) => {
  setSelectedFilter(filter, value)
}
const onSearch = (e:any) => {
  search();
}
watch(query,  () => {
  search();
}, { immediate: true })

</script>

<template>
  <section class="filter" v-if="count>0">
    <form>
      <div class="formBlock">
        <label>Rechercher par nom</label>
        <input type="text" v-model="query" placeholder="Search..." @change="onSearch($event)"/>
      </div>

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
  <section class="resume" v-if="count>0">
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
