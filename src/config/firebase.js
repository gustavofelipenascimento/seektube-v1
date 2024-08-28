import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAE0UBiKVJ9P4g3vKf2UlxfBxiNqfy_UBE",
    authDomain: "seektube-b5fcd.firebaseapp.com",
    projectId: "seektube-b5fcd",
    storageBucket: "seektube-b5fcd.appspot.com",
    messagingSenderId: "454364521385",
    appId: "1:454364521385:web:2c22588add9c0d03c11ab8"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);