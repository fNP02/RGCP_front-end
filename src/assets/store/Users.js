import { create } from "zustand";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const API_URL=import.meta.env.VITE_API_URL

export const useUsers = create((set)=>({
    allUsers:[],
    allUserss:[],
    currentUser: [],
    currentDataUser: [],
    isLoading:[true],

    setCurrentUser: (user) => {
      set({ currentUser: user });
    },
    
    setCurrentDataUser: (data) => {
      set({ currentDataUser: data });
    },

    setIsLoading: (data) => {
      set({ isLoading: data });
    },

    getAllUsers:async()=>{
        const res = await fetch('../users.json')
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