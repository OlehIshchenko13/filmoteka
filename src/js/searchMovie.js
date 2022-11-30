import { getMovies } from "./getFetch";
import { renderMovies } from "./home";
import { instance } from "./pagination";

const searchForm = document.querySelector('#search-form')

searchForm.addEventListener('submit', onSearchFormSubmit)

function onSearchFormSubmit(e){
  e.preventDefault()
  const query = e.target.query.value

  getMovies.searchMovie(query)
  .then(renderMovies)
  .then((data) => instance.reset(data.total_results))
}