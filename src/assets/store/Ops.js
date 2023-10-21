import { create } from "zustand";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const API_URL=import.meta.env.VITE_API_URL

export const useOps = create((set)=>({
    allUsers:[],
    allUserss:[],

    getAllOps:async()=>{
        const res = await fetch('../ops.json')
        const data= await res.json()
        console.log(data);
        set({ allUsers: data });
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