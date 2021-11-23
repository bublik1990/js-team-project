import { appendPopularFilmsMarkup, onSearch, clearGalleryMarkup } from './home.js'
import { toFixCardMarkup } from './markup-service'

// ----- Сылка на форму поиска
// const inputRef = document.querySelector('.search-form');

// ----- Слушатель, повесить на кнопку поиска
// inputRef.addEventListener('submit', (e) => {
//     e.preventDefault();
//     onSearch(e);
// })


// ----- Функция заполняет галерею популярными фильмами (стартовая страница)
appendPopularFilmsMarkup();


// ----- Функция очищает галерею
// clearGalleryMarkup();


toFixCardMarkup();