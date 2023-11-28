import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addPubli, updatePubli } from "../../firebase/databasePublication.js";
import { uploadFilePost } from "../../firebase/imgDB.js";
import { useOps } from "../store/Ops.js";
import { categoriesOptions, colors } from '../store/Constants';

export const CreateOp = () => {
  const navigate = useNavigate();
  const { editing, setEditing } = useOps();

  const [newCat, setNewCat] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editing) {
      setName(editing.institucionName)
      if (editing.categorias) {
        setCategories(editing.categorias.map((cat, index) => {
          const color = colors[index % colors.length];
          return { name: cat, color };
        }))
      }
      setDescription(editing.descripcion)
      setDate(editing.fechaDelEvento)
      setImage(editing.img)
    }
  }, [editing])

  const handleAddCat = (e) => {
    e.preventDefault();
    const color = colors[Math.floor(Math.random() * colors.length)];
    setCategories([...categories, { name: newCat, color }]);
    setNewCat("");
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const imgFile = await uploadFilePost(file);
    setImage(imgFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cats = categories.map((cat) => cat.name);

    if (editing) {
      await updatePubli(editing.id, name, image, cats, description, date);
      setEditing(null);
    } else {
      await addPubli(name, image, cats, description, date);
    }
    navigate("/businesses-admin");
  };

  return (
    <div className="container-form">
      <h1>{editing ? 'Editar Oportunidad' : 'Nueva Oportunidad'}</h1>
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
                    backgroundColor: cat.color,
                  }}
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
          <select
            className="input"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            {categoriesOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
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
            onChange={handleUploadImage}
          />
          {image && <img className="opImage" src={image} alt="" />}
        </div>
        <div className="input-container">
          <button className="button" type="submit">
            {editing ? 'GUARDAR' : 'CREAR NUEVA OPORTUNIDAD'}
          </button>
          <Link to="/businesses-admin" className="button-light">
            CANCELAR
          </Link>
        </div>
      </form>
    </div>
  );
};
