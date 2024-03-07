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
    <div class="row gap-5 ">
        <MovieItem  v-for="currentMovie in store.movies" :movie="currentMovie"></MovieItem>
    </div>
    <div>SERIES</div>
    <div class="row">
    <SeriesItem v-for="currentSerie in store.series" :series="currentSerie"></SeriesItem>
</div>
</div>   
</template>

<style lang="scss">
</style>