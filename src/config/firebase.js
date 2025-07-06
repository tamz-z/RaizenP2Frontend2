import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, updateDoc, deleteDoc, doc, deleteField, getDoc, arrayUnion, query, orderBy,} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWrF6miE5OgYnQ8YNlEVlJi_7WQAyxTGw",
  authDomain: "raizen-bc21f.firebaseapp.com",
  projectId: "raizen-bc21f",
  storageBucket: "raizen-bc21f.firebasestorage.app",
  messagingSenderId: "59655018688",
  appId: "1:59655018688:web:167411c44d7a592a5ef525",
  measurementId: "G-1D1N104JCC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export {
  app,
  auth,
  db ,
  storage,
  googleProvider,
  analytics,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  deleteField,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
  getDoc,
  arrayUnion,
  query,
  orderBy,
};