<script setup lang="ts">
/**
 * Magnolia test tecnique
 * @author Andrea Porcella 2023
 * @componenet App
 */
import { useRoute,RouterLink } from "vue-router";
import { RouterView,  } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
const { loading, error, } = storeToRefs(usePokemonStore());
</script>

<template>
  <header>
    <router-link to="/" class="linkBack"><img alt="Vue logo" class="logo" src="../src/assets/logo.svg" width="225" /></router-link>
  </header>
  <main>
    <section v-if="loading" class="loading">
      <p>Loading...</p>
    </section>
    <section v-if="error" class="error">{{ error.message }}</section>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 1rem;
}

.loading{
  width:100;
  text-align: center;
}
main {
  max-width: 1280px;
  margin: 2rem auto;
}

</style>

