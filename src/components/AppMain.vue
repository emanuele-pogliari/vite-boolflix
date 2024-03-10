<script>
import AppCard from "./AppCard.vue";

import {store} from "../store.js"

export default{
    name: 'AppMain',

    components:{
        AppCard,
    },

    data() {
        return {
            store,
        }
    },



methods: {

},
}
</script>

<template>    

<div class="container">

    <div class="row">
        <select v-model="store.archeSearch" name="genres" id="" @change="$emit('search')">
        <option :value="0">---Select genre---</option>
        <option v-for="genre in store.selectArray">{{genre}}</option>
        </select>
        
        <div class="text-white fs-2 mb-3" v-if="store.movies.length!= 0">Movies</div>

        <AppCard class="mb-4" v-for="currentMovie in store.movies" :item="currentMovie"></AppCard>

        <div class="text-white fs-2 mb-3" v-if="store.series.length!= 0">Series</div>

        <AppCard class="mb-2" v-for="currentSerie in store.series" :item="currentSerie"></AppCard>

    </div>
</div>
   
</template>

<style lang="scss">
</style>