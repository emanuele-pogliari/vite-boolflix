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
        return `https://image.tmdb.org/t/p/w342/${this.movie.poster_path}`
    },

    printStars(){
        const vote = Math.round(this.movie.vote_average / 2);
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
        <div class="card col-12 col-md-6 col-lg-3 p-0 flip-card border-0 rounded-0">
            <div class="flip-card-inner">
                
                <div class="flip-card-front">
                    <img class="my_img" :src="getPoster()" alt="">
                </div>

                <div class="flip-card-back">

                    <p>{{ movie.title }}</p>
                    <p class="">{{ movie.original_name }}</p>

                    <div>
                        <img :src="getFlag()" class="">
                    </div>

                    <i v-for="star in printStars()" :class="star"></i>

                </div>

            </div>
        </div>

</template>

<style lang="scss">

.my_img{
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1.5;
  }

</style>