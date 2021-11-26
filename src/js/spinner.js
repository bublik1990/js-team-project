import spinner from '../partials/templates/spinner-tmpl.hbs';

export function spinnerShow(container) {
  container.innerHTML = spinner();
  const spinnerRef = document.querySelector('.spinner');
  spinnerRef.classList.add('show');
}
export function spinnerHide() {
  const spinnerWrapRef = document.querySelector('.spinner-wrap');
  spinnerWrapRef.remove();
}

export function modalSpinnerShow(container) {
  container.innerHTML = spinner();
  const spinnerRef = document.querySelector('.spinner');
  const spinnerWrapRef = document.querySelector('.spinner-wrap');
  spinnerWrapRef.classList.add('modal');
  spinnerRef.classList.add('show');
}
