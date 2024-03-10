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
            // overlay description is disabled
            showOverlay:false,
        }
    },

    methods:{

    // method that will check original_language value. With the switch i create some cases. If them are verified, 
    // original language value will change and returned with the final link of the flag that will be printed on screen 
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

    // method that will load poster image on the description, if not available fallback img will be loaded
    getPoster(){
        if(this.item.poster_path != null){
        return `https://image.tmdb.org/t/p/w342/${this.item.poster_path}`
    }else{
        return `/img/fallback.png`
    }
    },

    // method that will load backdrop image on the description, if not available fallback img will be loaded
    getBackdrop(){
        if(this.item.backdrop_path != null){
        return `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${this.item.backdrop_path}`
        }else{
        return `/img/fallback-backdrop.png`
    }
    },

    // method that will print 5 stars vote
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

    // method that will get the genres id from single movie o serie and will return genre names of that show. 
    getGenres(genreId){
        const genre = store.apiGenres.find(genre => genre.id === genreId);
        return genre ? genre.name : '';
    },
   
    // method that will activate and disable overlay description on user click.
    toggleCard(){
        this.showOverlay = !this.showOverlay
        this.getCastsName(this.item.id)
        store.casts = [];
    }
}
    }   


</script>

<template>
        <!-- card  -->
    <div id="main-content" class="card col-12 col-md-3 col-lg-2 p-0 border-1 border-color rounded-0 my-card">
        <!-- poster image -->
        <div class="img-box">
            <img class="my-img" :src="getPoster()" alt="">
        </div>
        
        <!-- overlay poster card -->
        <div class="poster-overlay d-flex flex-column ">
                
            <p><span>Title: </span>{{ item.title ? item.title : item.name }}</p>
                
            <div>
                 <span>Language: </span>
                 <img :src="getFlag()" class="">
            </div>
                
            <p class="my-overview" max-length="50"><span>Overview: </span>{{ item.overview }}</p>
                
            <div>
                <span v-for="genre in store.genresMovie">{{ genre.genresMovie }}</span>
            </div>
                
            <div>
                <span>Rate: </span>
                <i v-for="star in printStars()" :class="star"></i>
            </div>
            
            <p @click="toggleCard" class="fs-5 my-more-btn">More...</p>
                
                <!-- overlay description -->
            <div v-if="showOverlay" class="desc-overlay overflow-scroll ">
                    
                <div class="card w-50 my-card">
                        
                    <div class="card-body text-start">
                            
                        <i @click="toggleCard" class="my-close-btn position-absolute fa-solid fa-xmark position-absolute top-0 end-0 me-2"></i>
                        <img class="m-auto img-fluid" :src="getBackdrop()" alt="">
                    
                        <div class="pt-2 text-card-container">
                    
                            <p class="m-0"><span>Title: </span>{{ item.title ? item.title : item.name }}</p>
                            <p class="m-0"><span>Original Title: </span>{{ item.original_title ? item.original_title : item.original_name }}</p>
                            <p  class="m-0">Genres: <span v-for="genreId in item.genre_ids">  {{ getGenres(genreId) }}, </span></p>
                            
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

// to truncate overview of the movie/series after 4 rows
.my-overview{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    @supports (-webkit-line-clamp: 2) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: initial;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }}

// 
.my-img{
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1.5;
  }

  .my-card{
    background-color: rgb(27, 25, 25);
    color:white;
    max-width: 800px;
  }

 .poster-overlay {
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

.poster-overlay span{
    color: #dc1a28;
}

.my-card:hover .poster-overlay {
  opacity: 1;
}

.desc-overlay {
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
