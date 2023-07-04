
<script setup lang="ts">

import { useRoute,RouterLink } from "vue-router";
import { usePokemonStore } from "@/stores/pokemon";
import { storeToRefs } from 'pinia'
const { detail } = storeToRefs(usePokemonStore());

const { fetchDetail } = usePokemonStore()
const route = useRoute();
const id = route.params.id;
fetchDetail(id);
function getImg(val: number) {
  const id = val ? val : 2;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

console.log(detail)

</script>
<template>
  <section class="detail" v-if="detail">
    <article class="card">

      <div class="body">
        <div class="col">
          <figure><img :src="getImg(detail.id)"></figure>
        </div>
        <div class="col">
          <h1>{{ detail.name }}</h1>
          <p>Base Experince : <b>{{ detail.base_experience }}</b></p>
          <p>Type : <b>{{ detail.types.map((i)=>i.type.name).join(' , ') }}</b></p>
          <p>Abilities : <b>{{ detail.abilities.map((i)=>i.ability.name).join(' , ') }}</b></p>
         
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

.detail .card > .body h1 {
  text-transform: uppercase;
}

.detail .card >.body p {
  font-size: 0.7rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
}
.detail .card > .body a.linkBack{
  display: inline-block;
  margin-top:2rem;
  font-size:0.75rem;
}

@media screen and (min-width: 720px) {
  .detail .card .body {
    flex-direction: row;
    padding:2rem;
  }

  .detail .card .body .col {
    flex: 50%;
    justify-content: center;
    padding:2rem;
  }
}
</style>
