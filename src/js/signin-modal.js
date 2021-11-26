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
  };

  refs.openSignInModalBtn.forEach(el => el.addEventListener('click', toggleModal));
  refs.closeSignInModalBtn.forEach(el => el.addEventListener('click', toggleModal));

  function toggleModal() {
    refs.signinModal.classList.toggle('is-hidden');
  }