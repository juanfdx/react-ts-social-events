// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-ts-social-events.firebaseapp.com",
  projectId: "react-ts-social-events",
  storageBucket: "react-ts-social-events.appspot.com",
  messagingSenderId: "559292475934",
  appId: "1:559292475934:web:2ac1f406aad15da5bc9c0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);