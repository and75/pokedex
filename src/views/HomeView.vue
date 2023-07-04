<script setup lang="ts">
import PokeMonFilter from '@/components/PokemonFilter.vue';
import PokemonGrid from '@/components/PokemonGrid.vue';
import PokemonPaginator from '@/components/PokemonPaginator.vue';
import { usePokemonStore } from '@/stores/pokemon';
const { fetchPokemons } = usePokemonStore();
fetchPokemons();
</script>

<template>
    <PokeMonFilter />
    <PokemonPaginator />
    <PokemonGrid />
    <PokemonPaginator />
</template>

