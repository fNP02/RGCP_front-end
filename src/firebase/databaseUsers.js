import { doc, setDoc, getDocs, getDoc, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config.js";

/**
 *  Agrega la informacion de un nuevo usuario.
 *  Espera que se le pase el id con el cual se creo la cuenta del usuario.
 * @param {String} id 
 * @param {String} nombre 
 * @param {String} apellido 
 * @param {String} email 
 * @param {String} edad 
 * @param {String} dni 
 * @param {String} ambito 
 * @param {String} disciplina 
 * @param {String} trabajo_de 
 * @param {String} biografia 
 */
export async function addUser(id, nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia) {
    await setDoc(doc(db, "users", id), {
        nombre: nombre,
        apellido: apellido,
        email: email,
        edad: edad,
        dni: dni,
        ambito: ambito,
        disciplina: disciplina,
        trabajo_de: trabajo_de,
        biografia: biografia
    });
};

/**
 *  Retorna un array compuesto de usuarios con sus datos.
 * @returns {Array}
 */
export async function readAllUser() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const dataUsers = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        dataUsers.push({
            id: doc.id,
            nombre: doc.data().nombre,
            apellido: doc.data().apellido,
            email: doc.data().email,
            edad: doc.data().edad,
            dni: doc.data().dni,
            ambito: doc.data().ambito,
            disciplina: doc.data().disciplina,
            trabajo_de: doc.data().trabajo_de,
            biografia: doc.data().biografia,
            rol: doc.data().rol
        });
    });
    return dataUsers;
};

/**
 *  Devuelve un solo usuario correspondiente al id pasado.
 * @param {String} id 
 * @returns {Object} Objeto usuario.
 */
export async function readUser(id) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
};

/**
 *  Actualiza un usuario.
 * @param {String} id 
 * @param {String} nombre 
 * @param {String} apellido 
 * @param {String} email 
 * @param {String} edad 
 * @param {String} dni 
 * @param {String} ambito 
 * @param {String} disciplina 
 * @param {String} trabajo_de 
 * @param {String} biografia 
 */
export async function updateUser(id, nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia) {
    await updateDoc(doc(db, "userGen", id), {
        nombre: nombre,
        apellido: apellido,
        email: email,
        edad: edad,
        dni: dni,
        ambito: ambito,
        disciplina: disciplina,
        trabajo_de: trabajo_de,
        biografia: biografia
    });
    console.log('Usuario actualizado.');
};

/**
 *  Elimina al usuario.
 * @param {String} id 
 */
export async function deleteUser(id) {
    await deleteDoc(doc(db, "userGen", id));
    console.log('Usuario eliminado.');
};