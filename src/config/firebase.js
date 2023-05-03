// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvzBQhGlbT7kjhdMx6LzlE3gFdGPbSazM",
  authDomain: "mywebs-916d7.firebaseapp.com",
  projectId: "mywebs-916d7",
  storageBucket: "mywebs-916d7.appspot.com",
  messagingSenderId: "895917157933",
  appId: "1:895917157933:web:7cdf9de57468015aedd2a4",
  measurementId: "G-0WG8NMGKEV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
