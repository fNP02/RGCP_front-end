// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsqzfjCNMvOxLbPgLFGvqOTIYiNB8xqBk",
    authDomain: "rgcp-dbv2.firebaseapp.com",
    projectId: "rgcp-dbv2",
    storageBucket: "rgcp-dbv2.appspot.com",
    messagingSenderId: "1087928146742",
    appId: "1:1087928146742:web:ee15f39858dea6cdb47197"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// console.log(app);