import { db } from "./config.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";

/**
 * Crea una nueva publicacion
 * Nota: fechaDeCreacionDB es para tener seguimiento del guardado de la info en el server
 * @param {String} nameOfTheInstitution 
 * @param {String} image 
 * @param {String} categories 
 * @param {String} description 
 */
export async function addPubli(nameOfTheInstitution, image, categories, description) {
    const docRef = await addDoc(collection(db, "publicaciones"), {
        nombreDeLaInstitucion: nameOfTheInstitution,
        img: image,
        categorias: categories,
        descripcion: description,
        fechaDeCreacionDB: serverTimestamp()
    })
}

/**
 * Devuelve todas las publicaciones
 * @returns {Array} Array con todas las publicaciones
 */
export async function readAllPubli() {
    const querySnapshot = await getDocs(collection(db, "publicaciones"))
    const dbPublicaciones = [];
    querySnapshot.forEach((doc) => {
        dbPublicaciones.push(doc.data());
    });
    return dbPublicaciones;
}

/**
 * Retorna un objeto publicacion
 * @param {String} id 
 * @returns {Object}
 */
export async function readPubli(id) {
    const docSnap = await getDoc(doc(db, "publicaciones", id));
    if (docSnap.exists()) {
        console.log('Document data:', docSnap.id, docSnap.data());
        return docSnap.data();
    } else {
        console.log('No such document!');
    }
}

/**
 * Actualiza la publicacion 
 * @param {String} id 
 * @param {String} nameOfTheInstitution 
 * @param {String} image 
 * @param {String} categories 
 * @param {String} description 
 */
export async function updatePubli(id, nameOfTheInstitution, image, categories, description) {
    await updateDoc(doc(db, "publicaciones", id), {
        nombreDeLaInstitucion: nameOfTheInstitution,
        img: image,
        categorias: categories,
        descripcion: description
    });
}

/**
 * Elimina la publicacion
 * @param {String} id 
 */
export async function deletePubli(id) {
    await deleteDoc(doc(db, "publicaciones", id));
    console.log('Usuario eliminado');
}