// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "coders-library-1ddc7.firebaseapp.com",
  projectId: "coders-library-1ddc7",
  storageBucket: "coders-library-1ddc7.firebasestorage.app",
  messagingSenderId: "930523354885",
  appId: "1:930523354885:web:6dd117b8d5261eb654896c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
