// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAlInGQH77kvJgG010UD0IOxQ2hNp8kuVY",
  authDomain: "maykouanoni.firebaseapp.com",
  projectId: "maykouanoni",
  storageBucket: "maykouanoni.appspot.com",
  messagingSenderId: "384351443577",
  appId: "1:384351443577:web:52e4f330dbb8a9246f92a8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();
