// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAporv4SwXz2nPEZfbVUOQUvZATegC59gc",
  authDomain: "quizapp-747d4.firebaseapp.com",
  projectId: "quizapp-747d4",
  storageBucket: "quizapp-747d4.firebasestorage.app",
  messagingSenderId: "618087630067",
  appId: "1:618087630067:web:126c592e27ae6ae112a386",
  measurementId: "G-PPZXB6XXDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);