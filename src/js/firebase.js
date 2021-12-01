import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const _ = require('lodash');
const { notice, error } = require('@pnotify/core');

import template from '../partials/templates/filmCardlist-tmpl.hbs';
import { toFixCardMarkup } from './markup-service';
import { spinnerShow, spinnerHide } from './spinner';
import { appendPopularFilmsMarkup, hiddenErrorMes } from './home';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import getRefs from './refs'
const refs = getRefs();

const firebaseConfig = {
  apiKey: 'AIzaSyBvTCDF7Yn__K0ODa3ZNhNXrSGOBWBdHcQ',
  authDomain: 'my-first-project-d8811.firebaseapp.com',
  databaseURL:
    'https://my-first-project-d8811-default-rtdb.europe-west1.firebasedatabase.app/?key=AIzaSyBvTCDF7Yn__K0ODa3ZNhNXrSGOBWBdHcQ',
  projectId: 'my-first-project-d8811',
  storageBucket: 'my-first-project-d8811.appspot.com',
  messagingSenderId: '900290931518',
  appId: '1:900290931518:web:0a98aee500307c1e731a6f',
  measurementId: 'G-ZTRB269PE3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();
const dataCreate = {
  watched: {},
  queue: {},
};

refs.signForm.addEventListener('submit', onSubmitSignin);
refs.registrationForm.addEventListener('submit', onSubmitRegist);
refs.watchedButton.addEventListener('click', onClickWatched);
refs.queueButton.addEventListener('click', onClickQueue);

refs.libraryPage.addEventListener('click', loadLibraryPage);
refs.watched.addEventListener('click', showWatchedData);
refs.queue.addEventListener('click', showQueueData);
refs.libraryHeaderHomePageButton.addEventListener('click', loadHomePage);

////////////////// создать пользователя///////////////////////////////////

function createUser(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      const uid = user.uid;
      writeUserData(uid, dataCreate);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

//////////////// войти в систему ///////////////////////////////////

function signIn(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {})
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

//////////// выйти из системы//////////////////////////////////

function signOutuser(auth, email) {
  signOut(auth, email)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function signOutOfSystem() {
  const user = auth.currentUser;
  signOutuser(auth, user.email);
  const fieldError = notice({
    text: 'You are logged out.',
    width: '450px',
    delay: 3500,
  });
}

///////////  наблюдателя состояния аутентификации и получите данные пользователя ///////////////

onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    get(child(dbRef, `users/${uid}/`)).then(snapshot => {
      // console.log(snapshot.val());
    });
  } else {
    // User is signed out
    // alert('войдите в систему');
    // ...
  }
});

// const analytics = getAnalytics(app);

function writeUserData(userId, ob) {
  set(ref(database, 'users/' + userId), ob);
}

function updateData(userId, ob, library, filmId) {
  update(ref(database, 'users/' + userId + `/${library}/` + filmId), ob);
}

const dbRef = ref(database);

get(child(dbRef, `users/`)).then(snapshot => {
  // console.log(snapshot.val());
  // console.log(snapshot.toJSON());
});

/////////////////////////////////////////////////////////////////////////

function onSubmitSignin(e) {
  e.preventDefault();

  // refs.signFormEmail.classList.remove('incorrectField');
  // refs.signFormPassword.classList.remove('incorrectField');

  const email = refs.signFormEmail.value;
  const password = refs.signFormPassword.value;
  if (!email || !password) {
    const fieldError = notice({
      text: 'Some field is empty',
      width: '450px',
      delay: 3500,
    });
    return;
  }
  signIn(auth, email, password);
  refs.signinModal.classList.toggle('is-hidden');
  const succesLogin = notice({
    text: 'You have log in!',
    width: '450px',
    delay: 3500,
  });
}

function onSubmitRegist(e) {
  e.preventDefault();
  const email = refs.registFormEmail.value;
  const password = refs.registFormPassword.value;
  const passwordRepeat = refs.registRepeatFormPassword.value;
  if (!email || !password || !passwordRepeat) {
    const fieldError = notice({
      text: 'Some field is empty',
      width: '450px',
      delay: 3500,
    });
    return;
  }
  if (password !== passwordRepeat) {
    const passwordError = notice({
      text: 'Passwords not match',
      width: '450px',
      delay: 3500,
    });
    return;
  }
  createUser(auth, email, password);
  refs.signinModal.classList.toggle('is-hidden');
  const succesRegistration = notice({
    text: 'You have successfully registered!',
    width: '450px',
    delay: 3500,
  });
}

