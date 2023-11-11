import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserHeader } from "./UserHeader";

export const UserPanel = () => {
  const [completo, setCompleto] = useState(false);
  const [name, setName] = useState("Martu");
  const [surname, setSurname] = useState("Juri");
  const [email, setEmail] = useState("martijuri11@gmail.com");
  const [age, setAge] = useState("");
  const [dni, setDni] = useState("");
  const [ambit, setAmbit] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [workedAs, setWorkedAs] = useState("");
  const [biography, setBiography] = useState("");

  const isCompleto = () =>  {
    return (
      age.trim() !== "" &&
      dni.trim() !== "" &&
      ambit.trim() !== "" &&
      discipline.trim() !== "" &&
      workedAs.trim() !== "" &&
      biography.trim() !== ""
    );
  }
  const handleSave = () => {
    // Validación de campos
    if (
      !isCompleto()
    ) {
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
      setIsEditing(false);
      updateUserGen(id, name, surname, email, age, dni, ambit, discipline, workedAs, biography);
    }
  };

  const disciplinaOptions = [
    "Artes visuales",
    "Danza",
    "Teatro",
    "Performance/Circo/otras escénicas",
    "Música",
    "Patrimonio",
    "Diseño",
    "Otro",
  ];

  const ambitoOptions = ["Público", "Privado", "Independiente", "Mixto"];

  const trabajoOptions = [
    "Gestión Cultural",
    "Producción de eventos",
    "Management/Representación",
    "Artista/Dir. de Proyectos",
    "Investigación",
    "Otro",
  ];

 

  return (
    <>
      <div>
      <UserHeader />
        {!completo && (
          <div className="container-form">
            <h2 >Complete los datos de su perfil</h2>
            
            <div className="field-group">

            <div className="input-container">
            <label  className="categoria" htmlFor="">Nombre </label>
            <input className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            </div> 
            <div className="input-container">
            <label className="categoria"htmlFor="">Apellido </label>
            <input className="input"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            </div>
            </div>

            <div className="input-container">
            <label className="categoria" htmlFor="">Correo Electrónico </label>
            <input className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="field-group">
            
            <div className="input-container">
            <label className="categoria"htmlFor="">DNI </label>
            <input className="input"
              onChange={(e) => setDni(e.target.value)}
              type="text"
              placeholder="DNI"
            />
            </div>
            <div className="input-container">
            <label className="categoria"htmlFor="">Edad </label>
            <input className="input"
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Edad"
            />
            </div>
            </div>

            <div className="input-container">
            <label className="categoria"htmlFor="">Ámbito </label>
              <select className="input"
                value={ambit}
                onChange={(e) => setAmbit(e.target.value)}
              >
                <option value="">Selecciona un ámbito</option>
                {ambitoOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="input-container">
            <label className="categoria"htmlFor="">Disciplina </label>
            <select className="input"
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
            >
              <option value="">Selecciona una disciplina</option>
              {disciplinaOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            </div>
            
            <div className="input-container">
            <label className="categoria"htmlFor="">Trabajó de </label>
              <select className="input"
                value={workedAs}
                onChange={(e) => setWorkedAs(e.target.value)}
              >
                <option value="">Selecciona un trabajo</option>
                {trabajoOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="input-container">
            <label className="categoria" htmlFor="">Biografía </label>
            <textarea className="input"
              onChange={(e) => setBiography(e.target.value)}
              name=""
              id=""
              cols="40"
              rows="5"
            ></textarea>
            </div>
            
            <button className="button" onClick={handleSave}>Guardar perfil</button>
          </div>   
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default UserPanel;