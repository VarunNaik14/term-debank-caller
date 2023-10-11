// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection,getDocs,query,where,limit} from "firebase/firestore"; 



const firebaseConfig = {
  apiKey: "AIzaSyB0_fZliqBGGx3tz6GldceqNG6eVndoIhA",
  authDomain: "debank-data-storage.firebaseapp.com",
  projectId: "debank-data-storage",
  storageBucket: "debank-data-storage.appspot.com",
  messagingSenderId: "905145888574",
  appId: "1:905145888574:web:53f7bc782655b78783c66f",
  measurementId: "G-4BGXGJYZG3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db} 

export async function getUserWithAddress(address){

  const userRef = collection(db,'users');
  const q =  query(userRef, where('address','==',address),limit(1));
  const userDocs = await getDocs(q);

  return  userDocs.docs[0].data();
}

export async function getSearchParams(list){
  const searchRef = collection(db,'search');
  const q = query(searchRef,where('filled','==',true),limit(1));
  const searchDocs = await getDocs(q);

  return searchDocs.docs[0].data()[list];
}
