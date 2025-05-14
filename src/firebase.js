// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-iMwAksS8qGRmxH2bH6HvgnU0_-TGbPI",
  authDomain: "parquemet-conecta.firebaseapp.com",
  databaseURL: "https://parquemet-conecta-default-rtdb.firebaseio.com",
  projectId: "parquemet-conecta",
  storageBucket: "parquemet-conecta.firebasestorage.app",
  messagingSenderId: "518499261246",
  appId: "1:518499261246:web:878312218fed7de079ea6f",
  measurementId: "G-31T46L2FG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
