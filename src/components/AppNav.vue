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
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand">Boolflix</a>
    <div class="d-flex" role="search">
      <input v-model="store.searchValue" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button @click="$emit('search')" class="btn btn-outline-success">Search</button>
    </div>
  </div>
</nav>
    
</template>

<style lang="scss">

</style>