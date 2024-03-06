<script>
export default {
    name: 'MovieItem',

    props: {
        movie: Object,
    },
}
</script>

<template>       

<div class="card">
       <p>{{ movie.title }}</p>
       <p class="">{{ movie.original_title }}</p>
       <p class="">{{ movie.original_language }}</p>
       <p class="">{{ movie.vote_average }}</p>
</div>
</template>

<style lang="scss">
</style>