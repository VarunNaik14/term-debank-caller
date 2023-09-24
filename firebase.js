// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {getFirestore, collection, addDoc, doc,setDoc} from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB0_fZliqBGGx3tz6GldceqNG6eVndoIhA",
  authDomain: "debank-data-storage.firebaseapp.com",
  projectId: "debank-data-storage",
  storageBucket: "debank-data-storage.appspot.com",
  messagingSenderId: "905145888574",
  appId: "1:905145888574:web:53f7bc782655b78783c66f",
  measurementId: "G-4BGXGJYZG3"
};

var app;
var db;

const initFirebase = function(){

    app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    return db;

}



try {
  const addy = "0xd275e5cb559d6dc236a5f8002a5f0b4c8e610701";
  
  const docRef = await setDoc(doc(db,"Users",addy),{address: addy});
  //const protocolCollection = await collection(db,"users",addy,"protocols");
  const protocolDocRef = await setDoc(doc(db,"Users",...[addy,"protocols","Uniswap"]),{detailType:'Lending'});
  console.log("Success!");
} catch (e) {
  console.error("Error adding document: ", e);
}

export {initFirebase}