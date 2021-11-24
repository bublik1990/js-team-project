import filmCardTpl from '../partials/templates/filmCardlist-tmpl.hbs';
import fetchFilms from './api-service.js'
import { toFixCardMarkup } from './markup-service.js'

const galleryRef = document.querySelector('.film-gallery');
const API = new fetchFilms;

export function clearGalleryMarkup() {
    galleryRef.innerHTML = '';
}

export async function appendPopularFilmsMarkup() {
    const films = await API.getPopularFilms();
    galleryRef.insertAdjacentHTML('beforeend', filmCardTpl(films));
    toFixCardMarkup();
}

export async function onSearch(e) {
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.toLowerCase().trim();

    if (!searchQuery) {
        // ----- Ошибка, если запрос пустой
        clearGalleryMarkup();
        return;
    }

    API.resetPage();
    API.query = searchQuery;
    const filmsCollection = await API.getSearchFilms();
    clearGalleryMarkup();
    appendSearchFilmsMarkup(filmsCollection);
    toFixCardMarkup();

    // ----- Пришла одна страница, спрятать пагинацию
    // if (filmsCollection.total_pages === 1) { 
    // }
}

function appendSearchFilmsMarkup(filmsCollection) {
    galleryRef.insertAdjacentHTML('beforeend', filmCardTpl(filmsCollection));
}
