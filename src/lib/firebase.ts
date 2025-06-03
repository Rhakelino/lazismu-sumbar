import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAdrdcz0kzXQ3YBSM4mIntFSRk1yDIWNo",
  authDomain: "lazismu-sumateratbarat.firebaseapp.com",
  projectId: "lazismu-sumateratbarat",
  storageBucket: "lazismu-sumateratbarat.firebasestorage.app",
  messagingSenderId: "647637546275",
  appId: "1:647637546275:web:abd8e5bd16f6adb2f04896",
  measurementId: "G-HV8WXJMF8F"
};

// ✅ Inisialisasi hanya jika belum ada app yang aktif
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
