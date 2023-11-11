import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "./assets/components/Login";
import { UserPanel } from "./assets/components/UserPanel";
import { UsersAdmin } from "./assets/components/UsersAdmin";
import { BusinessesAdmin } from "./assets/components/BusinessesAdmin";
import { ProtectedRoute } from "./assets/components/ProtectedRoute";
import { UserPage } from "./assets/components/UserPage";
import { EditOp } from "./assets/components/EditOp";

import "./App.css";
import { CreateOp } from "./assets/components/CreateOp";
import { CreateUser } from "./assets/components/CreateUser";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useUsers } from "./assets/store/Users";


export const App = () => {
  const [user, setuser] = useState(null);

  const {currentUser, setCurrentUser}=useUsers()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      console.log(currentUser);
      // setLoading(false);
    });
  }, []);

  const login = () => {
    //request
    setuser({
      id: 1,
      name: "John",
      permissions: ["admin"],
      roles: ["admin"],
    });
  };
  const logout = () => setuser(null);

  return (
    <BrowserRouter basename="/">
      <Navigation />
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-panel"
          element={
            <ProtectedRoute isAllowed={!!user}>
              <UserPanel />
            </ProtectedRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("admin")}
              redirectTo="/user-panel"
            />
          }
        >
          <Route path="/users-admin" element={<UsersAdmin />} />
          <Route path="/businesses-admin" element={<BusinessesAdmin />} />
          <Route path="/op-create" element={<CreateOp />} />
          <Route path="/op-edit" element={<EditOp />} />
          <Route path="/user-create" element={<CreateUser />} />
          <Route path="/user-page" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/user-panel">User Panel</Link>
        </li>
        <li>
          <Link to="/users-admin">Users Admin</Link>
        </li>
        <li>
          <Link to="/businesses-admin">Bussineses Admin</Link>
        </li>
        <li>
          <Link to="/user-page">User Page</Link>
        </li>
      </ul>
    </nav>
  );
}

/*
admin panel
  admin de usuarios
  admin de empresas
user panel

*/
