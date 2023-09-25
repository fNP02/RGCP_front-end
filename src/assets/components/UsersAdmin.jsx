// import React from "react";
// import { useEffect, useState } from "react";
// import { useUsers } from "../store/Users";
// import { AdminHeader } from "./AdminHeader";
// import { SearchComponent } from "./SearchComponent";
// // import "../CSS/UsersPanel.css";

// export const UsersAdmin = () => {
//   const { getAllUsers, allUsers } = useUsers();
//   const [resultsFound, setResultsFound] = useState(null)
//   const [idToDelete, setIdToDelete] = useState(null);

//   useEffect(() => {
//     getAllUsers()
//     }, [])
    
//   useEffect(() => {
//     setResultsFound(allUsers)
//     }, [allUsers])
  
//   const fields = [
//     "id",
//     "name",
//     "last_name",
//     "rol",
//     "institution_name",
//     "job",
//     "Opciones",
//   ];

//   //const results=SearchComponent.getResults(allUsers)

//   console.log(resultsFound);
//   const handleDeleteUser = (id) => {
//     //delete user to the db
//   };



//   return (
//     <div>
//       <h1>UsersAdmin</h1>
//       <button onClick={() => getAllUsers()}>Get users</button>
//       <SearchComponent array={allUsers} setResExt={setResultsFound}/>
//       <div>
//         <AdminHeader />
//         <div>
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
//                 <tr>
//                   <th></th>
//                   <th>
//                     <h4>{user.name}</h4>
//                   </th>
//                   <th>{user.last_name}</th>
//                   <th>{user.rol}</th>
//                   <th>{user.institution_name}</th>
//                   <th>{user.job}</th>
//                   <th>
//                     <div>
//                       <button>Editar</button>
//                       <button onClick={() => setIdToDelete(user.id)}>
//                         Eliminar
//                       </button>
//                       {idToDelete == user.id && (
//                         <div>
//                           <span>Borrar?</span>
//                           <button onClick={()=>handleDeleteUser(user.id)}>Sí</button>
//                           <button onClick={() => setIdToDelete(null)}>
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



import React, { useState, useEffect } from "react";
import { useUsers } from "../store/Users";
import { AdminHeader } from "./AdminHeader";
import { SearchComponent } from "./SearchComponent";

export const UsersAdmin = () => {
  const { getAllUsers, allUsers } = useUsers();
  const [resultsFound, setResultsFound] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    setResultsFound(allUsers);
  }, [allUsers]);

  const fields = [
    "id",
    "name",
    "last_name",
    "rol",
    "institution_name",
    "job",
    "Opciones",
  ];

  const handleDeleteUser = (id) => {
    // delete user to the db
  };

  return (
    <div className="users-admin">
      <h1 className="users-admin__title">UsersAdmin</h1>
      <button
        className="users-admin__button"
        onClick={() => getAllUsers()}
      >
        Get users
      </button>
      <SearchComponent
        className="users-admin__search"
        array={allUsers}
        setResExt={setResultsFound}
      />
      <div className="users-admin__table-container">
        <AdminHeader />
        <div className="users-admin__table">
          <table>
            <thead>
              <tr>
                {fields.map((field) => (
                  <th key={field}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultsFound?.map((user) => (
                <tr key={user.id}>
                  <th>{user.id}</th>
                  <th>
                    <h4>{user.name}</h4>
                  </th>
                  <th>{user.last_name}</th>
                  <th>{user.rol}</th>
                  <th>{user.institution_name}</th>
                  <th>{user.job}</th>
                  <th>
                    <div className="users-admin__table-actions">
                      <button>Editar</button>
                      <button
                        onClick={() => setIdToDelete(user.id)}
                        className="users-admin__table-delete-button"
                      >
                        Eliminar
                      </button>
                      {idToDelete === user.id && (
                        <div className="users-admin__table-delete-confirmation">
                          <span>Borrar?</span>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="users-admin__table-delete-confirmation-yes-button"
                          >
                            Sí
                          </button>
                          <button
                            onClick={() => setIdToDelete(null)}
                            className="users-admin__table-delete-confirmation-no-button"
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

