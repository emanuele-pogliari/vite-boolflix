<script>
import { store } from "../store.js";
import axios from "axios";

export default {
    name: 'AppNav',

    data(){
      return{
        store,
      }
    },
}

</script>

<template>   
<nav class="navbar bg-black  ">
  <div class="container-fluid">
    <a class="navbar-brand text-danger">BOOLFLIX</a>
    <div class="d-flex" role="search">
      <input id="search" v-model="store.searchValue" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button @click="$emit('search')" class="btn btn-outline-success">Search</button>
    </div>
  </div>
</nav>
    
</template>

<style lang="scss">

</style>