function onClickWatched() {
  const modalTitle = document.querySelector('.modal__title');
  const filmId = modalTitle.dataset.id;
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;

    fetch(
      `${refs.API_URL}/movie/${filmId}?api_key=f13d574bf8d052eda50f9ad2f6a4d7c7&language=en-US&page=1`,
    )
      .then(response => response.json())
      .then(data => updateData(uid, data, 'watched', filmId))
      .then(data => {
        const passwordError = notice({
          text: 'Film is added to watched',
          width: '450px',
          delay: 3500,
        });
      });
  } else {
    notice({
      text: 'Login or register',
      width: '300px',
      delay: 3500,
    });
  }
}

function onClickQueue() {
  const modalTitle = document.querySelector('.modal__title');
  const filmId = modalTitle.dataset.id;
  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;
    fetch(
      `${refs.API_URL}/movie/${filmId}?api_key=f13d574bf8d052eda50f9ad2f6a4d7c7&language=en-US&page=1`,
    )
      .then(response => response.json())
      .then(data => updateData(uid, data, 'queue', filmId))
      .then(data => {
        const passwordError = notice({
          text: 'Film is added to queue',
          width: '450px',
          delay: 3500,
        });
      });
  } else {
    notice({
      text: 'Login or register',
      width: '300px',
      delay: 3500,
    });
  }
}

// signIn(auth, 'nana@email.com', 'mypassword');
// signOutuser(auth, 'nana@email.com', 'mypassword');
// signOutuser(auth, 'ju@gmail.com');

function loadLibraryPage() {
  // switchSignInButton()
  showLibraryHeader();
  showWatchedData();
}
function loadHomePage() {
  showHomeHeader();
  hiddenErrorMes();
  spinnerShow(refs.filmGallery);
  appendPopularFilmsMarkup();
}

function showWatchedData() {
  refs.queue.classList.remove('library__btn--active');
  refs.watched.classList.add('library__btn--active');
  clearFilmGallery();

  const user = isUserAuthorised();
  // console.log('user', user.uid);
  if (!user) {
    console.log('User is signed out');
    refs.filmGallery.insertAdjacentHTML('afterbegin', addSignInMessageForWatched());
    return;
  }
  showWatched(user);
}

function showQueueData() {
  refs.watched.classList.remove('library__btn--active');
  refs.queue.classList.add('library__btn--active');
  clearFilmGallery();

  const user = isUserAuthorised();
  if (!user) {
    console.log('User is signed out');
    refs.filmGallery.insertAdjacentHTML('afterbegin', addSignInMessageForQueue());
    return;
  }
  showQueue(user);
}

function showLibraryHeader() {
  refs.homePageHeader.classList.add('is-inactive');
  refs.libraryPageHeader.classList.remove('is-inactive');
}

function showHomeHeader() {
  refs.libraryPageHeader.classList.add('is-inactive');
  refs.homePageHeader.classList.remove('is-inactive');
}

function isUserAuthorised() {
  return auth.currentUser;
}

function showWatched(user) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${user.uid}/watched/`))
    .then(snapshot => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        clearFilmGallery();
        spinnerShow(refs.filmGallery);
        addMarkupGallery(snapshot.val());
        spinnerHide();
      } else {
        // console.log('No data available');
        const watchedNotice = notice({
          text: "You haven't yet any film in watched",
          width: '450px',
          delay: 3500,
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function showQueue(user) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${user.uid}/queue/`))
    .then(snapshot => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        clearFilmGallery();
        spinnerShow(refs.filmGallery);

        addMarkupGallery(snapshot.val());
        spinnerHide();
      } else {
        // console.log('No data available');
        const queuedNotice = notice({
          text: "You haven't yet any film in queue",
          width: '450px',
          delay: 3500,
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function clearFilmGallery() {
  refs.filmGallery.innerHTML = '';
}

function addMarkupGallery(data) {
  const dataObj = { results: data };
  refs.filmGallery.insertAdjacentHTML('beforeend', template(dataObj));
  toFixCardMarkup();
}

function addSignInMessageForWatched() {
  return '<li class="login__notification"><p>You should first log in to see watched film list.</p><li>';
}

function addSignInMessageForQueue() {
  return '<li class="login__notification"><p>You should first log in to see films in queue.</p><li>';
}

export { isUserAuthorised, signOutOfSystem, clearFilmGallery };
