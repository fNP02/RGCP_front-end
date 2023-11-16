// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYi7CLvMxNw22l7zVcnNQ9-omBli_qYpw",
    authDomain: "rgcp-dbv3.firebaseapp.com",
    projectId: "rgcp-dbv3",
    storageBucket: "rgcp-dbv3.appspot.com",
    messagingSenderId: "956583689646",
    appId: "1:956583689646:web:b7d2a648e2b2af32d7dc3f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// console.log(app);