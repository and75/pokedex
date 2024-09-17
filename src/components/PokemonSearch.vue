<script setup lang="ts">
/**
 * Pokedex test tecnique
 * @author Andrea Porcella 2023
 * @componenet Filter
 */

import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'

const { count } = storeToRefs(usePokemonStore());
const { search } = usePokemonStore();
const query = ref("");

// Watch the change of query value to search start
watch(query, () => {
    search(query);
}, { immediate: true })

</script>

<template>
    <section class="filter">
        <form>
            <div class="formBlock">
                <label>Rechercher par nom</label>
                <input type="text" v-model="query" placeholder="Search..." />
            </div>
        </form>
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

.filter form .formBlock label {
    font-size: 0.5rem;
    text-transform: uppercase;
}
.filter form .formBlock details ul {
    height: 200px;
    overflow-y: scroll;
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
