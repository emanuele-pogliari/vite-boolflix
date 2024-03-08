<script>
import { store } from "../store.js";

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
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand text-white"><img class="img-fluid my-logo" src="/img/logo-bool.png" alt=""></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active text-white" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Series</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Movies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Originals</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Recently Added</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">My List</a>
        </li>
      </ul>
      <div class="d-flex" role="search">
      <input id="search" v-model="store.searchValue" class="form-control rounded-0" type="search" placeholder="Search Something" aria-label="Search">
      <button @click="$emit('search')" class="btn rounded-0 my-search-btn">Search</button>
    </div>
    </div>
  </div>
</nav>
    
</template>

<style lang="scss">
    .my-logo{
      height: 50px;
    }

    .my-search-btn{
      background-color: #dc1a28;
      color: white;
    }
    .my-search-btn:hover{
      background-color: white;
      color: #dc1a28;
    }


</style>