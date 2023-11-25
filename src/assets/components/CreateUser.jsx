import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../firebase/databaseUsers";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Component for creating a new user.
 * @returns {JSX.Element} The CreateUser component.
 */
export const CreateUser = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  /**
   * Handles the form submission.
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const response = await fetch('https://rgcp-backend.onrender.com/account', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.text();

      if (data === "auth/email-already-exists") {
        toast.error("El email ya existe");
        return;
      } else if (data === "auth/invalid-email") {
        toast.error("El email no es valido");
        return;
      } else if (data === "auth/invalid-password") {
        toast.error("La contraseña debe tener un minimo de 6 caracteres.");
        return;
      } else if (data === "Ocurrio un error al crear el usuario.") {
        toast.error("Ocurrio un error al crear el usuario.");
        return;
      }

      console.log(data);
      await addUser(data, "", "", email, "", "", "", "", "", "", false);
      console.log("Usuario creado");
      navigate("/users-admin");
    } else {
      console.log(response.status);
      console.log(response.statusText);
      toast.error(`Error: ${response.statusText}`);
    }
  };

  return (
    <>
      <div className="container-form">
        <h1>Nuevo Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email</label>
            <input
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="input-container">
            <label>Contraseña</label>
            <input
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Contraseña"
            />
          </div>
          <div className="input-container">
            <button className="button" type="submit">CREAR</button>
            <Link to="/users-admin" className="button-light">CANCELAR</Link>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={2500} />
    </>
  );
};
