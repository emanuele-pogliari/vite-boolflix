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
    axios.get("https://api.themoviedb.org/3/movie/popular?", this.store.options).then(res => {
      this.store.movies = res.data.results;
      console.log(res.data.results);
    });

    axios.get("https://api.themoviedb.org/3/tv/popular?", this.store.options).then(res => {
      this.store.series = res.data.results;
      console.log(res.data.results);
    });

  // call for single movie cast
  axios.get('https://api.themoviedb.org/3/movie/196/credits', this.store.options)
    .then(res => {
    console.log(res.data.cast);
    }).catch(err => console.error(err));


  // call for movie genres
  axios('https://api.themoviedb.org/3/genre/movie/list?language=en', this.store.options)
    .then(res => {
    console.log(res.data.genres);
    }).catch(err => console.error(err));

    // call for series genres
  axios('https://api.themoviedb.org/3/genre/tv/list?language=en', this.store.options)
    .then(res => {
    console.log(res.data.genres);
  }).catch(err => console.error(err));
},

methods:{

searchMovies() {

axios.get('https://api.themoviedb.org/3/search/movie?api_key=19c45db332e486b3ce135dc6b088eb7e&query=' + this.store.searchValue)
  .then(res => {
    console.log(res.data.results)
    console.log(this.store.searchValue);
    this.store.movies = res.data.results;
  });

  axios.get('https://api.themoviedb.org/3/search/tv?api_key=19c45db332e486b3ce135dc6b088eb7e&query=' + this.store.searchValue)
  .then(res => {
    console.log(res.data.results)
    console.log(this.store.searchValue);
    this.store.series = res.data.results;
  });
  this.store.isFirstLoad = true;
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
