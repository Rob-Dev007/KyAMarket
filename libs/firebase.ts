// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD66Gf9rDEBv7uBCep6VdPFYdXMiBDetMw",
  authDomain: "kyamarket.firebaseapp.com",
  projectId: "kyamarket",
  storageBucket: "kyamarket.firebasestorage.app",
  messagingSenderId: "795537215124",
  appId: "1:795537215124:web:1ae04652f3d0888f96ee81"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;