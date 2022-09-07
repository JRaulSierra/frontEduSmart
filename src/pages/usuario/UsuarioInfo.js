import React from "react";
import CardUsuario from "../../components/cardUsuario/CardUsuario";
import useAuth from "../../auth/useAuth";
import NavUser from "../../components/navUsers/NavUser"

function UsuarioInfo() {
    const { info } = useAuth();
  return (
    <div className="dashboard d-flex">
      <div>
        <NavUser name={info.Role} />
      </div>
      <div class="container m-4 p-3 d-flex bg-white justify-content-center">
          <CardUsuario/>
      </div>
    </div>
  );
}

export default UsuarioInfo;
