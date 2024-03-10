<script>
import AppCard from "./AppCard.vue";
import AppSelect from "./AppSelect.vue";
import {store} from "../store.js"

export default{
    name: 'AppMain',

    props: {
        item: Object,
    },

    components:{
        AppCard,
        AppSelect,
    },

    data() {
        return {
            store,
        }
    },



methods: {
//     filterMovies(){
//         if()

// }
},
}
</script>

<template>    

<div class="container">
    <!-- <AppSelect @search="filterMovies()"></AppSelect> -->
    <div class="row">
        
        <div class="text-white p-0 fs-2 my-3" v-if="store.movies.length!= 0">Movies</div>

        <AppCard class="mb-4" v-for="currentMovie in store.movies" :item="currentMovie"></AppCard>

        <div class="text-white p-0 fs-2 mb-3" v-if="store.series.length!= 0">Series</div>

        <AppCard class="mb-2" v-for="currentSerie in store.series" :item="currentSerie"></AppCard>

    </div>
</div>
   
</template>

<style lang="scss">
</style>