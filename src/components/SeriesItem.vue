<script>
export default {
    name: 'SeriesItem',

    props: {
        series: Object,
    },

    methods:{
    getFlag(){
        let flag = this.series.original_language;
        switch(this.series.original_language){
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
            default:
        }
        return `https://flagcdn.com/16x12/${flag}.png`
    },

    getPoster(){
        return `https://image.tmdb.org/t/p/w342/${this.series.poster_path}`
    }
}
}
</script>

<template>    
    <div class="card col col-md-6 col-lg-3 p-0 flip-card border-0 rounded-0 my-card">

        <div class="flip-card-inner">

            <div class="flip-card-front">
                <img class="my_img":src="getPoster()" alt="">
            </div>

            <div class="flip-card-back">
                <p>{{ series.name }}</p>
                <p class="">{{ series.original_name }}</p>

                <div>
                    <img :src="getFlag()" class="">
                </div>
                <p class="">{{ series.vote_average }}</p>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
</style>