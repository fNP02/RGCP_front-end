import React from "react";
import { useState, useEffect } from "react";
import { useValidate } from "../store/Validate";
import { auth } from "../../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const {validateUser}=useValidate();

  const [userChange, setUserChange] = useState()
  const [passChange, setPassChange] = useState()
  
  useEffect(() => {
    //si hay token, salta el paso, si no se queda
  document.title='RGCP - Login'
  }, [])
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(userChange);
    console.log(passChange);
    const userRef = await signInWithEmailAndPassword(auth, userChange, passChange);
    console.log(userRef.user.uid);
    //validateUser(userChange,passChange)
    const currentTime=Date.now()/1000
    console.log(currentTime);
  };
  return (
    <>
      <div className="login">Login
      <form className="form" action="" onSubmit={handleFormSubmit}>
        <input className="imput" type="text" placeholder="Usuario" onChange={(e)=>setUserChange(e.target.value)}/>
        <input className="imput" type="password" placeholder="Contraseña" onChange={(e)=>setPassChange(e.target.value)}/>
        <button className="button" type="submit">Ingresar</button>
      </form>
      </div>
    </>
  );
};
