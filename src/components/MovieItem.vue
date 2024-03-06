<script>
export default {
    name: 'MovieItem',

    props: {
        movie: Object,
    },
    methods:{
    getFlag(){
        return `https://flagcdn.com/16x12/${this.movie.original_language}.png`
    },

    getPoster(){
        return `https://image.tmdb.org/t/p/w342/${this.movie.poster_path}.jpg`
    }
}
}
</script>

<template>
    <div class="container-fluid d-flex flex-row ">       
    <div class="card col-4">
        <img :src="getPoster()" alt="">
        <p>{{ movie.title }}</p>
        <p class="">{{ movie.original_name }}</p>
        <div>
            <img :src="getFlag()" class="">
        </div>
        <p class="">{{ movie.vote_average }}</p>
    </div>
</div>

</template>

<style lang="scss">
</style>