import { reactive } from 'vue'

export const store = reactive({

    movies: [],

    searchValue: "",

    flag: "",

    series: [],

    moviesGenres: [],

    seriesGenres: [],

    casts: [],


    options: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer 19c45db332e486b3ce135dc6b088eb7e'
        }
    },

});