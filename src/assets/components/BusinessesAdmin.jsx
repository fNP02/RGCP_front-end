import React from "react";
import { useTabs } from "../store/Tabs";

import { AdminHeader } from "./AdminHeader";
import { useEffect, useState } from "react";
import { SearchComponent } from "./SearchComponent";
import { useOps } from "../store/Ops";

export const BusinessesAdmin = () => {
  const { getAllOps, allOps } = useOps();
  const { setTabTitle } = useTabs();
  const [resultsFound, setResultsFound] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  const [deletting, setDeletting] = useState(false);

  useEffect(() => {
    getAllOps();
    document.title = "RGCP - Administración";
  }, []);

  useEffect(() => {
    setResultsFound(allOps);
    console.log(allOps);
  }, [allOps]);

  const fields = [
    "Imagen",
    "Nombre de la institucion",
    "Categoría",
    "Descripción",
    "Opciones",
  ];

  console.log(resultsFound);
  const handleDeleteOp = (id) => {
    // await delete user to the db
    setIdToDelete(null);
  };

  return (
    <div className="usersAdmin">
      <AdminHeader />
      <h1>Administrador de Oportunidades</h1>
      <button onClick={() => getAllOps()}>Traer ops</button>
      <SearchComponent array={allOps} setResExt={setResultsFound} />
      <div>
        <div className="usersAdmin-div">
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
                  <th>{op.imageUrl}</th>
                  <th>
                    <h4>{op.institution_name}</h4>
                  </th>
                  <th>{op.categorias}</th>
                  <th>{op.descripcion}</th>
                  <th>
                    <div>
                      {!deletting && (
                        <div className="buttons">
                          <button className="edit">Editar</button>
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
