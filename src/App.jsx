import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "./assets/components/Login";
import { UserPanel } from "./assets/components/UserPanel";
import { UsersAdmin } from "./assets/components/UsersAdmin";
import { BusinessesAdmin } from "./assets/components/BusinessesAdmin";
import { ProtectedRoute } from "./assets/components/ProtectedRoute";
import { UserPage } from "./assets/components/UserPage";

import "./App.css";
import { CreateOp } from "./assets/components/CreateOp";
import { CreateUser } from "./assets/components/CreateUser";

import { useOps } from "./assets/store/Ops";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useUsers } from "./assets/store/Users";
import { doc } from "firebase/firestore";
import { db } from "./firebase/config";
import { getDoc } from "firebase/firestore";

export const App = () => {
  const [user, setuser] = useState(null);

  const {
    currentUser,
    setCurrentUser,
    setCurrentDataUser,
    currentDataUser,
    isLoading,
    setIsLoading,
  } = useUsers();

  const { getAllOps } = useOps();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      console.log(currentUser);
      const getPermissions = async () => {
        const docRef = doc(db, `users/${currentUser?.uid}`);
        const info = await getDoc(docRef);
        const permissions = info.data();
        setCurrentDataUser(permissions);
        setIsLoading(false);
        console.log(permissions);
      };

      getPermissions();
      getAllOps();
      // setLoading(false);
    });
  }, []);

  console.log(currentUser);
  return (
    <BrowserRouter basename="/">
      <Navigation />

      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute
              isAllowed={!!currentUser}
              // isAllowed={!!currentUser && user.permissions.includes("admin")}
              redirectTo="/login"
            />
          }
        >
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/user-page" element={<UserPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!currentUser && currentDataUser.rol == "Admin"}
              // isAllowed={!!currentUser && user.permissions.includes("admin")}
              redirectTo="/user-panel"
            />
          }
        >
          <Route path="/users-admin" element={<UsersAdmin />} />
          <Route path="/businesses-admin" element={<BusinessesAdmin />} />
          <Route path="/op-create" element={<CreateOp />} />
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
