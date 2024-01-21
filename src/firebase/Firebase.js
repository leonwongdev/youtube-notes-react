// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "notes-e51ef.firebaseapp.com",
  projectId: "notes-e51ef",
  storageBucket: "notes-e51ef.appspot.com",
  messagingSenderId: "433107918692",
  appId: "1:433107918692:web:d9575b0e90fe640d61a471",
  measurementId: "G-CR32GCWXP5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
