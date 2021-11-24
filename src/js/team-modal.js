const openTeamModalLink = document.querySelector('.footer__content-link');
const closeTeamModalBtn = document.querySelector('.js-team-modal-close');
const teamModal = document.querySelector('.js-team-backdrop');

openTeamModalLink.addEventListener('click', onOpenTeamModal);
closeTeamModalBtn.addEventListener('click', onCloseTeamModal);

function onOpenTeamModal(e) {
  e.preventDefault();
  teamModal.classList.remove('team-backdrop--is-hidden');
  window.addEventListener('keydown', onEscBtnPress);
  teamModal.addEventListener('click', onTeamBackdropClick);
  if (!e.target.classList.contains('team-modal')) {
    return;
  }
}

function onCloseTeamModal(e) {
  window.removeEventListener('keydown', onEscBtnPress);
  teamModal.removeEventListener('click', onTeamBackdropClick);
  teamModal.classList.add('team-backdrop--is-hidden');
}

function onTeamBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseTeamModal();
  }
}

function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    onCloseTeamModal();
  }
}
