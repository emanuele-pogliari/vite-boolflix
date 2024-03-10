import { reactive } from 'vue'
import axios from 'axios';

export const store = reactive({

    movies: [],

    searchValue: "",

    flag: "",

    series: [],

    casts: [],

    movieGenres: [],

    apiGenres: [],

    allGenres: [],

    selectArray: [],
})
