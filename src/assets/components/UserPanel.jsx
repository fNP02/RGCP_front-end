import React from "react";
import { useState } from "react";

export const UserPanel = () => {
  const [completo, setCompleto] = useState(false);

  // user que tiene todos los items  que item es igual a '' 
  return (
    <>
      <div>
        {!completo && (
          <div>
            <h2>Complete los datos de su perfil</h2>
           {/* form */}
          </div>
        )}
      </div>
    </>
  );
};