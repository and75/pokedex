<script setup lang="ts">
/**
 * Pokedex test tecnique
 * @author Andrea Porcella 2023
 * @view Home
 */

import PokeMonFilter from '@/components/PokemonFilter.vue';
import PokemonGrid from '@/components/PokemonGrid.vue';
import PokemonPaginator from '@/components/PokemonPaginator.vue';

</script>

<template>
    <PokeMonFilter />
    <PokemonPaginator />
    <PokemonGrid />
    <PokemonPaginator />
</template>

