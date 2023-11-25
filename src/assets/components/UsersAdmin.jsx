import { useTabs } from "../store/Tabs";
import React from "react";
import { useEffect, useState } from "react";
import { useUsers } from "../store/Users";
import { AdminHeader } from "./AdminHeader";
import { SearchComponent } from "./SearchComponent";

import { useNavigate } from "react-router-dom";

import { deleteUser, readAllUser, updateEstado, updateUser } from "../../firebase/databaseUsers.js";



export const UsersAdmin = () => {
  const navigate = useNavigate();
  const { getAllUsers, allUsers, getAllUserss, allUserss } = useUsers();
  const [allUss, setAllUss] = useState()
  const { setTabTitle } = useTabs();
  const [resultsFound, setResultsFound] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [deletting, setDeletting] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  

  const traerAsync = async () => {
    try {
      const allUsers = await readAllUser();
      console.log(allUsers);
      setAllUss(allUsers);
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
    }
  };
  
  useEffect(() => {
    traerAsync();
    document.title = "RGCP - Administración";
  }, []);
  
  useEffect(() => {
    setResultsFound(allUss);
    setIsLoading(false)
  }, [allUss]);

  const fields = [
    "Email",
    "Nombre",
    "Apellido",
    "Rol",
    "Opciones",
  ];

  //const results=SearchComponent.getResults(allUsers)

  console.log(resultsFound);
  const handleDeleteUser = async (id) => {
    const response = await fetch(`https://rgcp-backend.onrender.com/account/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });
  
    if (response.ok) {
      console.log('Usuario eliminado');
      traerAsync();
    } else {
      console.log('Error al eliminar el usuario');
    }
  
    setIdToDelete(null);
  };

  const handleBlockUser = async (id, estado) => {
    const response = await fetch('https://rgcp-backend.onrender.com/account/block', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        estado: estado,
      }),
    });

    if (response.ok) {
      await updateEstado(id, estado);
      traerAsync();
    } else {
      console.log('Error al actualizar el usuario');
    }
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
                  <th className="lapsus">{user.email}</th>
                  <th>
                    <h4>{user.nombre}</h4>
                  </th>
                  <th>{user.apellido}</th>
                  <th>{user.rol}</th>
                  <th>
                    <div>
                      {!deletting && (
                        <div className="buttons">
                          <button
                            className="delete"
                            onClick={() => {
                              setIdToDelete(user.id);
                              setDeletting(true);
                            }}
                          >
                            Eliminar
                          </button>
                          {user.estado ? (
                            <button onClick={() => handleBlockUser(user.id, false)}>Desbloquear</button>
                          ) : (
                            <button onClick={() => handleBlockUser(user.id, true)}>Bloquear</button>
                          )}
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
