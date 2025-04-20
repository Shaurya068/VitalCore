import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, query, where, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // ✅ Import Storage correctly

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZujEOHugWiglT5Y8cEdnO8IM2eUwKSm0",
  authDomain: "vitalcore-f4bec.firebaseapp.com",
  projectId: "vitalcore-f4bec",
  storageBucket: "vitalcore-f4bec.firebasestorage.app",
  messagingSenderId: "867970697154",
  appId: "1:867970697154:web:0f54afa194ac82c1f6f85b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore Database
const auth = getAuth(app); // Firebase Authentication
const storage = getStorage(app); // Firebase Storage

const usersCollection = collection(db, "users");
const appointmentsCollection = collection(db, "appointments");

export { db, auth, storage, usersCollection, appointmentsCollection, addDoc, getDocs, getDoc, setDoc, query, where, doc };
