import { create } from "zustand";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../../firebase/config.js";

import { readAllPubli } from "../../firebase/databasePublication.js";


const API_URL=import.meta.env.VITE_API_URL

export const useOps = create((set)=>({
    allOps:[],
    editing:[null],

    setEditing: (isEd) => {
      set({ editing: isEd });
    },

    getAllOps:async()=>{
        // const res = await fetch('../ops.json')
        // const data= await res.json()
        // console.log(data);
        const querySnapshot = await getDocs(collection(db, "publication"))
        const dataPublication = []; // Array de objetos publicaciones.
        querySnapshot.forEach((doc) => {
          dataPublication.push({
            id: doc.id,
            institucionName: doc.data().institucionName,
            img: doc.data().img,
            categorias: doc.data().categorias,
            descripcion: doc.data().descripcion,
            fechaDeCreacionDB: doc.data().fechaDeCreacionDB,
            fechaDelEvento: doc.data().fechaDelEvento
          });
        });
        set({ allOps: dataPublication });

    },

    getAllUserss: async () => {
        try {
          const response = await fetch(`${API_URL}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(body),
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          console.log("listo");
        }
      },
}))