import { appendPopularFilmsMarkup, clearGalleryMarkup } from './home.js'
import { spinnerShow } from './spinner';


const galleryRef = document.querySelector('.film-gallery');
spinnerShow(galleryRef);

// ----- Функция заполняет галерею популярными фильмами (стартовая страница)
appendPopularFilmsMarkup();


// ----- Функция очищает галерею
// clearGalleryMarkup();

