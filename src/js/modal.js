import modalCardtpl from '../partials/templates/modalCard.hbs';
//import filmCardTpl from '../partials/templates/nrfilmCardlist-tmpl.hbs';

const openModal = document.querySelector('.film-backdrop');
const openFilmCard = document.querySelector('.film-gallery');
const closeButtonModal = document.querySelector('.modal__closebtn');
const closeModalBackdrop = document.querySelector('.film-backdrop');
const filmContainer = document.querySelector('.film-container');

openFilmCard.addEventListener('click', onFilmCardClick);
closeButtonModal.addEventListener('click', onCloseModal);
closeModalBackdrop.addEventListener('click', onBackdropClick);

function onFilmCardClick(evt) {
  let element = evt.target;
  let targetElement = element.closest('.film-card');
  let targetId = targetElement.dataset.id;
  openModal.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  fetchTargetFilm(targetId);
}

function fetchTargetFilm(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=f13d574bf8d052eda50f9ad2f6a4d7c7&language=en-US&page=1`,
  )
    .then(response => response.json())
    .then(data => {
      createModal(data);
    });
}

function createModal(film) {
  const markup = modalCardtpl(film);
  filmContainer.innerHTML = markup;
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  openModal.classList.add('is-hidden');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
