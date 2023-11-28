import React from "react";
import { useTabs } from "../store/Tabs";

import { useNavigate } from "react-router-dom";

import { AdminHeader } from "./AdminHeader";
import { useEffect, useState } from "react";
import { SearchComponent } from "./SearchComponent";
import { useOps } from "../store/Ops";

import { deletePubli } from "../../firebase/databasePublication.js";
import { categoriesOptions } from '../store/Constants';

export const BusinessesAdmin = () => {
  const navigate = useNavigate();
  const { getAllOps, allOps, editing, setEditing } = useOps();
  const { setTabTitle } = useTabs();
  const [resultsFound, setResultsFound] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  const [deletting, setDeletting] = useState(false);

  useEffect(() => {
    // const funcion = async ()=>{
    //   const publi = await readAllPubli();
    // }

    getAllOps();
    document.title = "RGCP - Administración";
    setEditing(null)
  }, []);

  useEffect(() => {
    setResultsFound(allOps);
    console.log(allOps);
  }, [allOps]);

  const fields = [
    "Nombre de la institucion",
    "Imagen",
    "Categoría",
    "Descripción",
    "Opciones",
  ];

  console.log(resultsFound);
  const handleDeleteOp = async (id) => {
    // await delete user to the db
    await deletePubli(id);
    getAllOps();
    setIdToDelete(null);
  };

  const handleEditOp=(op)=>{
    console.log(op);
    setEditing(op)
    navigate("/op-create")
  }

  console.log(allOps);
  console.log('editandooooo?');
  console.log(editing);
  return (
    <div className="usersAdmin-body">
      <AdminHeader />
      <h1>Administrador de Oportunidades</h1>
      <button onClick={() => getAllOps()}>Mostrar todas</button>
      <SearchComponent array={allOps} setResExt={setResultsFound} />
      <button onClick={() => navigate("/op-create")}> Crear Nuevo</button>
      <div>
        <div className="usersAdmin-div-table">
          <table className="table">
            <thead className="table__head">
              <tr>
                {fields.map((field) => (
                  <th key={field}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table__body">
              {resultsFound?.map((op) => (
                <tr key={op.id} className="row">
                  <th>
                    <h4>{op.institucionName}</h4>
                  </th>
                  <th>
                    <img className="opImageMini" src={op.img} alt="" />
                  </th>
                  <th>{op.categorias.join(", ")}</th>
                  <th>{op.descripcion.substring(0, 100) + (op.descripcion.length > 100 ? "..." : "")}</th>
                  <th>
                    <div>
                      {!deletting && (
                        <div className="buttons">
                          <button className="edit" onClick={()=>handleEditOp(op)}>
                            Editar
                          </button>
                          <button
                            className="delete"
                            onClick={() => {
                              setIdToDelete(op.id);
                              setDeletting(true);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                      {idToDelete == op.id && (
                        <div className="confirmation">
                          <span>Borrar?</span>
                          <button
                            className="yes"
                            onClick={() => {
                              handleDeleteOp(op.id);
                              setDeletting(false);
                            }}
                          >
                            Sí
                          </button>
                          <button
                            className="no"
                            onClick={() => {
                              setIdToDelete(null);
                              setDeletting(false);
                            }}
                          >
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
