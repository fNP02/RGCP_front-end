import { create } from "zustand";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const API_URL=import.meta.env.VITE_API_URL

export const useUsers = create((set)=>({
    getAllUsers:async()=>{
        const res = await fetch('../users.json')
        const data= await res.json()
        console.log(data);
    }
}))