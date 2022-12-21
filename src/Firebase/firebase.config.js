// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDID1WGofd4WV5H-Te5OWLHnJQHMgDQi2k",
  authDomain: "ecomerce-invation.firebaseapp.com",
  projectId: "ecomerce-invation",
  storageBucket: "ecomerce-invation.appspot.com",
  messagingSenderId: "182702477162",
  appId: "1:182702477162:web:1d0a4c9319f149e4869f13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;