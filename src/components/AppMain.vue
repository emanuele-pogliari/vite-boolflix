<script>
import AppNav from "./AppNav.vue";
import MovieItem from "./MovieItem.vue";

import {store} from "../store.js"

export default{
    name: 'AppMain',

    components:{
        MovieItem,
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
    <MovieItem v-for="currentMovie in store.movies" :movie="currentMovie"></MovieItem>
</div>   
</template>

<style lang="scss">
</style>