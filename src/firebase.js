// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsEt-68wKQ_koKP_LY8-nWfTrbAR5f8O0",
  authDomain: "inovoice-app-7eebd.firebaseapp.com",
  projectId: "inovoice-app-7eebd",
  storageBucket: "inovoice-app-7eebd.firebasestorage.app",
  messagingSenderId: "198858609486",
  appId: "1:198858609486:web:8135e19250cad7aa79c41f",
  measurementId: "G-860QL36VJ7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);