import { query } from "express";
import { db } from "./config.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc, where } from "firebase/firestore";

/**
 * Crea una nueva publicacion
 * Nota: fechaDeCreacionDB es para tener seguimiento del guardado de la info en el server
 * @param {String} institucionName 
 * @param {String} img 
 * @param {String} categorias 
 * @param {String} descripcion 
 */
export async function addPubli(institucionName, img, categorias, descripcion) {
    const docRef = await addDoc(collection(db, "publication"), {
        institucionName: institucionName,
        img: img,
        categorias: categorias,
        descripcion: descripcion,
        fechaDeCreacionDB: serverTimestamp(),
        timeData: serverTimestamp()
    })
}

/**
 * Devuelve todas las publicaciones
 * @returns {Array} Array con todas las publicaciones
 */
export async function readAllPubli() {
    const querySnapshot = await getDocs(collection(db, "publication"))
    const dataPublication = [];
    querySnapshot.forEach((doc) => {
        dataPublication.push({
            id: doc.id,
            institucionName: doc.data().institucionName,
            img: doc.data().img,
            categorias: doc.data().categorias,
            descripcion: doc.data().descripcion,
            fechaDeCreacionDB: doc.data().fechaDeCreacionDB
        });
    });
    return dataPublication;
}

/**
 * Retorna un objeto publicacion
 * @param {String} id 
 * @returns {Object}
 */
export async function readPubli(id) {
    const docSnap = await getDoc(doc(db, "publication", id));
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
 * @param {String} institucionName 
 * @param {String} img 
 * @param {String} categorias 
 * @param {String} descripcion 
 */
export async function updatePubli(id, institucionName, img, categorias, descripcion) {
    await updateDoc(doc(db, "publicaciones", id), {
        institucionName: institucionName,
        img: img,
        categorias: categorias,
        descripcion: descripcion,
        timeData: serverTimestamp()
    });
}

/**
 * Elimina la publicacion
 * @param {String} id 
 */
export async function deletePubli(id) {
    await deleteDoc(doc(db, "publication", id));
    console.log('Publicacion eliminada.');
}


export async function filterPubli(disciplina) {
    const q = query(collection(db, "publication"), where(disciplina, "==", categorias));
    const PubliFiltradas = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        PubliFiltradas.push({
            id: doc.id,
            institucionName: doc.data().institucionName,
            img: doc.data().img,
            categorias: doc.data().categorias,
            descripcion: doc.data().descripcion,
            fechaDeCreacionDB: doc.data().fechaDeCreacionDB
        });
    });
}