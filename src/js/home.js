import filmCardTpl from '../partials/templates/filmCardlist-tmpl.hbs';
import fetchFilms from './api-service.js';
import { toFixCardMarkup } from './markup-service.js';
import { spinnerShow, spinnerHide } from './spinner'
const API = new fetchFilms();

const galleryRef = document.querySelector('.film-gallery');
const searchFormRef = document.querySelector('.header__form');
const headerHomeBox = document.querySelector('.header__main');
const headerHomeBtn = document.querySelectorAll('.header__item.home')
const headerLibraryBox = document.querySelector('.header__library');
const headerLibraryBtn =document.querySelectorAll('.header__item.library')


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
    return;
  }

  API.resetPage();
  API.query = searchQuery;
  clearGalleryMarkup();
  spinnerShow()
  const filmsCollection = await API.getSearchFilms();
  appendSearchFilmsMarkup(filmsCollection);
  toFixCardMarkup();

  // ----- Пришла одна страница, спрятать пагинацию
  // if (filmsCollection.total_pages === 1) {
  // }
}

// ----- Заполняет разметку фильмами из поиска
function appendSearchFilmsMarkup(filmsCollection) {
  galleryRef.innerHTML = filmCardTpl(filmsCollection);
}

// ----- Слушатель на кнопке поиска
searchFormRef.addEventListener('submit', (e) => {
    e.preventDefault();
    onSearch(e);
})

// ----- Слушатель на кнопке Home
for (let i = 0; i < headerHomeBtn.length; i++) {
  headerHomeBtn[i].addEventListener('click', () => {
    headerLibraryBox.classList.add('is-inactive');
    headerHomeBox.classList.remove('is-inactive');
    clearGalleryMarkup();
    appendPopularFilmsMarkup();
  })
}

// ----- Слушатель на кнопке Library
for (let i = 0; i < headerLibraryBtn.length; i++) {
  headerLibraryBtn[i].addEventListener('click', () => {
    headerHomeBox.classList.add('is-inactive');
    headerLibraryBox.classList.remove('is-inactive');
    clearGalleryMarkup();
  })
}