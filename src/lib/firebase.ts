// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAdrdcz0kzXQ3YBSM4mIntFSRk1yDIWNo",
  authDomain: "lazismu-sumateratbarat.firebaseapp.com",
  projectId: "lazismu-sumateratbarat",
  storageBucket: "lazismu-sumateratbarat.firebasestorage.app",
  messagingSenderId: "647637546275",
  appId: "1:647637546275:web:abd8e5bd16f6adb2f04896",
  measurementId: "G-HV8WXJMF8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };