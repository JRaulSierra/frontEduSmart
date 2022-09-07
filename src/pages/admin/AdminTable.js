import React, { useState } from "react";
import NavUser from "../../components/navUsers/NavUser";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import useUser from "../../components/usuarioList/UsuarioContext";

function AdminTable() {
  const jobTypes = ["administrador", "maestro", "estudiante"];
  const [datos, setDatos] = useState([]);
  const { recibirDatos, users } = useUser();

  

  
  const update = () =>{
    recibirDatos();
    setDatos(users)
  }
  


  return (
    <div class="dashboard d-flex">
      <div>
        <NavUser name="Administrador" />
      </div>

      <div className="bg-light bg-gradient">
      <button
          className="btn btn-primary"
          onClick={() => update()}
        >
          Update
        </button>
        <BootstrapTable
          data={datos}      
          exportCSV
          search
          pagination
        >
          <TableHeaderColumn dataField="id" isKey={true}>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" editable={{ type: "textarea" }}>
            Nombre
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="active"
            dataField="username"
            editable={{ type: "textarea" }}
          >
            Usuario
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="active"
            dataField="password"
            editable={{ type: "textarea" }}
          >
            Contraseña
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="type"
            dataField="Role"
            editable={{ type: "select", options: { values: jobTypes } }}
          >
            Role
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="activo"
            editable={{
              type: "checkbox",
              options: { values: `${true}:${false}` },
            }}
          >
            Activo
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    </div>
  );
}

export default AdminTable;