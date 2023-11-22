import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addPubli, updatePubli } from "../../firebase/databasePublication.js";
import { uploadFilePost } from "../../firebase/imgDB.js";
import { useNavigate } from "react-router-dom";

import { useOps } from "../store/Ops.js";

export const CreateOp = () => {
  const navigate = useNavigate();
  const { editing, setEditing } = useOps();

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

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const imgFile = await uploadFilePost(file);
    console.log(imgFile);
    setImage(imgFile);
  };

  useEffect(() => {
    if(editing){
      console.log(editing);
      setName(editing.institucionName)
      setCategories(editing.categories)
      setDescription(editing.descripcion)
      setDate(editing.fechaDelEvento)
      setImage(editing.img)
    }
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name);
    console.log(image);
    console.log(categories);
    console.log(description);
    const cats = categories.map((cat) => cat.name);
    console.log(cats);

    if (editing) {
      //editar
      await updatePubli(editing.id,
        name,
        cats,
        description,
        date,
        image);
        setEditing(null)
    } else {
      await addPubli(name, image, cats, description, date);
    }
    navigate("/businesses-admin");
  };

  const colors = [
    "rgba(227, 101, 141, 0.5)",
    "rgba(224, 130, 76, 0.5)",
    "rgba(41, 141, 104, 0.5)",
    "rgba(173, 216, 230, 1)",
  ];

  console.log(editing);
  // console.log(typeof date);
  // Render the component
  return (
    <div className="container-form">
      <h1>Nueva Oportunidad</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
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
            onChange={handleUploadImage} //uploadFilePost(e.target.files[0])
          />
          {image && <img className="opImage" src={image} alt="" />}
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
