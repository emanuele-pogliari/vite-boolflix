<script>
import SeriesItem from "./SeriesItem.vue";
import MovieItem from "./MovieItem.vue";

import {store} from "../store.js"

export default{
    name: 'AppMain',

    components:{
        MovieItem,
        SeriesItem,
    },

    data() {
        return {
            store,
        }
    },
}

</script>

<template>    
<div class="container">
    <div>MOVIES</div>
    <MovieItem v-for="currentMovie in store.movies" :movie="currentMovie"></MovieItem>
    <div>SERIES</div>
    <SeriesItem v-for="currentSerie in store.series" :series="currentSerie"></SeriesItem>
</div>   
</template>

<style lang="scss">
</style>