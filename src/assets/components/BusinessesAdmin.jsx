import React from "react";
import { useTabs } from "../store/Tabs";

import { AdminHeader } from "./AdminHeader";
import { useEffect, useState } from "react";
import { SearchComponent } from "./SearchComponent";
import { useOps } from "../store/Ops";

export const BusinessesAdmin = () => {
  const { getAllOps, allOps } = useUsers();
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
    <div className="usersAdmin-body">
      <AdminHeader />
      <h1>Administrador de Oportunidades</h1>
      <button onClick={() => getAllUserss()}>Traer users</button>
      <SearchComponent array={allUsers} setResExt={setResultsFound} />
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
              {resultsFound?.map((user) => (
                <tr key={user.id} className="row">
                  <th>{user.id}</th>
                  <th>
                    <h4>{user.name}</h4>
                  </th>
                  <th>{user.last_name}</th>
                  <th>{user.rol}</th>
                  <th>{user.institution_name}</th>
                  <th>{user.job}</th>
                  <th>
                    <div>
                      {!deletting && (
                        <div className="buttons">
                          <button className="edit">Editar</button>
                          <button
                            className="delete"
                            onClick={() => {
                              setIdToDelete(user.id);
                              setDeletting(true);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                      {idToDelete == user.id && (
                        <div className="confirmation">
                          <span>Borrar?</span>
                          <button
                            className="yes"
                            onClick={() => {
                              handleDeleteUser(user.id);
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
