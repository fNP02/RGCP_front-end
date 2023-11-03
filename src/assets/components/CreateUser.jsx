import React from "react";
import { useState } from "react";


export const CreateUser = () => {
  const [newCat, setNewCat] = useState();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [dni, setDni] = useState();
  const [ambit, setAmbit] = useState();
  const [discipline, setDiscipline] = useState();
  const [workedAs, setWorkedAs] = useState();
  const [biography, setBiography] = useState("");

  const handleAddCat = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(surname);
    console.log(email);
    console.log(age);
    console.log(dni);
    console.log(ambit);
    console.log(discipline);
    console.log(workedAs);
    console.log(biography);

    CreateUserUG(
      name,
      surname,
      email,
      age,
      dni,
      ambit,
      discipline,
      workedAs,
      biography,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Usuario agregado correctamente");
          res.redirect("/users-admin");
        }
      }
    );
  };

  // nombre apellido email edad dni ambito disciplina trabajoDe biografia
  return (
    <div>
      <h1>Creando nuevo Usuario</h1>
      <form action="" onSubmit={handleSubmit}>
        <hr />
        <label htmlFor="">Nombre:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nombre"
        />
        <hr />
        <label htmlFor="">Apellido:</label>
        <input
          onChange={(e) => setSurname(e.target.value)}
          type="text"
          placeholder="Apellido"
        />
        <hr />
        <label htmlFor="">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <hr />
        <label htmlFor="">Edad:</label>
        <input
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Edad"
        />
        <hr />
        <label htmlFor="">DNI:</label>
        <input
          onChange={(e) => setDni(e.target.value)}
          type="text"
          placeholder="DNI"
        />
        <hr />
        <label htmlFor="">Ámbito:</label>
        <input
          onChange={(e) => setAmbit(e.target.value)}
          type="text"
          placeholder="Ámbito"
        />
        <hr />
        <label htmlFor="">Disciplina:</label>
        <input
          onChange={(e) => setDiscipline(e.target.value)}
          type="text"
          placeholder="Disciplina"
        />
        <hr />
        <label htmlFor="">Trabajó de:</label>
        <input
          onChange={(e) => setWorkedAs(e.target.value)}
          type="text"
          placeholder="Trabajó de ..."
        />
        <hr />
        <label htmlFor="">Biografía:</label>
        <br />
        <textarea
          onChange={(e) => setBiography(e.target.value)}
          name=""
          id=""
          cols="40"
          rows="5"
        ></textarea>
        <hr />
        <button type="submit">CREAR NUEVO USUARIO</button>
      </form>
    </div>
  );
};
