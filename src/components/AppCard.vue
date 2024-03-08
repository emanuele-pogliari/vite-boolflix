<script>
export default {
    name: 'MovieItem',

    props: {
        item: Object,
    },
    
    data(){
        return{
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
            console.log(arrayStars)
        }
        return arrayStars;
    }
}
}
</script>

<template>
        <div class="card col-12 col-md-3 col-lg-2 p-0 flip-card border-1 border-color rounded-0 position-relative my-card">
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