
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCteD9uqu8B1ZM_KOLsf5__lp-aLEO9E34",
  authDomain: "megamart-c304f.firebaseapp.com",
  projectId: "megamart-c304f",
  storageBucket: "megamart-c304f.firebasestorage.app",
  messagingSenderId: "359024223659",
  appId: "1:359024223659:web:22c04c693a09b1d5381eee"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();