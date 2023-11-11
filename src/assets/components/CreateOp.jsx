import React, { useState } from "react";
import { Link } from 'react-router-dom';

export const CreateOp = () => {
  // Define state variables
  const [newCat, setNewCat] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  // Define event handlers
  const handleAddCat = (e) => {
    e.preventDefault();
    const color = colors[Math.floor(Math.random() * colors.length)];
    setCategories([...categories, { name: newCat, color }]);
    setNewCat("");
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(categories);
    console.log(description);
  };

  const colors = [
    'rgba(227, 101, 141, 0.5)',
    'rgba(224, 130, 76, 0.5)',
    'rgba(41, 141, 104, 0.5)',
    'rgba(173, 216, 230, 1)', 
  ];

  // Render the component
  return (
    <div className="container-form">
      <h1>Nueva Oportunidad</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="">Entidad o Persona que realiza el evento</label>
          <input
            className="input"
            type="text"
            placeholder="Nombre del realizador"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
            <label>Categorías</label>
          <div className="field-group">
          <div className="categories-container">
            {categories?.map((cat, index) => (
              <span
                key={index}
                className="category"
                style={{
                  backgroundColor: colors[index % colors.length],
                }}
              >
                {cat.name}
              </span>
            ))}
          </div>
          </div>
          <input
            className="input"
            type="text"
            placeholder="Nueva categoria"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
          />
          <div className="field-group">
            <button className="button-2" onClick={handleAddCat}>
              Agregar Categoria
            </button>
            <button
              className="button-2"
              onClick={(e) => {
                e.preventDefault();
                setCategories([]);
              }}
            >
              Borrar Categorias
            </button>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="">Descripción</label>
          <textarea
            className="input"
            cols="60"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="input-container">
          <label htmlFor="date">Fecha</label>
          <input
            className="input"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="image">Imagen</label>
          <input
            className="input"
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="input-container">
          <button className="button" type="submit">
            CREAR NUEVA OPORTUNIDAD
          </button>
          <Link to="/businesses-admin" className="button-light">
            CANCELAR
          </Link>
        </div>
      </form>
    </div>
  );
};
