import { reactive } from 'vue'
import axios from 'axios';

export const store = reactive({

    movies: [],

    series: [],

    searchValue: "",

    flag: "",

    casts: [],

    movieGenres: [],

    apiGenres: [],

    allGenres: [],

    selectArray: [],

    singleIdsMovie: [],
})
