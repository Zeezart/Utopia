
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxPm8R5cTmVdPd4dxLL-Qb6diYPB2PA8g",
  authDomain: "utopia-bcc18.firebaseapp.com",
  projectId: "utopia-bcc18",
  storageBucket: "utopia-bcc18.firebasestorage.app",
  messagingSenderId: "1051697385244",
  appId: "1:1051697385244:web:cc9452a4b7ef5dd061b4d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)