// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGIBsu39aAtLju5uKr0SwY0RJ5HHNbX1Q",
    authDomain: "note-app-b266e.firebaseapp.com",
    projectId: "note-app-b266e",
    storageBucket: "note-app-b266e.appspot.com",
    messagingSenderId: "413428749958",
    appId: "1:413428749958:web:b7db486f09cbe780e12307",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
