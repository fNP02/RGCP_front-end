import React, { useId } from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserHeader } from "./UserHeader";
import { useUsers } from "../store/Users";
import { updateUser } from "../../firebase/databaseUsers.js";
import { categoriesOptions, ambitoOptions, trabajoOptions } from '../store/constants';

export const UserPanel = () => {
  const { currentUser, currentDataUser, isLoading } = useUsers();

  const [completo, setCompleto] = useState(false);
  const [name, setName] = useState(currentDataUser.nombre || "");
  const [surname, setSurname] = useState(currentDataUser.apellido || "");
  const [email, setEmail] = useState(currentDataUser.email || "");
  const [age, setAge] = useState(currentDataUser.edad || "");
  const [dni, setDni] = useState(currentDataUser.dni || "");
  const [ambit, setAmbit] = useState(currentDataUser.ambito || "");
  const [discipline, setDiscipline] = useState(
    currentDataUser.disciplina || ""
  );
  const [workedAs, setWorkedAs] = useState(currentDataUser.trabajo_de || "");
  const [biography, setBiography] = useState(currentDataUser.biografia || "");

  useEffect(() => {
    setName(currentDataUser.nombre || "");
    setSurname(currentDataUser.apellido || "");
    setEmail(currentDataUser.email || "");
    setAge(currentDataUser.edad || "");
    setDni(currentDataUser.dni || "");
    setAmbit(currentDataUser.ambito || "");
    setDiscipline(currentDataUser.disciplina || "");
    setWorkedAs(currentDataUser.trabajo_de || "");
    setBiography(currentDataUser.biografia || "");
  }, [currentDataUser]);

  useEffect(() => {
    setCompleto(isDataValid(currentDataUser));
    console.log(isDataValid(currentDataUser));
  }, [isLoading]);

  function isDataValid(currentDataUser) {
    const isValid = [
      !!currentDataUser.nombre,
      !!currentDataUser.apellido,
      !!currentDataUser.email,
      !!currentDataUser.edad,
      !!currentDataUser.dni,
      !!currentDataUser.ambito,
      !!currentDataUser.disciplina,
      !!currentDataUser.trabajo_de,
      !!currentDataUser.biografia,
    ].reduce((acc, curr) => acc && curr, true);

    return isValid ? 1 : 0;
  }
  const isCompleto = () => {
    return (
      age.trim() !== "" &&
      dni.trim() !== "" &&
      ambit.trim() !== "" &&
      discipline.trim() !== "" &&
      workedAs.trim() !== "" &&
      biography.trim() !== ""
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Validación de campos
    if (!isCompleto()) {
      toast.error("Por favor complete todos los campos", {
        position: "bottom-center", // Cambiamos la posición a la parte inferior central
        autoClose: 3000, // Duración en milisegundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Los campos están completos, puedes realizar las acciones necesarias aquí
      setCompleto(true);
      // updateUser(id, nombre, apellido, email, edad, dni, ambito, disciplina, trabajo_de, biografia)
      updateUser(
        currentUser.uid,
        name,
        surname,
        email,
        age,
        dni,
        ambit,
        discipline,
        workedAs,
        biography
      );
    }
  };


  console.log(currentUser);
  console.log(currentDataUser);
  console.log(isLoading);

  console.log(age);

  if (isLoading) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <UserHeader />
        {completo && (
          <div className="container-form">
            <p>
              <b>Nombre: </b>
              {currentDataUser.nombre}
            </p>
            <p>
              <b>Email: </b>
              {currentDataUser.email}
            </p>
            <button className="button" onClick={() => setCompleto(false)}>
              Editar Datos
            </button>
          </div>
        )}
        {!completo && (
          <div className="container-form">
            <h2>Complete los datos de su perfil</h2>

            <div className="field-group">
              <div className="input-container">
                <label className="categoria" htmlFor="">
                  Nombre{" "}
                </label>
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label className="categoria" htmlFor="">
                  Apellido{" "}
                </label>
                <input
                  className="input"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>

            <div className="input-container">
              <label className="categoria" htmlFor="">
                Correo Electrónico{" "}
              </label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field-group">
              <div className="input-container">
                <label className="categoria" htmlFor="">
                  DNI{" "}
                </label>
                <input
                  className="input"
                  onChange={(e) => setDni(e.target.value)}
                  type="text"
                  value={dni}
                  placeholder="DNI"
                />
              </div>
              <div className="input-container">
                <label className="categoria" htmlFor="">
                  Edad{" "}
                </label>
                <input
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                  type="number"
                  placeholder="Edad"
                />
              </div>
            </div>

            <div className="input-container">
              {console.log(ambit)}
              <label className="categoria" htmlFor="">
                Ámbito{" "}
              </label>
              <select
                className="input"
                value={ambit}
                onChange={(e) => setAmbit(e.target.value)}
              >
                <option disabled value="">
                  Selecciona un ámbito
                </option>
                {ambitoOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container">
              <label className="categoria" htmlFor="">
                Disciplina{" "}
              </label>
              <select
                className="input"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
              >
                <option disabled value="">
                  Selecciona una disciplina
                </option>
                {categoriesOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container">
              {console.log(workedAs)}
              <label className="categoria" htmlFor="">
                Trabajó de{" "}
              </label>
              <select
                className="input"
                value={workedAs}
                onChange={(e) => setWorkedAs(e.target.value)}
              >
                <option disabled value="">
                  Selecciona un trabajo
                </option>
                {trabajoOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container">
              <label className="categoria" htmlFor="">
                Biografía{" "}
              </label>
              <textarea
                className="input"
                onChange={(e) => setBiography(e.target.value)}
                name=""
                id=""
                cols="40"
                rows="5"
                value={biography}
              ></textarea>
            </div>

            <button className="button" onClick={handleSave}>
              Guardar perfil
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default UserPanel;
