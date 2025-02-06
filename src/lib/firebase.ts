import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyCHRWq6ao_wi33wza9BXaGsSv8s1_hYbng",
  authDomain: "fashion-shop-99386.firebaseapp.com",
  projectId: "fashion-shop-99386",
  storageBucket: "fashion-shop-99386.firebasestorage.app",
  messagingSenderId: "788384049752",
  appId: "1:788384049752:web:3b2d82572f5cae0e9e782d",
  measurementId: "G-24QV27CYQV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);