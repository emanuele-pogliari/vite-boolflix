<script>
import AppNav from "./AppNav.vue";
import AppSearch from "./AppSearch.vue";
import MovieItem from "./MovieItem.vue";



import axios from 'axios';

export default{
    name: 'AppMain',

    components:{
        AppNav,
        AppSearch,
        MovieItem,
    },

    data() {
        return {
        }
    },
}

</script>

<template>    
<AppNav></AppNav>
<AppSearch></AppSearch>
<div class="container">
    <MovieItem></MovieItem>
</div>   
</template>

<style lang="scss">
</style>