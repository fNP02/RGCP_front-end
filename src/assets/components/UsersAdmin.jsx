import { useTabs } from "../store/Tabs";
import React from "react";
import { useEffect, useState } from "react";
import { useUsers } from "../store/Users";
import { AdminHeader } from "./AdminHeader";
import { SearchComponent } from "./SearchComponent";

import { useNavigate } from "react-router-dom";

import { readAllUser } from "../../firebase/databaseUsers.js";



export const UsersAdmin = () => {
  const navigate = useNavigate();
  const { getAllUsers, allUsers, getAllUserss, allUserss } = useUsers();
  const [allUss, setAllUss] = useState()
  const { setTabTitle } = useTabs();
  const [resultsFound, setResultsFound] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [deletting, setDeletting] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const traerAsync = async () => {
      try {
        const allUsers = await readAllUser();
        console.log(allUsers);
        setAllUss(allUsers);
      } catch (error) {
        console.error("Error al obtener todos los usuarios:", error);
      }
    };
    traerAsync()
    document.title = "RGCP - Administración";
  }, []);

  useEffect(() => {
    setResultsFound(allUss);
    setIsLoading(false)
  }, [allUss]);

  const fields = [
    "id",
    "Nombre",
    "Apellido",
    "Rol",
    "Opciones",
  ];

  //const results=SearchComponent.getResults(allUsers)

  console.log(resultsFound);
  const handleDeleteUser = (id) => {
    //delete user to the db
    setIdToDelete(null);
  };


  if (isLoading) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    )
  }

  return (
    <div className="usersAdmin-body">
      <AdminHeader />
      <h1>Administrador de Usuarios</h1>
      <button onClick={() => getAllUserss()}>Traer users</button>
      <SearchComponent array={allUsers} setResExt={setResultsFound} />
      <button onClick={() => navigate("/user-create")}> Crear Nuevo</button>
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
                    <h4>{user.nombre}</h4>
                  </th>
                  <th>{user.apellido}</th>
                  <th>{user.rol}</th>
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

// import React, { useState, useEffect } from "react";
// import { useUsers } from "../store/Users";
// import { AdminHeader } from "./AdminHeader";
// import { SearchComponent } from "./SearchComponent";

// export const UsersAdmin = () => {
//   const { getAllUsers, allUsers } = useUsers();
//   const [resultsFound, setResultsFound] = useState(null);
//   const [idToDelete, setIdToDelete] = useState(null);

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   useEffect(() => {
//     setResultsFound(allUsers);
//   }, [allUsers]);

//   const fields = [
//     "id",
//     "name",
//     "last_name",
//     "rol",
//     "institution_name",
//     "job",
//     "Opciones",
//   ];

//   const handleDeleteUser = (id) => {
//     // delete user to the db
//   };

//   return (
//     <div className="users-admin">
//       <h1 className="users-admin__title">UsersAdmin</h1>
//       <button
//         className="users-admin__button"
//         onClick={() => getAllUsers()}
//       >
//         Get users
//       </button>
//       <SearchComponent
//         className="users-admin__search"
//         array={allUsers}
//         setResExt={setResultsFound}
//       />
//       <div className="users-admin__table-container">
//         <AdminHeader />
//         <div className="users-admin__table">
//           <table>
//             <thead>
//               <tr>
//                 {fields.map((field) => (
//                   <th key={field}>{field}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {resultsFound?.map((user) => (
//                 <tr key={user.id}>
//                   <th>{user.id}</th>
//                   <th>
//                     <h4>{user.name}</h4>
//                   </th>
//                   <th>{user.last_name}</th>
//                   <th>{user.rol}</th>
//                   <th>{user.institution_name}</th>
//                   <th>{user.job}</th>
//                   <th>
//                     <div className="users-admin__table-actions">
//                       <button>Editar</button>
//                       <button
//                         onClick={() => setIdToDelete(user.id)}
//                         className="users-admin__table-delete-button"
//                       >
//                         Eliminar
//                       </button>
//                       {idToDelete === user.id && (
//                         <div className="users-admin__table-delete-confirmation">
//                           <span>Borrar?</span>
//                           <button
//                             onClick={() => handleDeleteUser(user.id)}
//                             className="users-admin__table-delete-confirmation-yes-button"
//                           >
//                             Sí
//                           </button>
//                           <button
//                             onClick={() => setIdToDelete(null)}
//                             className="users-admin__table-delete-confirmation-no-button"
//                           >
//                             No
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </th>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };
