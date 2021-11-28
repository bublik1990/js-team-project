import filmCardTpl from '../partials/templates/filmCardlist-tmpl.hbs';
import fetchFilms from './api-service.js';
import { toFixCardMarkup } from './markup-service.js';
import { spinnerShow } from './spinner'
const API = new fetchFilms();

const galleryRef = document.querySelector('.film-gallery');
const searchFormRef = document.querySelector('.header__form');
const searchErrorMes = document.querySelector('.header__search-error');


export function clearGalleryMarkup() {
  galleryRef.innerHTML = '';
}

export async function appendPopularFilmsMarkup() {
  const films = await API.getPopularFilms();
  galleryRef.innerHTML = filmCardTpl(films);
  toFixCardMarkup();
}

async function onSearch(e) {
  const form = e.currentTarget;
  const searchQuery = form.elements.query.value.toLowerCase().trim();


  if (!searchQuery) {
    // ----- Ошибка, если запрос пустой
    searchErrorMes.classList.remove('is-hidden');
    return;
  }

  API.resetPage();
  API.query = searchQuery;
  clearGalleryMarkup();
  hiddenErrorMes();
  spinnerShow(galleryRef);
  const filmsCollection = await API.getSearchFilms();
  appendSearchFilmsMarkup(filmsCollection);
  toFixCardMarkup();

  searchErrorMes.classList.add('is-hidden');

  // ----- Пришла одна страница, спрятать пагинацию
  // if (filmsCollection.total_pages === 1) {
  // }
}

// ----- Заполняет разметку фильмами из поиска
function appendSearchFilmsMarkup(filmsCollection) {
  galleryRef.innerHTML = filmCardTpl(filmsCollection);
}

export function hiddenErrorMes() {
  searchErrorMes.classList.add('is-hidden');
}

// ----- Слушатель на кнопке поиска
searchFormRef.addEventListener('submit', (e) => {
    e.preventDefault();
    onSearch(e);
})
