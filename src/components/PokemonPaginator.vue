<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
const store = usePokemonStore();
const { count, getPages} = storeToRefs(usePokemonStore());
const pages = getPages;
</script>

<template>
    <section class="paginator" v-if="count>0 && pages">
        <ul class="pages">
            <li v-for="num in pages"><button class="secondary" @click="store.setPage(num)">{{ num }}</button></li>
        </ul>
    </section>
</template>

<style scoped>
.paginator {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 0 0 2rem;
}
.pages {
    text-align: center;
    margin: 0;
}
.pages li {
    list-style: none;
    display: inline-block;
    margin: 0 0.3rem;
}
.pages li>button {
    font-size: 0.5rem;
    font-weight: 900;
}




@media screen and (min-width: 820px) {}
</style>
