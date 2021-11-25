import { appendPopularFilmsMarkup, onSearch, clearGalleryMarkup } from './home.js'
import { spinnerShow } from './spinner';

spinnerShow();
// const searchFormRef = document.querySelector('#seach-form');


// searchFormRef.addEventListener('submit', (e) => {
//     e.preventDefault();
//     onSearch(e);
// })


// ----- Функция заполняет галерею популярными фильмами (стартовая страница)
appendPopularFilmsMarkup();


// ----- Функция очищает галерею
// clearGalleryMarkup();
