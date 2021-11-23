import modalCardtpl from '../partials/templates/modalCard.hbs';
//import filmCardTpl from '../partials/templates/nrfilmCardlist-tmpl.hbs';


const openModal = document.querySelector('.backdrop');
const openFilmCard = document.querySelector('.film-card');
const closeButtonModal = document.querySelector('.modal__closebtn');
const closeModalBackdrop = document.querySelector('.backdrop');

openFilmCard.addEventListener('click', onFilmCardClick);
closeButtonModal.addEventListener('click', onCloseModal);
closeModalBackdrop.addEventListener('click', onBackdropClick);

function onFilmCardClick(evt){
    window.addEventListener('keydown', onEscKeyPress);
    createModal();
    openModal.classList.remove('is-hidden');
}

function createModal(film) {
    const markup = modalCardtpl(film);
    openModal.innerHTML = markup;
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
