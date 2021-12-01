import { appendPopularFilmsMarkup, clearGalleryMarkup } from './home.js'
import { spinnerShow } from './spinner';
import getRefs from './refs'
const refs = getRefs();

spinnerShow(refs.filmGallery);

// ----- Функция заполняет галерею популярными фильмами (стартовая страница)
appendPopularFilmsMarkup();
