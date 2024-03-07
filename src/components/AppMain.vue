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
        <AppCard  v-for="currentMovie in store.movies" :item="currentMovie"></AppCard>
        <AppCard  v-for="currentSerie in store.series" :item="currentSerie"></AppCard>
    </div>
</div>
   
</template>

<style lang="scss">
</style>./AppCard.vue/index.js