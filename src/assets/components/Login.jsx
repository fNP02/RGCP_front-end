import React from "react";
import { useState, useEffect } from "react";
import { useValidate } from "../store/Validate";

export const Login = () => {
  const {validateUser}=useValidate();

  const [userChange, setUserChange] = useState()
  const [passChange, setPassChange] = useState()
  
  useEffect(() => {
    //si hay token, salta el paso, si no se queda
  
  }, [])
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(userChange);
    console.log(passChange);
    //validateUser(userChange,passChange)
    const currentTime=Date.now()/1000
    console.log(currentTime);

  };
  return (
    <>
      <div>Login</div>
      <form action="" onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Usuario" onChange={(e)=>setUserChange(e.target.value)}/>
        <input type="password" placeholder="Contraseña" onChange={(e)=>setPassChange(e.target.value)}/>
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
};
