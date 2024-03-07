<script>
export default {
    name: 'MovieItem',

    props: {
        item: Object,
    },
    
    data(){
        return{
        }
    },

    methods:{
    getFlag(){
        let flag = this.item.original_language;
        switch(this.item.original_language){
            case "ja":
                flag = "jp";
                break;
            case "en":
                flag = "us";
                break;
            case "ko":
                flag = "kr";
                break;
            case "da":
                flag = "dk";
                break;
            case "zh":
                flag = "cn";
                break;
            case "cs":
                flag = "cz"
                break;
            case "uk":
                flag = "gb"
                break;
            case "hi":
                flag = "in"
                break;
            case "sv":
                flag = "se"
                break;
            default:
        }
        return `https://flagcdn.com/16x12/${flag}.png`
    },

    getPoster(){
        return `https://image.tmdb.org/t/p/w342/${this.item.poster_path}`
    },

    printStars(){
        const vote = Math.round(this.item.vote_average / 2);
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
        <div class="card col-6 col-md-3 col-lg-2 p-0 flip-card border-1 border-color rounded-0 my-card">
            <div class="flip-card-front">
                    <img class="my_img" :src="getPoster()" alt="">
            </div>
            <div class="flip-card-back">
                <p>{{ item.title ? item.title : item.name }}</p>
                <p>{{ item.original_title ? item.original_title : item.original_name }}</p>
                <div>
                    <img :src="getFlag()" class="">
                </div>
                    <i v-for="star in printStars()" :class="star"></i>
            </div>
        </div>

</template>

<style lang="scss">

.my_img{
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1.5;
  }

  .my-card{
    background-color: transparent;
    color:white;
  }

</style>