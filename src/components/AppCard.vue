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
    // const array = store.movies.concat(store.series);
    store.movies.concat(store.series).forEach(element => {
        arrUnited.push(element.genre_ids)
    });


    arrUnited.forEach(element => {
        for(let i = 0; i < element.length; i++){
            if(!store.allGenres.includes(element[i]))
            store.allGenres.push(element[i])
        }
    });

    console.log(store.apiGenres);
    const selectArr = [];
    store.apiGenres.forEach(element => {
           if(store.allGenres.includes(element.id)){
                selectArr.push(element.name);
           }
        })
    
    store.selectArray = selectArr;

    console.log(selectArr)
    

    
    
        
    })
        },
    }   
}

</script>

<template>
    
        <div @click=getCastsName(item.id) class="card col-12 col-md-3 col-lg-2 p-0 flip-card border-1 border-color rounded-0 position-relative my-card">
            <div class="img-box">
                <img class="my_img" :src="getPoster()" alt="">
            </div>
            <div class="overlay">
                <p><span>Title: </span>{{ item.title ? item.title : item.name }}</p>
                <p><span>Original Title: </span>{{ item.original_title ? item.original_title : item.original_name }}</p>
                <div>
                    <span>Language: </span>
                    <img :src="getFlag()" class="">
                </div>
                <div>
                    <span>Rate: </span>
                    <i v-for="star in printStars()" :class="star"></i>
                </div>

                <p max-length="50" class="truncate-text">{{ item.overview }}</p>
                <div><span v-for="singleName in store.casts">{{ singleName.name }}, </span></div>
                <div><span v-for="genre in store.genresMovie">{{ genre.genresMovie }}</span></div>
            </div>
        </div>
</template>

<style lang="scss">

.truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.my_img{
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1.5;
  }

  .my-card{
    background-color: transparent;
    color:white;
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

</style>


<!-- Prendere gli array in store, (movies and series),

al click del select, fare le due chiamate api per i generi delle serie e dei film
unire i due array e rimuovere eventuali doppioni per entrambi gli array
confrontare i due array, se gli elementi nell'array creato dagli array movie
  -->