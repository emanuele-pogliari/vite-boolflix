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
<nav class="navbar navbar-expand-lg text-capitalize ">
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
      <input id="search" v-model="store.searchValue" class=" search-field form-control" type="search" placeholder="Search Something" aria-label="Search">
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
      display: none;
      background-color: #dc1a28;
      color: white;
    }
    .my-search-btn:hover{
      background-color: white;
      color: #dc1a28;
    }

    // style seach field 
  .search-field {
    background-color: red;
	background-image: url(https://wp-themes.com/wp-content/themes/twentythirteen/images/search-icon.png);
	background-position: 5px  center;
	background-repeat: no-repeat;
	background-size: 24px 24px;
  	border: none;
    overflow: hidden;
	  cursor: pointer;
	  height: 40px;
	  padding: 0 0 0 34px;
	  position: relative;
	  -webkit-transition: width 400ms ease, background 400ms ease;
	  transition:         width 400ms ease, background 400ms ease;
	  width:0px;
   cursor: pointer;
}

// when input is clicked, search field will appear 
.search-field:focus {
	background-color: #FFF;
	cursor: text;
	outline: 0;
	width: 250px;
  color: black;
}

.search-submit { 
display:none;
}

</style>