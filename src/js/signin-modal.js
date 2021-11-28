import {isUserAuthorised, signOutOfSystem, clearFilmGallery} from './firebase.js';

const tabs = document.querySelectorAll('.signin__choice li');
tabs.forEach(tab => tab.addEventListener('click', makeTabActive));

function makeTabActive(event) {
    const tab = event.currentTarget;
    
    if (tab.classList.contains('active-tab')) return;

    const currentTab = document.querySelector('.active-tab');
    if(currentTab) currentTab.classList.remove('active-tab');

    tab.classList.add('active-tab');
    const currentTabName = currentTab.getAttribute('data-tab');
    const currentTabContent = document.querySelector(`#${currentTabName}`);
    currentTabContent.classList.add('visually-hidden');

    const tabName = tab.dataset.tab;
    const tabContent = document.querySelector(`#${tabName}`);
    tabContent.classList.remove('visually-hidden');

}

const refs = {
    openSignInModalBtn: document.querySelectorAll('[data-signin-open]'),
    closeSignInModalBtn: document.querySelectorAll('[data-signin-close]'),
    signinModal: document.querySelector('[data-signin-modal]'),
    signinModalBackdrop: document.querySelector('.signin-backdrop'),
    signoutYesBtn: document.querySelector('.signout__yes'),
    signoutNoBtn: document.querySelector('.signout__no'),
  };

  refs.openSignInModalBtn.forEach(el => el.addEventListener('click', toggleModal));
  refs.closeSignInModalBtn.forEach(el => el.addEventListener('click', toggleModal));
  refs.signinModalBackdrop.addEventListener('click', onBackdropClick);
  refs.signoutYesBtn.addEventListener('click', logOut);
  refs.signoutNoBtn.addEventListener('click', toggleModal);

function toggleModal() {
  const isUser = isUserAuthorised();

  if (isUser) {
    showSignoutPanel();
  } else {
    showSigninPanel();
  }
  refs.signinModal.classList.toggle('is-hidden');
  if (refs.signinModal.classList.contains('is-hidden')) resetForms();

}

// Закрытие окна регистрации по клику вне окна
function onBackdropClick(el) {
  if (el.currentTarget === el.target) {
    refs.signinModal.classList.add('is-hidden');
    resetForms();
  }
}

// Закрытие окна регистрации кнопкой Esc
function onEscClick(el) {
    if (el.key === 'Escape') {
      refs.signinModal.classList.add('is-hidden');
      resetForms();
    }
  };
  window.addEventListener('keyup', onEscClick);

function resetForms() {
  document.querySelector('#signin').reset();
  document.querySelector('#registration').reset()
}

function showSigninPanel() {
  document.querySelector('.signin__wrap').classList.remove('is-hidden');
  document.querySelector('.signout__wrap').classList.add('is-hidden');
}

function showSignoutPanel() {
  document.querySelector('.signin__wrap').classList.add('is-hidden');
  document.querySelector('.signout__wrap').classList.remove('is-hidden');
}

function logOut() {
  signOutOfSystem();
  setTimeout(() => {
    toggleModal();
    clearFilmGallery();
  }, 1000);
  
  

}