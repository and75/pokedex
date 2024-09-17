
<script setup lang="ts">
/**
 * Pokedex test tecnique
 * @author Andrea Porcella 2023
 * @view Detail
 */

import { useRoute, RouterLink } from "vue-router";
import { usePokemonStore } from "@/stores/pokemon";
import { storeToRefs } from 'pinia'
import { computed } from "vue";

//Get route store
const route = useRoute();

//Set id parameter
const id = route.params.id;

//Get computed value from store
const { detail } = storeToRefs(usePokemonStore());

//Get function to fetch pokemon detail
const { fetchDetail } = usePokemonStore()

//Get detail 
fetchDetail(id);

const getImg = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
})



</script>
<template>
  <section class="detail" v-if="detail">
    <article class="card">

      <div class="body">
        <div class="col">
          <figure><img :src="getImg"></figure>
        </div>
        <div class="col">

          <h1>{{ detail.name }}</h1>

          <p>Base Experince : <b>{{ detail.base_experience }}</b></p>
          <p>Type : <b>{{ detail.types.map((i) => i.type.name).join(' , ') }}</b></p>
          <p>Abilities : <b>{{ detail.abilities.map((i) => i.ability.name).join(' , ') }}</b></p>

          <router-link to="/" class="linkBack"> Go to Home </router-link>

        </div>
      </div>
    </article>

  </section>
</template>

<style scoped>
.detail .card .body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem
}
.detail .card .body .col {
  flex: 100%;
  justify-content: center;
  text-align: left;
}
.detail .card>.body h1 {
  text-transform: uppercase;
}
.detail .card>.body p {
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}
.detail .card>.body a.linkBack {
  display: inline-block;
  margin-top: 2rem;
  font-size: 0.75rem;
}
@media screen and (min-width: 720px) {
  .detail .card .body {
    flex-direction: row;
    padding: 2rem;
  }
  .detail .card .body .col {
    flex: 50%;
    justify-content: center;
    padding: 2rem;
  }
}
</style>
