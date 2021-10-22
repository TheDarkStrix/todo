// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYL4LzL-lz9cNAfeeuHLlOaMFNBC3Bi2w",
  authDomain: "todo-internship-d67ac.firebaseapp.com",
  databaseURL: "https://todo-internship-d67ac-default-rtdb.firebaseio.com",
  projectId: "todo-internship-d67ac",
  storageBucket: "todo-internship-d67ac.appspot.com",
  messagingSenderId: "127181887362",
  appId: "1:127181887362:web:1dd960f5ee7cc24abc219b",
  measurementId: "G-5XVVJQFYL6",
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const db = getDatabase(app);

export { app, db };
