<script>
import {store} from "./store"
import AppNav from './components/AppNav.vue'
import AppMain from './components/AppMain.vue'
import axios from 'axios';


export default {
  components: {
    AppNav,
    AppMain,
  },
  
  data() {
    return {
      store,
    }
  },

  created(){
    // api call for movies on site load
    axios.get("https://api.themoviedb.org/3/movie/popular?api_key=19c45db332e486b3ce135dc6b088eb7e").then(res => {

      this.store.movies = res.data.results;

    }).catch(err => console.error(err));
    // api call for series on site load
    axios.get("https://api.themoviedb.org/3/tv/popular?api_key=19c45db332e486b3ce135dc6b088eb7e").then(res => {

      this.store.series = res.data.results;

    }).catch(err => console.error(err));

    // api calls for all genres on site load
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=19c45db332e486b3ce135dc6b088eb7e`).then(res => {
        
        axios(`https://api.themoviedb.org/3/genre/tv/list?api_key=19c45db332e486b3ce135dc6b088eb7e`).then(res2 => {

        store.apiGenres = res.data.genres.concat(res2.data.genres)

        }).catch(err => console.error(err));

    }).catch(err => console.error(err));
  },

methods:{

  searchMovies() {
    // api call for movies search
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=19c45db332e486b3ce135dc6b088eb7e&query=' + this.store.searchValue)
    .then(res => {
    this.store.movies = res.data.results;
    });
    // api call for series search 
    axios.get('https://api.themoviedb.org/3/search/tv?api_key=19c45db332e486b3ce135dc6b088eb7e&query=' + this.store.searchValue)
    .then(res => {
    this.store.series = res.data.results;
    });
  },
}
}

</script>

<template>
  <AppNav @search="searchMovies()"></AppNav>
  <AppMain></AppMain>
</template>

<style>
</style>
