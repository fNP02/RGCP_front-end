import React from "react";
import { useEffect, useState } from "react";
import { useUsers } from "../store/Users";
import { AdminHeader } from "./AdminHeader";
import "../CSS/UsersPanel.css";
 
export const UsersAdmin = () => {
  const { getAllUsers, AllUsers } = useUsers();
  const [users, setUsers] = useState()

  useEffect(() => {
    getAllUsers()
    setUsers(AllUsers)
  }, [])
  //traer en allUsers y mostrarlos
  

console.log(users);
  return ( 
    <div>
      <h1>UsersAdmin</h1>
      <button onClick={() => getAllUsers()}>Get users</button>
      <div>
        <AdminHeader />
        <div>
          {users?.map((user) => {
            console.log(user);
          })}
        </div>
      </div>
    </div>
  );
};
