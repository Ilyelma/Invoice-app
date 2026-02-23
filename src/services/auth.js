import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
