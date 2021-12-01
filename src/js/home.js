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

// function createPagination(totalPages, page, list) {
//   page = Number(page)
//   let liTag = '';
//   let active;
//   let beforePage = page - 1;
//   let afterPage = page + 1;

//   if (page > 1) { //show the next button if the page value is greater than 1
//     liTag += `<li class="prev"><svg id="prev-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
// </li>`;
//   }

//   if (page > 2) { //if page value is less than 2 then add 1 after the previous button
//     liTag += `<li class="first numb">1</li>`;
//     if (page > 3) { //if page value is greater than 3 then add this (...) after the first li or page
//       liTag += `<li class="dots">...</li>`;
//     }
//   }

//     if (page == totalPages) {
//       beforePage = beforePage - 2;
//     }
//     if (totalPages == 1) {
//       beforePage = 0;
//     }
//     if (page == totalPages - 1) {
//       beforePage = beforePage - 1;
//     }
//     if (totalPages == 2) {
//       beforePage = 1
//     }

//   // how many pages or li show after the current li
//   if (page == 1) {
//     afterPage = afterPage + 2;

//   } else if (page == 2) {

//     afterPage = afterPage + 1;
//   }
//   // else if (page == 3) {
//   //   afterPage = afterPage
//   // }

//   for (var plength = beforePage; plength <= afterPage; plength++) {

//     if (plength > totalPages) { //if plength is greater than totalPage length then continue
//       continue;
//     }
//     if (plength == 0) { //if plength is 0 than add +1 in plength value
//       plength = plength + 1;
//     }
//     if(page == plength){ //if page is equal to plength than assign active string in the active variable
//       active = "active";
//     }else{ //else leave empty to the active variable
//       active = "";
//     }
//     liTag += `<li class="numb ${active}">${plength}</li>`;
//   }
//   if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
//     if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
//       liTag += `<li class="dots">...</li>`;
//     }
//     liTag += `<li class="last numb">${totalPages}</li>`;
//   }
//   if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
//       liTag += `<li class="next"><svg id="next-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
// </li>`;
//   }
       
//   list.innerHTML = liTag; //add li tag inside ul tag
//   return liTag; //reurn the li tag
// }

// function addListenerToPag(totalPages, page, list) {
//  page = Number(page)
  
//   list.addEventListener('click', (e) => {
//   if (e.target.className == 'next') {
//     createPagination(totalPages, page += 1, list)
//     galleryRef.innerHTML = filmCardOnSearchTpl(arrayOfMovies[page]);
//     }
//   if (e.target.id == 'next-svg') {
//     createPagination(totalPages, page += 1, list)
//     galleryRef.innerHTML = filmCardOnSearchTpl(arrayOfMovies[page]);
//     }
//   if (e.target.id == 'prev-svg') {
//     createPagination(totalPages, page -= 1, list)
//     galleryRef.innerHTML = filmCardOnSearchTpl(arrayOfMovies[page]);
//     }
//   if (e.target.className == 'prev') {
//     createPagination(totalPages, page -= 1, list)
//     galleryRef.innerHTML = filmCardOnSearchTpl(arrayOfMovies[page]);
//     } 
//   if (e.target.classList.contains('numb')) {
//     createPagination(totalPages, e.target.innerHTML, list)
//     page = Number(e.target.innerHTML);
//     console.log(page);
//     galleryRef.innerHTML = filmCardOnSearchTpl(arrayOfMovies[page]);
//     }
//   })
  
// }

