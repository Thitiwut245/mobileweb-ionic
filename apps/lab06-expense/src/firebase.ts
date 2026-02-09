// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAz9LlzfOO9Iu1I8Lm9QHUsgHVHln2EIio",
    authDomain: "lab06-22a02.firebaseapp.com",
    projectId: "lab06-22a02",
    storageBucket: "lab06-22a02.firebasestorage.app",
    messagingSenderId: "124533132196",
    appId: "1:124533132196:web:66c0416df31c465540cf31",
    measurementId: "G-E6E1V0WFYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);