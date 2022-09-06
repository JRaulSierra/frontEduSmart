import React, { useState } from "react";
import "./DashboardStyle.css";
import ChartsPage from "./ChartsPage";
import useUser from "../../components/usuarioList/UsuarioContext";
import ChartsPages from "./ChartsPages";
import ChartsPages2 from "./ChartsPages2";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function Dashboard() {
  const { users, recibirDatos } = useUser();
  const [estudiantes, setEstudiantes] = useState([]);
  const [maestros, setMaestros] = useState([]);

  if (estudiantes === null) {
    teachers(users);
    students(users);
  }

  function teachers(users) {
    setMaestros([3, 1, 1]);
  }

  function tt() {
    if (estudiantes.length === 0) {
      recibirDatos();
      students(users);
      teachers(users);
      return console.log("no se puede");
    } else if (estudiantes.length >= 1) {
      return <ChartsPages name={estudiantes} />;
    }
  }

  function students(users) {
    setEstudiantes([2, 2, 2]);
  }

  return (
    <div>
      <div className="charts">
        <div className="Card">
          <div className="card-header">Estudiantes</div>
          <div>
            <div className="container">
              <ChartsPage></ChartsPage>
              {tt()}
            </div>
          </div>
        </div>
        <div className="Card">
          <div className="card-header">Maestros</div>
          <div>
            <div className="container">
              <ChartsPage></ChartsPage>
              <ChartsPages2 name={maestros} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
