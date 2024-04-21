// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIVCIfs5oJA1xa2exc37C9lGgq81Sa6lA",
  authDomain: "lista-de-compras-apa.firebaseapp.com",
  projectId: "lista-de-compras-apa",
  storageBucket: "lista-de-compras-apa.appspot.com",
  messagingSenderId: "253273581315",
  appId: "1:253273581315:web:680b93e200f08532c66b36"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const recipesCollection = collection(db, "recipes")