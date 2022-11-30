import Pagination from 'tui-pagination';
import "tui-pagination/dist/tui-pagination.min.css"
import { getMovies } from './getFetch';
import { renderMovies } from './home';

const container = document.getElementById('tui-pagination-container');

export const options = {
  totalItems: 500,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
    disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
    moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
        '</a>'
  }
};

export const instance = new Pagination(container, options);

instance.on('beforeMove', onPaginationClick);

function onPaginationClick(e){
  if(getMovies.query){
    getMovies.searchMovie(getMovies.query, e.page)
    .then(renderMovies)
    .catch(err => console.log(err))
  }

  else {
    getMovies.getTrendingMovies(e.page)
    .then(renderMovies)
    .catch(err => console.log(err))
  }
}