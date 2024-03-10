<script>
import axios from 'axios';
import {store} from "../../src/store.js"

export default {
    name: 'MovieItem',

    props: {
        item: Object,
    },
    
    data(){
        return{
            store,
            showOverlay:false,
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
        if(this.item.poster_path != null){
        return `https://image.tmdb.org/t/p/w342/${this.item.poster_path}`
    }else{
        return `/img/fallback.png`
    }
    },

    getBackdrop(){
        return `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${this.item.backdrop_path}`
    },

    printStars(){
        const vote = Math.round(this.item.vote_average / 2);
        const arrayStars = ['fa-regular fa-star', 'fa-regular fa-star', 'fa-regular fa-star', 'fa-regular fa-star', 'fa-regular fa-star'];
        for(let i = 0; i < vote; i++){
            arrayStars.pop();
            arrayStars.unshift('fa-solid fa-star');
        }
        return arrayStars;
    },

    // methods that will extract casts names from api
    getCastsName(id){
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=19c45db332e486b3ce135dc6b088eb7e`).then(res => {
    store.casts = res.data.cast;
    store.casts.splice(5,store.casts.length);

    // test for genres
    const arrUnited = [];
    store.movies.concat(store.series).forEach(element => {
        arrUnited.push(element.genre_ids)
    });


    arrUnited.forEach(element => {
        for(let i = 0; i < element.length; i++){
            if(!store.allGenres.includes(element[i]))
            store.allGenres.push(element[i])
        }
    });

    const selectArr = [];
    store.apiGenres.forEach(element => {
           if(store.allGenres.includes(element.id)){
                selectArr.push(element.name);
           }
        })
    store.selectArray = selectArr;
    })
        },

        toggleCard(){
            this.showOverlay = !this.showOverlay
            this.getCastsName(this.item.id)
        }
}
    }   


</script>

<template>
        <div id="main-content" class="card col-12 col-md-3 col-lg-2 p-0 border-1 border-color rounded-0 my-card">
            <div class="img-box">
                <img class="my_img" :src="getPoster()" alt="">
            </div>
            <div class="overlay d-flex flex-column ">
                <p><span>Title: </span>{{ item.title ? item.title : item.name }}</p>
                <div>
                    <span>Language: </span>
                    <img :src="getFlag()" class="">
                </div>
                <p class="h-25 my-overview" max-length="50"><span>Overview: </span>{{ item.overview }}</p>
                <div><span v-for="genre in store.genresMovie">{{ genre.genresMovie }}</span></div>
                
                <div>
                    <span>Rate: </span>
                    <i v-for="star in printStars()" :class="star"></i>
                </div>
                <p @click="toggleCard" class="fs-5 my-more-btn">More...</p>
                
                <div v-if="showOverlay" class="overlays overflow-scroll ">
                    <div class="card w-50 my-card">
                        <div class="card-body text-start">
                            <i @click="toggleCard" class="my-close-btn position-absolute fa-solid fa-xmark position-absolute top-0 end-0 me-2"></i>
                            <img class="m-auto img-fluid" :src="getBackdrop()" alt="">
                            <div class="pt-2 text-card-container">
                            <p class="m-0"><span>Title: </span>{{ item.title ? item.title : item.name }}</p>
                            <p class="m-0"><span>Original Title: </span>{{ item.original_title ? item.original_title : item.original_name }}</p>
                            <div>
                                <span>Language: </span>
                                <img :src="getFlag()" class="">
                            </div>
                            <p class="m-0">Cast: <span v-for="singleName in store.casts">{{ singleName.name }},</span></p>
                            <div>
                                <span>Rate: </span>
                                <i v-for="star in printStars()" :class="star"></i>
                            </div>
                            <p class="m-0"><span>Overview: </span>{{ item.overview }}</p>
                        </div>
                        </div>
                        
                    </div>
                </div>

                
            </div>
        </div>
</template>

<style lang="scss">

.disable-events{
    pointer-events: none;
}

.my-overview{
    overflow-y: hidden;
    text-overflow: ellipsis;
}

.my_img{
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1.5;
  }

  .my-card{
    background-color: rgb(27, 25, 25);
    color:white;
    max-width: 800px;
  }

  .overlay {
  position: absolute; 
  bottom: 0; 
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.7); /* Black see-through */
  width: 100%;
  height: 100%;
  transition: .3s ease;
  opacity:0;
  color: white;
  padding: 10px;
  text-align: center;
}

.overlay span{
    color: #dc1a28;
}

.my-card:hover .overlay {
  opacity: 1;
}

.overlays {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.my-more-btn, .my-close-btn {
    cursor: pointer;
}

</style>


<!-- Prendere gli array in store, (movies and series),

al click del select, fare le due chiamate api per i generi delle serie e dei film
unire i due array e rimuovere eventuali doppioni per entrambi gli array
confrontare i due array, se gli elementi nell'array creato dagli array movie
  -->