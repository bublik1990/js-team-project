import getRefs from './refs'
const refs = getRefs();


refs.openTeamModalLink.addEventListener('click', onOpenTeamModal);
refs.closeTeamModalBtn.addEventListener('click', onCloseTeamModal);

function onOpenTeamModal(e) {
  e.preventDefault();
  refs.teamModal.classList.remove('team-backdrop--is-hidden');
  window.addEventListener('keydown', onEscBtnPress);
  refs.teamModal.addEventListener('click', onTeamBackdropClick);
  if (!e.target.classList.contains('team-modal')) {
    return;
  }
}

function onCloseTeamModal(e) {
  window.removeEventListener('keydown', onEscBtnPress);
  refs.teamModal.removeEventListener('click', onTeamBackdropClick);
  refs.teamModal.classList.add('team-backdrop--is-hidden');
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
