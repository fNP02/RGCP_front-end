import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "./assets/components/Login";
import { UserPanel } from "./assets/components/UserPanel";
import { UsersAdmin } from "./assets/components/UsersAdmin";
import { BusinessesAdmin } from "./assets/components/BusinessesAdmin";
import { ProtectedRoute } from "./assets/components/ProtectedRoute";

export const App = () => {
  const [user, setuser] = useState(null);

  const login = () => {
    //request
    setuser({
      id: 1,
      name: "John",
      permissions: ["admi"],
      roles:['admin']
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
