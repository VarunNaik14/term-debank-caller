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

export async function getSearchParams(){

  const searchRef = collection(db,'search');
  const q = query(searchRef,where('filled','==',true),limit(1));
  const searchDocs = await getDocs(q);

  return searchDocs.docs[0].data();
}

export async function filterUsersBySearchParams(searchParams){

  const map = ['protocols_used','total_supplied_tokens','total_borrowed_tokens'];
  const userRef = collection(db,'users');
  let q = query(userRef);
  let filteredusers = [];

  let index = 0;
  for(var parameter of searchParams){
    if(index === 0 && parameter.length != 0){

      q = query(q,where(map[0],'array-contains',searchParams[index]));
    }

    else{
      
      if(parameter.length!= 0){
         q = query(q,where(`${map[index]}.${parameter}.symbol`,'in',parameter));
      }
    }

    index++;
  }

  const userDocs = (await getDocs(q)).docs;
  for(var user of userDocs){
    filteredusers.push(user.data());
  }

  return filteredusers;

}