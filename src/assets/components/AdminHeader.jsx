import React from "react";
import "../CSS/UsersPanel.css";


export const AdminHeader = () => {
  return (
    <header className="admin-header">
      <ul className="botones">
        <li>Gestionar usuarios</li>
        <li>Gestionar Oportunidades</li>
      </ul>
    </header>
  );
};
