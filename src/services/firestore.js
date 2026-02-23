import { getFirestore, doc, setDoc, onSnapshot, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db, DATA_DOC, USERS_COL } from "../config/firebase";

export const getFirestoreData = (callback) => {
  return onSnapshot(DATA_DOC, (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    }
  });
};

export const saveFirestoreData = (data) => {
  return setDoc(DATA_DOC, data);
};

export const getUsers = async () => {
  const snap = await getDocs(USERS_COL);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const deleteUser = (userId) => {
  return deleteDoc(doc(db, "zkm_users", userId));
};

export const saveUser = (userId, userData) => {
  return setDoc(doc(db, "zkm_users", userId), userData);
};
