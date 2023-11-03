import { db } from "./config.js";
import { addDoc, collection, getDoc, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";


/**
 * 
 * @param {String} first 
 * @param {String} last 
 * @param {String} email 
 * @param {String} password 
 * @param {String} rol 
 * @param {String} userGenID 
 */
export async function addUserSes(first, last, email, password, rol, userGenID) {
    const docRef = await addDoc(collection(db, "userSes"), {
        nombre: first,
        apellido: last,
        email: email,
        contraseña: password,
        rol: rol,
        userGenID: userGenID
    });
};

/**
 * 
 * @returns 
 */
export async function readAllUserSes() {
    const querySnapshot = await getDocs(collection(db, "userSes"));
    const dbUserG = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        dbUserG.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
    });
    return dbUserG;
}

/**
 * 
 * @param {String} id 
 * @returns 
 */
export async function readUserSes(id) {
    const docRef = doc(db, "userSes", id);
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
 * 
 * @param {String} id 
 * @param {String} first 
 * @param {String} last 
 * @param {String} email 
 * @param {String} password 
 * @param {String} rol 
 */
export async function updateUserSes(id, first, last, email, password, rol) {
    await updateDoc(doc(db, "userSes", id), {
        nombre: first,
        apellido: last,
        email: email,
        contraseña: password,
        rol: rol
    });
    console.log('Usuario actualizado');
}

/**
 * 
 * @param {String} id 
 */
export async function deleteUserSes(id) {
    await deleteDoc(doc(db, "userSes", id));
    console.log('Usuario eliminado');
}


// addUserGen('Marti', 'Palau', 'mar@mail.com', 23, 42899197, 'Desconocido', 'Disciplina Desconocida', 'Cajera', 'Me gusta el arroz')
//     .then(respuesta => {
//         const UserGenID = respuesta;
//         addUserSes('Marti', 'Palau', 'mar@mail.com', '12345', 'Usuario01', UserGenID)
//             .then(respuesta => {
//                 console.log('Funciono')
//             })
//         return 0
//     })
// .then(respuestaProcesada => {
//     console.log(respuestaProcesada);
//     console.log('Listo!');
// });
// .catch(err => {
//     console.log(err);
// });

// addUserSes('Marti', 'Palau', 'mar@mail.com', '12345', 'Usuario01', algoData)
//     .then(respuesta => {
//         console.log('Nuevo Usuario Agregado');
//     })

// const docRef = await addDoc(collection(db, "publicaciones"), {
//     institucionName: "ISOR",
//     img: "aoiwdhnauwbkkwoknbmpwoj",
//     categorias: "Joda",
//     descripcion: "No tiene"
// })
// console.log("Document written with ID: ", docRef.id);