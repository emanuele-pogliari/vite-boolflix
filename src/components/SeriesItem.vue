<script>
export default {
    name: 'SeriesItem',

    props: {
        series: Object,
    },

    methods:{
    getFlag(){
        return `https://flagcdn.com/16x12/${this.series.original_language}.png`
    },

    getPoster(){
        return `https://image.tmdb.org/t/p/w342/${series.poster_path}`
    }
}
}
</script>

<template>    
 <div class="container-fluid d-flex flex-row ">       
    <div>SERIES</div>
    <div >
        <img :src="getPoster()" alt="">
        <p>{{ series.name }}</p>
        <p class="">{{ series.original_name }}</p>
        <div>
            <img :src="getFlag()" class="">
        </div>
        <p class="">{{ series.vote_average }}</p>
    </div>
 </div>

</template>

<style lang="scss">
</style>