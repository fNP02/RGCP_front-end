import React from "react";
import { useState } from "react";

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

  const handleSave = () => {
    // Validación de campos
    if (
      age.trim() === "" ||
      dni.trim() === "" ||
      ambit.trim() === "" ||
      discipline.trim() === "" ||
      workedAs.trim() === "" ||
      biography.trim() === ""
    ) {
      alert("Por favor complete todos los campos.");
    } else {
      // Los campos están completos, puedes realizar las acciones necesarias aquí
      setCompleto(true);
      setIsEditing(false);
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
        {!completo && (
          <div>
            <h2>Complete los datos de su perfil</h2>
            <label htmlFor="">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <hr />
            <label htmlFor="">Apellido:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <hr />
            <label htmlFor="">Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <select
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
            <hr />
            <label htmlFor="">Disciplina:</label>
            <select
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
            <hr />
            <label htmlFor="">Trabajó de:</label>
              <select
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
            <button onClick={handleSave}>Guardar perfil</button>
              
          </div>
          
        )}
      </div>
    </>
  );
};

export default UserPanel;