export const OLEH_API_KEY = 'f13d574bf8d052eda50f9ad2f6a4d7c7';

export function toFixCardMarkup() {
  movieGenreCompiler();
  tvGenreCompiler();
  filterYear();
  makeSmallFilmname();
  makeDoubleDigitRating();
}

function movieGenreCompiler() {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${OLEH_API_KEY}&language=en-US`)
    .then(response => response.json())
    .then(data => {
      let genresList = document.querySelectorAll('.film-card__list-item');
      genresList.forEach(genre => {
        data.genres.forEach(elem => {
          if (elem.id == genre.textContent) {
            genre.innerHTML = elem.name;
          }
        });
        if (genre.textContent === 'Science Fiction') {
          genre.innerHTML = 'Sci-Fi'
        }
      });
    });
}
function tvGenreCompiler() {
  fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${OLEH_API_KEY}&language=en-US`)
    .then(response => response.json())
    .then(data => {
      let genresList = document.querySelectorAll('.film-card__list-item');
      genresList.forEach(genre => {
        data.genres.forEach(elem => {
          if (elem.id == genre.textContent) {
            genre.innerHTML = elem.name;
          }
        });
        if (
          genre.textContent === 'Action & Adventure' ||
          genre.textContent === 'Sci-Fi & Fantasy'
        ) {
          genre.innerHTML = genre.textContent.slice(0, 6);
        }
      });
    });
}
function filterYear() {
  let relaseDate = document.querySelectorAll('.film-card__year');
  relaseDate.forEach(el => {
    let relaseYear = el.textContent.slice(0, 4);
    el.innerHTML = relaseYear;
  });
}
function makeSmallFilmname() {
    let filmNames = document.querySelectorAll('.film-card__header');
    filmNames.forEach(filmName => {
      if (filmName.textContent.length > 30) {
        filmName.style.fontSize = '11px';
        filmName.style.letterSpacing = '0.07em';
      }
    });
}
function makeDoubleDigitRating() {
     let filmRatings = document.querySelectorAll('.film-card__rating');
     filmRatings.forEach(filmRating => {
       if (filmRating.textContent.length == 1) {
         filmRating.innerHTML = filmRating.textContent + '.0';
       }
     });
}

