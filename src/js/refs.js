export default () => {
    return {
        API_URL: 'https://api.themoviedb.org/3',

        // --- firebase.js
        signinModal: document.querySelector('[data-signin-modal]'),
        signInButton: document.querySelectorAll('[data-signin-open]'),
        // signOutButton: document.querySelector('.header__signout'),
        signForm: document.querySelector('#signin'),
        signFormEmail: document.querySelector('#sign-email'),
        signFormPassword: document.querySelector('#sign-password'),
        signFormButton: document.querySelector('#sign-button'),
        registrationForm: document.querySelector('#registration'),
        registFormEmail: document.querySelector('#regist-email'),
        registFormPassword: document.querySelector('#regist-password'),
        registRepeatFormPassword: document.querySelector('#registRepeat-password'),
        registFormButton: document.querySelector('#regist-button'),
        watchedButton: document.querySelector('.modal__button--watched'),
        queueButton: document.querySelector('.modal__button--queue'),
        filmId: document.querySelector('.modal__title'),
        libraryPage: document.querySelector('.header__library-page'),
        homePage: document.querySelector('.header__home-page'),
        libraryHeaderHomePageButton: document.querySelector('.header__library .header__home-page'),
        libraryPageHeader: document.querySelector('.header__library'),
        homePageHeader: document.querySelector('.header__main'),
        filmGallery: document.querySelector('.film-gallery'),
        watched: document.querySelector('.library__watched'),
        queue: document.querySelector('.library__queue'),
        body: document.querySelector('body'),

        // --- signin-modal.js
        tabs: document.querySelectorAll('.signin__choice li'),
        openSignInModalBtn: document.querySelectorAll('[data-signin-open]'),
        closeSignInModalBtn: document.querySelectorAll('[data-signin-close]'),
        signinModal: document.querySelector('[data-signin-modal]'),
        signinModalBackdrop: document.querySelector('.signin-backdrop'),
        signoutYesBtn: document.querySelector('.signout__yes'),
        signoutNoBtn: document.querySelector('.signout__no'),
        signInform: document.querySelector('#signin'),
        registrationForm: document.querySelector('#registration'),
        signInBlock: document.querySelector('.signin__wrap'),
        signOutBlock: document.querySelector('.signout__wrap'),

        // --- team-modal.js
        openTeamModalLink: document.querySelector('.footer__content-link'),
        closeTeamModalBtn: document.querySelector('.js-team-modal-close'),
        teamModal: document.querySelector('.js-team-backdrop'),
    }
}