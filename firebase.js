// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {getFirestore, collection, addDoc } from "firebase/firestore"; 
// Required for side-effects
//import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0_fZliqBGGx3tz6GldceqNG6eVndoIhA",
  authDomain: "debank-data-storage.firebaseapp.com",
  projectId: "debank-data-storage",
  storageBucket: "debank-data-storage.appspot.com",
  messagingSenderId: "905145888574",
  appId: "1:905145888574:web:53f7bc782655b78783c66f",
  measurementId: "G-4BGXGJYZG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}