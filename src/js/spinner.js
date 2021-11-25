import spinner from '../partials/templates/spinner-tmpl.hbs';

const galleryRef = document.querySelector('.film-gallery');
const filmContainer = document.querySelector('.film-container');

export function spinnerShow() {
  galleryRef.innerHTML = spinner();
  const spinnerRef = document.querySelector('.spinner');
  spinnerRef.classList.add('show');
}
export function spinnerHide() {
  const spinnerWrapRef = document.querySelector('.spinner-wrap');
  spinnerWrapRef.remove();
}

export function filmModalSpinnerShow() {
filmContainer.innerHTML = spinner();
const spinnerRef = document.querySelector('.spinner');
spinnerRef.classList.add('show');
}
