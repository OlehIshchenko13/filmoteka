import FetchMovies from "./getFetch";

const moviesListEl = document.querySelector('.movies-list')

let list;
let i = 0;

const getMovies = new FetchMovies()

getMovies.getTrendingMovies()
.then(({data})=> data.results.reduce((acc, movie) => {
    const {poster_path: poster, title, release_date, genre_ids } = movie;
    genresList(genre_ids)
    return acc +
    `<li class="movie">
      <div class="poster-wrapper">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${poster}" alt="${title}" />
      </div>
      <div class="movie-meta">
        <h2 class="movie-title">${textLength(title)}</h2>
        <p class="movie-genre"><span class="genres"></span> | ${parseInt(release_date)}</p>
      </div>
    </li>`
  }, '')
)
.then(template => moviesListEl.innerHTML = template)
.then(() => list = document.querySelectorAll('.genres'))

function genresList(idArr) {
  return getMovies.getGenres()
  .then(genres => {
    return genres.filter(genre => idArr.includes(genre.id))
  })
  .then(genresFiltered => genresFiltered.map(({name}) => `${name}`).join(', '))
  .then(genresArr => {
    list[i].innerHTML = textLength(genresArr);
    i++
  })
}

function textLength(text){
  if(text.length > 35){
    const str = [...text]
    str.length = 33
    return str.join('') + '...'
  }
  return text
}