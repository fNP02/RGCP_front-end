import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { storage } from "./config.js";

/**
 * 
 * @param {File} file 
 * @returns 
 */
export async function uploadFilePost(file) {
    const storageRef = ref(storage, 'post/' + v4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}

/**
 * 
 * @param {File} file 
 * @returns 
 */
export async function uploadFileAvatar(file) {
    const storageRef = ref(storage, 'avatar/' + v4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}