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
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=19c45db332e486b3ce135dc6b088eb7e&query=ritorno+al+futuro").then(res => {
      this.store.movies = res.data.results;
      console.log(res.data.results);
    });
  },

methods:{

searchMovies() {

axios.get('https://api.themoviedb.org/3/search/movie?api_key=19c45db332e486b3ce135dc6b088eb7e&query=' + this.store.searchValue)
  .then(res => {
    console.log(res.data.results)
    console.log(this.store.searchValue);
    this.store.movies = res.data.results;
  });
  },
},


}

</script>

<template>
  <AppNav @click="searchMovies()"></AppNav>
  <AppMain></AppMain>

</template>

<style>

</style>
