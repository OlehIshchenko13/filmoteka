import {getMovies} from "./getFetch";
import { instance } from "./pagination";

const moviesListEl = document.querySelector('.movies-list')

let list;
let i = 0;

getMovies.getTrendingMovies()
.then(renderMovies)
.then((data) => instance.reset(data.total_results))
.catch(err => console.log(err))
// .then(() => list = document.querySelectorAll('.genres'))

// function genresList(idArr) {
//   return getMovies.getGenres()
//   .then(genres => {
//     return genres.filter(genre => idArr.includes(genre.id))
//   })
//   .then(genresFiltered => genresFiltered.map(({name}) => `${name}`).join(', '))
//   .then(genresArr => {
//     list[i].innerHTML = textLength(genresArr);
//     i++
//   })
// }

function textLength(text){
  if(text.length > 35){
    const str = [...text]
    str.length = 31
    return str.join('') + '...'
  }
  return text
}

export async function renderMovies({data}){
  const template = await data.results.reduce((acc, movie) => {
    const {poster_path: poster, title, release_date, genre_ids, id } = movie;
    // genresList(genre_ids)
    return acc +
    `<li class="movie" data-movieId="${id}">
      <div class="poster-wrapper">
        <img class="movie-poster" src="" alt="${title}" /> //https://image.tmdb.org/t/p/w500/${poster}
      </div>
      <div class="movie-meta">
        <h2 class="movie-title">${textLength(title)}</h2>
        <p class="movie-genre"><span class="genres"></span> | ${parseInt(release_date)}</p>
      </div>
    </li>`
}, '')
  moviesListEl.innerHTML = template
  return data
}