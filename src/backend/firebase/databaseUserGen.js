import { db } from "./config.js";
import { addDoc, collection, getDoc, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";


/**
 * Agrega un nuevo usuario con los siguientes datos
 * @param {String} first - Nombre del usuario
 * @param {String} last - Apellido del usuario
 * @param {String} email - Email del usuario
 * @param {Number} age - Edad del usuario
 * @param {Number} dni - DNI del usuario
 * @param {String} ambit - Ambito del usuario
 * @param {String} discipline - Disciplina del usuario
 * @param {String} job - Trabajo del usuario
 * @param {String} biography - Biografia del usuario
 * @returns {String} UserGen ID utlizado para enlazar con el UserSes
 */
export async function addUserGen(first, last, email, age, dni, ambit, discipline, job, biography) {
    const docRef = await addDoc(collection(db, "userGen"), {
        nombre: first,
        apellido: last,
        email: email,
        edad: age,
        dni: dni,
        ambito: ambit,
        disciplina: discipline,
        trabajo_de: job,
        biografia: biography
    });
    return docRef.id;
};

/**
 * Retorna un array con todos los usuarios y sus datos
 * @returns {Array} Array con objetos usuarios
 */
export async function readAllUserGen() {
    const querySnapshot = await getDocs(collection(db, "userGen"));
    const dbUserG = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        dbUserG.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
    });
    return dbUserG;
}

/**
 * Retorna un usuario especifico con sus datos
 * @param {String} id - UserGen ID
 * @returns {Object} Objeto usuario
 */
export async function readUserGen(id) {
    const docRef = doc(db, "userGen", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

/**
 * Actualiza los datos de usuario especifico
 * @param {String} id 
 * @param {String} first 
 * @param {String} last 
 * @param {String} email 
 * @param {Number} age 
 * @param {Number} dni 
 * @param {String} ambit 
 * @param {String} discipline 
 * @param {String} job 
 * @param {String} biography 
 */
export async function updateUserGen(id, first, last, email, age, dni, ambit, discipline, job, biography) {
    await updateDoc(doc(db, "userGen", id), {
        nombre: first,
        apellido: last,
        email: email,
        edad: age,
        dni: dni,
        ambito: ambit,
        disciplina: discipline,
        trabajo_de: job,
        biografia: biography
    });
    console.log('Usuario actualizado');
}

/**
 * Elimina un usuario
 * @param {String} id - UserGen ID
 */
export async function deleteUserGen(id) {
    await deleteDoc(doc(db, "userGen", id));
    console.log('Usuario eliminado');
}

// addUserGen("Juan", "Perezco", "algo@mail.com", 22, 44157879, "AlgoAmbito", "AlgoDisciplina", "Programador", "No tengo")
//     .then(respuesta => {
//         console.log('Usuargio agregado');
//         console.log(respuesta);
//     })

// console.log(readUserGen("JSCHWE4aBPumyjGrE0un"));

// console.log(readAllUserGen());

// readAllUserGen()
//     .then(respuesta => {
//         console.log(respuesta);
//         console.log('Listo!');
//     })

// deleteUserGen('JSCHWE4aBPumyjGrE0un')
//     .then(respuesta => {
//         console.log('Listo!');
//     })

// updateUserGen('Y17OPu5DABL5qcHbKKbJ', 'Marti', 'Vicuña', 'mar@mail', 21, 43987121, 'No se', 'Tampoco se', 'Programadora', 'No le gusta el lol')
//     .then(respuesta => {
//         console.log('Cambios realizados!');
//     })