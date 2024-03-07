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
        return `https://flagcdn.com/16x12/${this.movie.original_language}`
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
    <div class="container-fluid d-flex flex-row ">       
        <div class="card col-4 flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img :src="getPoster()" alt="">
                    <p>{{ movie.title }}</p>
                    <p class="">{{ movie.original_name }}</p>
                    
                </div>
                <div class="flip-card-back">
                    <div>
                        <img :src="getFlag()" class="">
                    </div>
                    <i v-for="star in printStars()" :class="star"></i>
                    <h1>John Doe</h1>
                    <p>Architect & Engineer</p>
                    <p>We love that guy</p>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
.flip-card {
  background-color: transparent;
    width: 300px;
  height: 200px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}

</style>