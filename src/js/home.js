import filmCardTpl from '../partials/templates/filmCardlist-tmpl.hbs';
const ANATOLII_API_KEY = '6ab460452e9d6fb8f59cab399bd5ef0f';
const homeFilmsListRef = document.querySelector('.home__filmslist');

export function getPopularFilms() {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${ANATOLII_API_KEY}`)
        .then(respons => respons.json())
        .then(films => {
            appendHomeMarkup(films);
        })
        .catch(error => console.log(error))
}

function appendHomeMarkup(films) {
    homeFilmsListRef.insertAdjacentHTML('beforeend', filmCardTpl(films));
}

export function clearHomeMarkup() {
    homeFilmsListRef.innerHTML = '';
}