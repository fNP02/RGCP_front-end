import { create } from "zustand";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

export const useValidate = create((set) => ({
  // validateUser: async (email, password) => {
  //   const body = { email, password };
  //   try {
  //     const response = await fetch(`${API_URL}/auth/login`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });
  //     const data = await response.json();
  //     const token = (await data?.data?.token) ?? "";
  //     if (token) {
  //       localStorage.setItem("token", token);
  //       console.log(token);
  //     } else {
  //       console.log("Error, usuario invalido");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     console.log("listo");
  //   }
  // },

  validateUser: async (email, password) => {
    const body = { email, password };
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      const token = (await data?.data?.token) ?? "";
      if (token) {
        localStorage.setItem("token", token);
        console.log(token);
      } else {
        console.log("Error, usuario invalido");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("listo");
    }
  },

  validateSession: (token)=>{
    if(token==undefined){
      Navigate("/")
      alert("sin usuario")
    }else{
      const decodedToken=jwtDecode(token)
      const currentTime=Date.now()/1000
      const tokenExpiration= decodedToken?.exp
      if(tokenExpiration<currentTime){
        console.log('El token ha expirado');
        localStorage.removeItem('token')
        Navigate('/')
      }else{
        console.log('Token es válido');
      }
    }
  },
}));
