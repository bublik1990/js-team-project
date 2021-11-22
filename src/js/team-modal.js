const openModalLink = document.querySelector('.footer__content-link');
const closeModalBtn = document.querySelector('.js-modal-close');
const modal = document.querySelector('.js-backdrop');

openModalLink.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', onCloseModal);

function onOpenModal(e) {
  e.preventDefault();
  modal.classList.remove('backdrop--is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  modal.addEventListener('click', onBackdropClick);
  if (!e.target.classList.contains('team-modal')) {
    return;
  }
}

function onCloseModal(e) {
  window.removeEventListener('keydown', onEscKeyPress);
  modal.removeEventListener('click', onBackdropClick);
  modal.classList.add('backdrop--is-hidden');
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
