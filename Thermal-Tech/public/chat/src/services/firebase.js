import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";




const firebaseConfig = {
    apiKey: "AIzaSyAbe2lpKHS0LAFrpvvbLqIMxbq3efCk0ms",
    authDomain: "thermal-tech-57a87.firebaseapp.com",
    databaseURL: "https://thermal-tech-57a87-default-rtdb.firebaseio.com",
    projectId: "thermal-tech-57a87",
    storageBucket: "thermal-tech-57a87.appspot.com",
    messagingSenderId: "469293048157",
    appId: "1:469293048157:web:89999421d381216a8d08b4"
  };

  const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };