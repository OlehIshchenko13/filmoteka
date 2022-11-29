import axios from "axios"
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export default class FetchMovies {
  #API_KEY = "dc26557b281e26d9f878e92da4703242"

  getTrendingMovies(){
    return axios.get('/trending/movie/week?', {
      params: {
        api_key: this.#API_KEY,
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