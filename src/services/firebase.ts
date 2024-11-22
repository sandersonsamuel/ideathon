import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFWWgKRghiHY6LvRJvT9_nLCkLAuVgbKs",
  authDomain: "ideathon-89619.firebaseapp.com",
  projectId: "ideathon-89619",
  storageBucket: "ideathon-89619.firebasestorage.app",
  messagingSenderId: "361264640378",
  appId: "1:361264640378:web:78a6e4ae0e00baa95f66c3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provideer = new GoogleAuthProvider()
export const db = getFirestore(app)