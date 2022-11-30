import axios from "axios"
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

class FetchMovies {
  #API_KEY = "dc26557b281e26d9f878e92da4703242"

  constructor(){
    this.page = 1
  }

  getTrendingMovies(page = 1){
    return axios.get('/trending/movie/week?', {
      params: {
        api_key: this.#API_KEY,
        page
      }
    })
  }

  getGenres(){
    return axios.get('/genre/movie/list?', {
      params: {
        api_key: this.#API_KEY,
      }
    })
    .then(({data}) => data.genres)
  }
}

export const getMovies = new FetchMovies()