// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { v4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7DuAbMhyi7ideyp3AHn68DoWU85prv1I",
    authDomain: "rgcp-z-db2.firebaseapp.com",
    projectId: "rgcp-z-db2",
    storageBucket: "rgcp-z-db2.appspot.com",
    messagingSenderId: "646988275735",
    appId: "1:646988275735:web:b3b06239232b22fd823c52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/**
 * Upload a file to firebase storage
 * @param {File} file the file upload
 * @returns {Promise<string>} url of the uploaded file
 */
export async function uploadFilePost(file){
    const storageRef = ref(storage, 'post/' + v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}

/**
 * Upload a file to firebase storage
 * @param {File} file the file upload
 * @returns {Promise<string>} url of the uploaded file
 */
export async function uploadFileAvatar(file){
    const storageRef = ref(storage, 'avatar/' + v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}