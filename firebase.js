// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {getFirestore, collection, addDoc, doc,setDoc} from "firebase/firestore"; 


var app, db;

const firebaseConfig = {
  apiKey: "AIzaSyB0_fZliqBGGx3tz6GldceqNG6eVndoIhA",
  authDomain: "debank-data-storage.firebaseapp.com",
  projectId: "debank-data-storage",
  storageBucket: "debank-data-storage.appspot.com",
  messagingSenderId: "905145888574",
  appId: "1:905145888574:web:53f7bc782655b78783c66f",
  measurementId: "G-4BGXGJYZG3"
};

const initFirebase = async function(){

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  return db;
  
}

export {initFirebase}