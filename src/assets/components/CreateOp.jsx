import React from "react";
import { useState } from "react";

export const CreateOp = () => {
  const [newCat, setNewCat] = useState();

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");

  const handleAddCat = (e) => {
    e.preventDefault();
    setCategories([...categories, newCat]);
    setNewCat("");
  };

  console.log(newCat);
  console.log(categories);
  return (
    <div>
      <h1>Creando nueva publicacion</h1>
      <form action="">
        <hr />
        <label htmlFor="">Nombre:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nombre de la publicacion"
        />
        <hr />
        <div>
          <label>Categorías:</label>
          {categories?.map((cat) => (
            <span>{` ${cat}`}</span>
          ))}
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              setCategories([]);
            }}
          >
            Borrar Categorias
          </button>
        </div>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setNewCat(e.target.value)}
          value={newCat}
          placeholder="nueva categoria"
        />
        <button onClick={handleAddCat}>Agregar Categoria</button>
        <hr />
        <label htmlFor="">Descripción:</label>
        <br />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name=""
          id=""
          cols="40"
          rows="5"
        ></textarea>
      </form>
    </div>
  );
};
