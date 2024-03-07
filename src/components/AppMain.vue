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
}

</script>

<template>    
<div class="container">
    <div class="row">
        
        <div class="text-white" v-if="store.movies.length!= 0">Movies</div>

        <AppCard  v-for="currentMovie in store.movies" :item="currentMovie"></AppCard>

        <div class="text-white" v-if="store.series.length!= 0">Series</div>

        <AppCard  v-for="currentSerie in store.series" :item="currentSerie"></AppCard>

    </div>
</div>
   
</template>

<style lang="scss">
</style>./AppCard.vue/index.js