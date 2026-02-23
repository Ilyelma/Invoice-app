import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:            "AIzaSyBsEt-68wKQ_koKP_LY8-nWfTrbAR5f8O0",
  authDomain:        "inovoice-app-7eebd.firebaseapp.com",
  projectId:         "inovoice-app-7eebd",
  storageBucket:     "inovoice-app-7eebd.firebasestorage.app",
  messagingSenderId: "198858609486",
  appId:             "1:198858609486:web:8135e19250cad7aa79c41f",
};

const fbApp = initializeApp(firebaseConfig);
export const db = getFirestore(fbApp);
export const auth = getAuth(fbApp);

export const DATA_DOC = doc(db, "zkm_data", "main");
export const USERS_COL = collection(db, "zkm_users");
