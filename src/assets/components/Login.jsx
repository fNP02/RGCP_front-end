import React from "react";
import { useState, useEffect } from "react";
import { useValidate } from "../store/Validate";
import { auth } from "../../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { firebaseErrors } from "../../firebase/firebaseErrors.js";

export const Login = () => {
  const { validateUser } = useValidate();

  const navigate = useNavigate();


  const [userChange, setUserChange] = useState();
  const [passChange, setPassChange] = useState();
  const [errorChange, setErrorChange] = useState("");

  useEffect(() => {
    //si hay token, salta el paso, si no se queda
    document.title = "RGCP - Login";
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(userChange);
    console.log(passChange);
    try {
      const userRef = await signInWithEmailAndPassword(
        auth,
        userChange,
        passChange
      );
      console.log(userRef.user.uid);
      //Si el usuario ingresa
      navigate("/users-admin");
    } catch (error) {
      // El usuario tuvo errores
      console.log(error.message);
      console.log(error.code);
      setErrorChange(error.code);
      // const errorDisp = firebaseErrors(error.code);
      // console.log(errorDisp);
      // setErrorChange(errorDisp);
    }
    //validateUser(userChange,passChange)
    const currentTime = Date.now() / 1000;
    console.log(currentTime);
  };

  console.log(errorChange);
  return (
    <>
      <div className="login">
        <h1>Login</h1>
        {errorChange && (
          <div style={{ color: "red" }}>
            <p>{errorChange}</p>
          </div>
        )}
        <form className="form" action="" onSubmit={handleFormSubmit}>
          <input
            className="imput"
            type="text"
            placeholder="Usuario"
            onChange={(e) => {
              setErrorChange("");
              setUserChange(e.target.value);
            }}
          />
          <input
            className="imput"
            type="password"
            placeholder="Contraseña"
            onChange={(e) => {
              setErrorChange("");
              setPassChange(e.target.value);
            }}
          />
          <button className="button" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </>
  );
};
