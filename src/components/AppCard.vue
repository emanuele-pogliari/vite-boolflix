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
        <div class="poster-overlay d-flex flex-column">
                
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
                
                <div class="movie_card" id="card-container">
                
                    <div class="info_section">
                        <i @click="toggleCard" class="my-close-btn position-absolute fa-solid fa-xmark position-absolute top-0 end-0 mt-2 me-2"></i>
                        <div class="movie_header">
                            <img class="poster-small" :src="getPoster()" alt=""/>
                            <h1 class="m-0">{{ item.title ? item.title : item.name }}</h1>
                            <p class="m-0"><span>Original Title: </span>{{ item.original_title ? item.original_title : item.original_name }}</p>
                            <p class="type m-1">Genres: <span v-for="genreId in item.genre_ids">  {{ getGenres(genreId) }}, </span></p>
                        </div>
                        <div class="movie_desc px-2 text-start ">
                            <p class="mt-4"><span>Overview: </span>{{ item.overview }}</p>
                            <p class="m-0">Cast: <span v-for="singleName in store.casts">{{ singleName.name }},</span></p>
                            <div>
                              <span>Language: </span>
                              <img :src="getFlag()" class="">
                            </div>
                            <div>
                              <span class="rate">Rate: </span>
                              <i v-for="star in printStars()" :class="star"></i>
                            </div>
                        </div>
                    </div>
                    <div class="blur_back tomb_back">
                        <img class="m-auto img-fluid" :src="getBackdrop()" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
            
                    
<style lang="scss">

// HOME PAGE CARD 
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

.poster-overlay span, .rate{
    color: #dc1a28;
}

.my-card:hover .poster-overlay {
  opacity: 1;
}
// END HOME PAGE CARD


// CARD DESCRIPTION

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

.card-container{
  box-shadow: 0px 0px 150px -45px rgba(19, 160, 134, 0.6);
}

.my-more-btn, .my-close-btn {
    cursor: pointer;
}

.movie_card{
  position: relative;
  display: block;
  width: 800px;
  height: 500px;
  margin: 100px auto; 
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;

  .info_section{
    position: relative;
    width: 100%;
    height: 100%;
	  background-blend-mode: multiply;
    z-index: 2;
    border-radius: 10px;
    .movie_header{
      position: relative;
      padding: 25px;
      height: 25%;
      h1{
        color: #fff;
        font-weight: 400;
      }
      h4{
        color: #9ac7fa;
        font-weight: 400;
      }
      .type{
        display: inline-block;
        color: #cee4fd;
        margin-left: 10px;
      }
      .poster-small{
        position: relative;
        float: left;
        height: 120px;
        box-shadow: 0 0 20px -10px rgba(0,0,0,0.5);
      }
    }
    .movie_desc{
      padding: 25px;
      height: 60%;
    }
  }
  .blur_back{
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%; right: 0;
    border-radius: 11px;
  }
}

@media screen and (min-width: 768px) {
  .movie_header{
    width: 60%;
  }
  
  .movie_desc{
    width: 50%;
  }
  
  .info_section{
    background: linear-gradient(to right, #0d0d0c 40%, transparent 100%);
  }
  
  .blur_back{
    width: 100%;
    background-position: -100% 10% !important;  
  }
}

@media screen and (max-width: 768px) {
  .movie_card{
    width: 95%;
    margin: 70px auto; 
    min-height: 350px;
    height: auto;
  }

  .movie_header{
    width: 100%;
    margin-top: 85px;
  }
  
  .movie_desc{
    width: 100%;
  }
  
  .info_section{
    background: linear-gradient(to top, rgb(64, 64, 58) 50%, transparent 100%);
    display: inline-grid;
  }
}
</style>
