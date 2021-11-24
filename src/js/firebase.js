// const email = 'nana@email.com';
// const password = 'mypassword';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';

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

const analytics = getAnalytics(app);

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

const dataCreate = {
  watched: {},
  queue: {},
};

const refs = {
  signinModal: document.querySelector('[data-signin-modal]'),

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
};

const auth = getAuth();

refs.signForm.addEventListener('submit', onSubmitSignin);
refs.registrationForm.addEventListener('submit', onSubmitRegist);
refs.watchedButton.addEventListener('click', onClickWatched);
refs.queueButton.addEventListener('click', onClickQueue);

function onSubmitSignin(e) {
  e.preventDefault();
  const email = refs.signFormEmail.value;
  const password = refs.signFormPassword.value;
  signIn(auth, email, password);
  refs.signinModal.classList.toggle('is-hidden');
}

function onSubmitRegist(e) {
  e.preventDefault();
  const email = refs.registFormEmail.value;
  const password = refs.registFormPassword.value;
  const passwordRepeat = refs.registRepeatFormPassword.value;

  console.log(email, password);
  if (password === passwordRepeat) {
    createUser(auth, email, password);
    refs.signinModal.classList.toggle('is-hidden');
  } else {
    alert('проверь пароль');
  }
}

function onClickWatched() {
  const modalTitle = document.querySelector('.modal__title');
  const filmId = modalTitle.dataset.id;
  const user = auth.currentUser;
  const uid = user.uid;
  console.log(uid);
  fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=f13d574bf8d052eda50f9ad2f6a4d7c7&language=en-US&page=1`,
  )
    .then(response => response.json())
    .then(data => updateData(uid, data, 'watched', filmId));
}

function onClickQueue() {
  const modalTitle = document.querySelector('.modal__title');
  const filmId = modalTitle.dataset.id;
  const user = auth.currentUser;
  const uid = user.uid;
  console.log(uid);
  fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=f13d574bf8d052eda50f9ad2f6a4d7c7&language=en-US&page=1`,
  )
    .then(response => response.json())
    .then(data => updateData(uid, data, 'queue', filmId));
}

////////////////// создать пользователя///////////////////////////////////

function createUser(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      const uid = user.uid;
      //   console.log(uid);
      //   console.log(user);

      writeUserData(uid, dataCreate);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

//////////////// войти в систму ///////////////////////////////////

function signIn(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      //   const user = userCredential.user;
      //   const uid = user.uid;
      //   console.log(user);
      //   console.log(uid);
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

// signIn(auth, email, password);

///////////  наблюдателя состояния аутентификации и получите данные пользователя ///////////////

onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    // console.log(uid);
    // console.log(auth.currentUser);
    get(child(dbRef, `users/${uid}/`)).then(snapshot => {
      console.log(snapshot.val());
    });
    // console.log(user);
  } else {
    // User is signed out
    // alert('войдите в систему');
    // ...
  }
});

//////////// вйти из системы//////////////////////////////////

// function signOutuser(auth, email, password) {
//   signOut(auth, email, password)
//     .then(userCredential => {
//       // Signed in
//       const user = userCredential.user;
//       console.log(user);
//       // ...
//     })
//     .catch(error => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// }

// signOutuser(auth, email, password);
