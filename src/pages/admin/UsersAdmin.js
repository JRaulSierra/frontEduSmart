import React, { useEffect, useState } from "react";
import NavUser from "../../components/navUsers/NavUser";
import useUser from "../../components/usuarioList/UsuarioContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

function UsersAdmin(props) {
  const { recibirDatos, users, updateDatos, deleteDatos, createDatos } = useUser();

  const [datos, setDatos] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [userSeleccionado, setUserSeleccionado] = useState({
    id: "",
    name: "",
    usuario: "",
    password: "",
    Role: "",
    Clases: "",
    activo: "",
    Email: "",
    Telefono: "",
  });
  const seleccionarUsuario = (elemento, caso) => {
    setUserSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };
  // cambia la informacion del usuario seleccinado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Realiza el proceso de editar la informacion
  const editar = () => {
    var dataNueva = datos;
    dataNueva.map((usuario) => {
      if (usuario.id === userSeleccionado.id) {
        usuario.username = userSeleccionado.username;
        usuario.name = userSeleccionado.name;
        usuario.email = userSeleccionado.email;
        usuario.telefono = userSeleccionado.telefono;
        usuario.Role = userSeleccionado.Role;
        usuario.password = userSeleccionado.password;
        usuario.clases = userSeleccionado.clases;
        if (userSeleccionado.activo === "true") {
          usuario.activo = true;
        } else if (userSeleccionado.activo === "false") {
          usuario.activo = false;
        }
      }
    });
    setDatos(dataNueva);
    updateDatos(userSeleccionado);
    setModalEditar(false);
  };

  const eliminar = () => {
    let f = datos.filter((user) => user.id !== userSeleccionado.id);
    let a = userSeleccionado
    setDatos(f);
    deleteDatos(a);
    setModalEliminar(false);
  };

  const abrirModalInsertar = () => {
    setUserSeleccionado(null);
    setModalInsertar(true);
  };

  const update = () => {
    recibirDatos();
    setDatos(users);
  };

  const insertar = () => {
    let valorInsertar = userSeleccionado;
    if (valorInsertar.activo === "true") {
      valorInsertar.activo = true;
    } else if (valorInsertar.activo === "false") {
      valorInsertar.activo = false;
    }
    valorInsertar.id = datos[datos.length - 1].id + 1;
    var dataNueva = datos;
    dataNueva.push(valorInsertar);
    setDatos(dataNueva);
    createDatos(valorInsertar);
    setModalInsertar(false);
  };

  return (
    <div className="dashboard d-flex">
      <div>
        <NavUser name="Administrador" />
      </div>
      <div className="bg-light bg-gradient table">
        <h1>Tabla de usuarios</h1>
        <br />
        <button
          className="btn btn-success"
          onClick={() => abrirModalInsertar()}
        >
          Insertar
        </button>
        <button className="btn btn-primary" onClick={() => update()}>
          Update
        </button>
        <br />
        <br />
        <table className="table table-bordered bg-light bg-gradient">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>usuario</th>
              <th>Contraseña</th>
              <th>Role</th>
              <th>Clases</th>
              <th>activo</th>
              <th>Email</th>
              <th>Telefono</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{dato.name}</td>
                <td>{dato.username}</td>
                <td>{dato.password}</td>
                <td>{dato.Role}</td>
                <td>{dato.clases}</td>
                <td>{`${dato.activo}`}</td>
                <td>{dato.email}</td>
                <td>{dato.telefono}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => seleccionarUsuario(dato, "Editar")}
                  >
                    Editar
                  </button>
                  {"  "}
                  <button
                    className="btn btn-danger"
                    onClick={() => seleccionarUsuario(dato, "Eliminar")}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL DE EDITAR USUARIO -------------------*/}
        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="id"
                value={userSeleccionado && userSeleccionado.id}
              />
              <br />

              <label>Nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={userSeleccionado && userSeleccionado.name}
                onChange={handleChange}
              />
              <br />

              <label>Usuario</label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={userSeleccionado && userSeleccionado.username}
                onChange={handleChange}
              />
              <br />
              <label>Contraseña</label>
              <input
                className="form-control"
                type="text"
                name="password"
                value={userSeleccionado && userSeleccionado.password}
                onChange={handleChange}
              />
              <br />
              <label>Role</label>
              <form>
                <input
                  className="form-control"
                  type="checkbox"
                  name="Role"
                  className="radio"
                  value="admin"
                  onChange={handleChange}
                />
                <label for="Role">Admin</label>
                <br></br>
                <input
                  className="form-control"
                  type="checkbox"
                  name="Role"
                  className="radio"
                  value="teacher"
                  onChange={handleChange}
                />
                <label for="Role">teacher</label>
                <br></br>
                <input
                  className="form-control"
                  type="checkbox"
                  name="Role"
                  className="radio"
                  value="student"
                  onChange={handleChange}
                />
                <label for="Role">student</label>
                <br></br>
              </form>
              <br />
              {/* SECCION DE INGRESAR CLASES LO VEREMOS MAS ADELANTE */}
              <label>Clases</label>
              <select
                className="form-control"
                name="clases"
                onChange={handleChange}
              >
                <option value="">Elija una opcion</option>
                <option value={userSeleccionado && userSeleccionado.Clases}>
                  ----------
                </option>
                <option value={userSeleccionado && userSeleccionado.Clases}>
                  Naturales
                </option>
              </select>
              <br />
              <label>Activo</label>
              <select
                className="form-control"
                name="activo"
                onChange={handleChange}
              >
                <option value="">Elija una opcion de activacion</option>
                <option value={true}>
                  True
                </option>
                <option value={false}>
                  False
                </option>
              </select>
              <br />
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={userSeleccionado && userSeleccionado.email}
                onChange={handleChange}
              />
              <br />
              <label>Telefono</label>
              <input
                className="form-control"
                type="tel"
                name="telefono"
                pattern="[0-9]{4}-[0-9]{4}"
                value={userSeleccionado && userSeleccionado.telefono}
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => editar()}>
              Actualizar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setModalEditar(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
        {/* MODAL ELIMINAR ------------------------ */}
        <Modal isOpen={modalEliminar}>
          <ModalBody>
            Estás Seguro que deseas eliminar el Usuario{" "}
            {userSeleccionado && userSeleccionado.name}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => eliminar()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setModalEliminar(false)}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
        {/* MODAL Insertar ------------------------ */}
        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Agregar Nuevo Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="id"
                value={
                  userSeleccionado ? userSeleccionado.name : datos.length + 1
                }
              />
              <br />
              <label>Nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={userSeleccionado ? userSeleccionado.name : ""}
                onChange={handleChange}
              />
              <br />
              <label>Usuario</label>
              <input
                className="form-control"
                type="text"
                name="username"
                value={userSeleccionado ? userSeleccionado.usuario : ""}
                onChange={handleChange}
              />
              <br />
              <label>Contraseña</label>
              <input
                className="form-control"
                type="text"
                name="password"
                value={userSeleccionado ? userSeleccionado.password : ""}
                onChange={handleChange}
              />
              <br />
              <label>Role</label>
              <form>
                <input
                  className="form-control"
                  type="checkbox"
                  name="Role"
                  className="radio"
                  value={userSeleccionado ? userSeleccionado.Role : "admin"}
                  onChange={handleChange}
                />
                <label for="Role">Admin</label>
                <br></br>
                <input
                  className="form-control"
                  type="checkbox"
                  name="Role"
                  className="radio"
                  value={userSeleccionado ? userSeleccionado.Role : "teacher"}
                  onChange={handleChange}
                />
                <label for="Role">teacher</label>
                <br></br>
                <input
                  className="form-control"
                  type="checkbox"
                  name="Role"
                  className="radio"
                  value={userSeleccionado ? userSeleccionado.Role : "student"}
                  onChange={handleChange}
                />
                <label for="Role">student</label>
                <br></br>
              </form>
              <br />
              {/* SECCION DE INGRESAR CLASES LO VEREMOS MAS ADELANTE */}
              <label>Clases</label>
              <select
                className="form-control"
                name="clases"
                onChange={handleChange}
              >
                <option value="">Elija una opcion</option>
                <option
                  value={
                    userSeleccionado ? userSeleccionado.Clases : "--------"
                  }
                >
                  ----------
                </option>
                <option
                  value={
                    userSeleccionado ? userSeleccionado.Clases : "Naturales"
                  }
                >
                  Naturales
                </option>
              </select>
              <br />
              <label>Activo</label>
              <select
                className="form-control"
                name="activo"
                onChange={handleChange}
              >
                <option value="">Elija una opcion</option>
                <option
                  value={userSeleccionado ? userSeleccionado.activo : true}
                >
                  true
                </option>
                <option
                  value={userSeleccionado ? userSeleccionado.activo : false}
                >
                  false
                </option>
              </select>
              <br />
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={userSeleccionado ? userSeleccionado.Email : ""}
                onChange={handleChange}
              />
              <br />
              <label>Telefono</label>
              <input
                className="form-control"
                type="tel"
                name="telefono"
                pattern="[0-9]{4}-[0-9]{4}"
                value={userSeleccionado ? userSeleccionado.Telefono : ""}
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => insertar()}>
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setModalInsertar(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default UsersAdmin;
