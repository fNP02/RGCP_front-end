import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


export const CreateUser = () => {

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const response = await fetch('https://rgcp-backend.onrender.com/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      // console.error('Error:', response.status, response.statusText);
      console.log(response.status);
      console.log(response.statusText);
    }
  };


  return (
      <div className="container-form">
      <h1>Nuevo Usuario</h1>
      <form  onSubmit={handleSubmit}>
        <div className="input-container">
        <label >Email</label>
        <input
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        </div>
       <div className="input-container">
       <label >Contraseña </label>
       <input 
        className="input"
        onChange={(e) => setPassword(e.target.value)}
        type="text" 
        placeholder="Contraseña"/>
      </div>
      <div className="input-container"><button className="button" type="submit">CREAR</button>
      <Link to="/users-admin" className="button-light">CANCELAR</Link>
      </div>
      </form>
      </div>
  );
};
