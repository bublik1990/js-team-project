import filmCardTpl from '../partials/templates/filmCardlist-tmpl.hbs';
import filmCardOnSearchTpl from '../partials/templates/filmCardlist-onSearch-tmpl.hbs';
import fetchFilms from './api-service.js';
import { toFixCardMarkup } from './markup-service.js';
import { spinnerShow } from './spinner';
import { createPagination } from './pagination.js';
import { addListenerToPag } from './pagination.js';

const API = new fetchFilms();


const galleryRef = document.querySelector('.film-gallery');
const searchFormRef = document.querySelector('.header__form');
const searchErrorMes = document.querySelector('.header__search-error');
const pagContainer = document.querySelector('.pagination__container')

export function clearGalleryMarkup() {
  galleryRef.innerHTML = '';
}

export async function appendPopularFilmsMarkup() {
  const films = await API.getPopularFilms();
  galleryRef.innerHTML = filmCardTpl(films);
  toFixCardMarkup();
}

let arrayOfMovies = [];

async function onSearch(e) {
  const form = e.currentTarget;
  const searchQuery = form.elements.query.value.toLowerCase().trim();


  if (!searchQuery) {
    // ----- Ошибка, если запрос пустой
    searchErrorMes.classList.remove('is-hidden');
    return;
  }
  //удаляет старый масив фильмов если пользователь ищет новые
  if (arrayOfMovies.length != 0) {
    arrayOfMovies = [];
  }

  await collectFilms(form, searchQuery)

}

async function collectFilms(form, searchQuery) {

  API.query = searchQuery;
  clearGalleryMarkup();
  hiddenErrorMes();
  spinnerShow(galleryRef);
  const filmsCollection = await API.getSearchFilms();
  //пушу колекцию 
  arrayOfMovies.push(filmsCollection.results)
  console.log(filmsCollection.results)
  appendSearchFilmsMarkup(arrayOfMovies);
  toFixCardMarkup();

  if (arrayOfMovies[API.returnPage() - 2].length !== 0) {
    await collectFilms(form, searchQuery)
    //пока функии не вернут масив без фильмов, она будет просить ещё
  } else {
    //когда функция получила все фильмы то page сбрасывется, удаляется последний пустой масив и создается разметка
    API.resetPage();
    arrayOfMovies.pop()
    createPagMrkp()
    return 
  }
}

const list = document.querySelector(".pag-ul");
function createPagMrkp() {
  list.innerHTML = createPagination(arrayOfMovies.length, 1, list);
  addListenerToPag(arrayOfMovies, arrayOfMovies.length, 1, list)
  searchErrorMes.classList.add('is-hidden');

}
// ----- Заполняет разметку фильмами из поиска
function appendSearchFilmsMarkup(arrayOfMovies) {
  galleryRef.innerHTML = filmCardOnSearchTpl(arrayOfMovies[0]);
}

export function hiddenErrorMes() {
  searchErrorMes.classList.add('is-hidden');
}

// ----- Слушатель на кнопке поиска
searchFormRef.addEventListener('submit', (e) => {
    e.preventDefault();
    onSearch(e);
})

const headerHomeBtn = document.querySelector('.header__home-page')

// ----- Слушатель на кнопке Home
for (let i = 0; i < headerHomeBtn.length; i++) {
  headerHomeBtn[i].addEventListener('click', () => {
    headerLibraryBox.classList.add('is-inactive');
    headerHomeBox.classList.remove('is-inactive');
    clearGalleryMarkup();
    spinnerShow(galleryRef);
    appendPopularFilmsMarkup();
  })
}

const headerLibraryBtn = document.querySelector('.header__library-page')

headerLibraryBtn.addEventListener('click', () => {
  list.innerHTML = ''
})

// ----- Слушатель на кнопке Library
for (let i = 0; i < headerLibraryBtn.length; i++) {
  headerLibraryBtn[i].addEventListener('click', () => {
    headerHomeBox.classList.add('is-inactive');
    headerLibraryBox.classList.remove('is-inactive');
    clearGalleryMarkup();
  })
}
