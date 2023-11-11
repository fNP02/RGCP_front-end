import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTabs } from "../store/Tabs";


export const UserHeader = () => {
  const { tabActive, setTabActive } = useTabs();
  const navigate = useNavigate();
  const handleCloseSession = () => {
    navigate("/");
    console.log("sdsdasda");
  };

  console.log(tabActive);

  return (
    <header className="session-header">
      <div className="img1">
        <img src="public\logo-RGCP.6e692ef4.svg" alt="" />
      </div>
      <nav>
        <ul className="botones">
          <li onClick={() => setTabActive("UserPanel")}>
            <Link
              className={`link ${tabActive == "UserPanel" ? "active" : ""}`}
              to="/user-panel"
            >
              Panel de Usuario
            </Link>
          </li>
          <li onClick={(event) => setTabActive("UserPage")}>
            <Link
                className={`link ${tabActive == "UserPage" ? "active" : ""}`}
                to="/user-page"
            >
                Oportunidades
            </Link>
        </li>
          <li onClick={handleCloseSession}>
            <Link className="link">Cerrar sesion</Link>
          </li>
        </ul>
      </nav>
      <div className="img2">
        <img src="public\logo-fundacion.581e3676.svg" alt="" />
      </div>
    </header>
  );
};