<script>
export default {
    name: 'MovieItem',

    props: {
        movie: Object,
    },
    
    data(){
        return{
        }
    },

    methods:{
    getFlag(){
        return `https://flagcdn.com/16x12/${this.movie.original_language}.png`
    },

    getPoster(){
        return `https://image.tmdb.org/t/p/w342/${this.movie.poster_path}.jpg`
    },

    printStars(){
        const vote= Math.round(this.movie.vote_average / 2);
        const arrayStars = ['fa-regular fa-star', 'fa-regular fa-star', 'fa-regular fa-star', 'fa-regular fa-star', 'fa-regular fa-star'];
        for(let i = 0; i < vote; i++){
            arrayStars.pop();
            arrayStars.unshift('fa-solid fa-star');
            console.log(arrayStars)
        }
        return arrayStars;
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
        <i v-for="star in printStars()" :class="star"></i>
    </div>
</div>

</template>

<style lang="scss">
</style>