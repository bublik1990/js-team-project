// ЦЕ ТЕСТОВИЙ СКРИПТ ДЛЯ ПЕРЕВІРКИ -
// ПРАВИЛЬНОСТІ РОБОТИ ШАБЛОНІВ
// Feel free to DELETE it any time u want
// ДЛЯ ТЕСТУ - РОЗКОМЕНТУЙТЕ НАСТУПНУ ФУНКЦІЮ

// fetchFilms();

import filmCard from '../partials/templates/filmCard-tmpl.hbs';
import filmCards from '../partials/templates/filmCardlist-tmpl.hbs';
import noRatingFilmCards from '../partials/templates/nrFilmCardlist-tmpl.hbs';
import { toFixCardMarkup, OLEH_API_KEY } from './markup-service';

const body = document.querySelector('body');

function fetchFilms() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${OLEH_API_KEY}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
      createMarkup(data);
    });
}
function createMarkup(data) {
  const customContainer = document.createElement('div');
  customContainer.classList.add('custom-container');
  body.appendChild(customContainer);

  const markup = filmCards(data);
  customContainer.innerHTML = markup;
  toFixCardMarkup();
}
