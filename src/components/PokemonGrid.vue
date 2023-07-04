<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
const { pokemons} = storeToRefs(usePokemonStore());
function getImg(val: number) {
  const id = val ? val : 2;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}
</script>

<template>
  <section>
    <div class="grid">
      <article class="card" v-if="pokemons" v-for="post in pokemons" :key="post.id" data-test="post">
        <figure><img :src="getImg(post.id)"></figure>
        <div class="body">
          <h2>{{ post.name }}</h2>
          <p>Base Experince : <b>{{ post.base_experience }}</b></p>
          <p>Type : <b>{{ post.types.map((i)=>i.type.name).join(',') }}</b></p>
        </div>
        <div class="footer">
          <router-link :to="'/detail/'+post.id" role="button">Découvrir</router-link>
        </div>
      </article>
    </div>
  </section>
</template>

<style>
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 30px;
}

@media screen and (min-width: 720px) {
  .grid {
    flex-direction: row;
  }
}

.grid .card {
  background-color: #fff;
  flex: 100%;
  min-height: 14rem;
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: 0 6px 6px rgba(0, 0, 0, .1019607843);
  border-radius: 1rem;
}

@media screen and (min-width: 720px) {
  .grid .card {
    flex: 25%;
  }

  .grid .card:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
}

/** CARD */
.grid .card>.head {
  padding: 7px;
  text-align: left;
}

.grid .card>figure {
  overflow: hidden;
  text-align: center;
}

.grid .card>figure>img {
  padding: 0;
  max-width: 65%;
}

@media screen and (min-width: 720px) {
  .grid .card>figure {
    max-height: 300px;
  }

  .grid .card>figure>img {
    max-height: 300px;
    transition: transform 0.3s ease-in-out;
  }

  .grid .card:hover>figure>img {
    -ms-transform: scale(1.2);
    /* IE 9 */
    -webkit-transform: scale(1.2);
    /* Safari 3-8 */
    transform: scale(1.2);
  }
}

.grid .card>.body {
  padding: 0 7px;
  text-align: center;
  min-height: 100px;
  margin-bottom: var(--typography-spacing-vertical);
}

.grid .card>.body h2 {
  margin: 0 0 0.5rem;
  text-transform: capitalize;
}

.grid .card>.body p {
  font-size: 0.7rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
}

.grid .card>.footer {
  padding: 0 7px;
  text-align: center;
  margin-bottom: var(--typography-spacing-vertical);
}
</style>