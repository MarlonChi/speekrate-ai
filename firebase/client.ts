import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANgQwJSRj-D9yVQ2exJzE938vW04gGTFA",
  authDomain: "speek-rate.firebaseapp.com",
  projectId: "speek-rate",
  storageBucket: "speek-rate.firebasestorage.app",
  messagingSenderId: "187030355920",
  appId: "1:187030355920:web:294e8d0695e9ccc4b843d5",
  measurementId: "G-KHGCLZQDJG",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
