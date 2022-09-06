import React, { useEffect, useState } from "react";
// import firebase from "firebase/compat/app";
import { useParams } from "react-router";
import useAuth from "../../auth/useAuth";
import { app } from "../../config/fb-config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function TareasPag() {
  const { user } = useAuth();
  const clase = useParams();
  const [nameArchivo, setNameArchivo] = useState([]);
  const [back, setBack] = useState("");
  const [archivo, setArchivo] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nombre, setNombre] = useState("");
  const [description, setDescription] = useState("");
  const [module, setModule] = useState(1);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [name1, setname1] = useState("");
  const [colec1, setcolet1] = useState("");
  const [archivoURL, setArchivoURL] = useState("");

  const [moduleP, setModuleP] = useState("");

  const deleteHandler = async (c, t) => {
    console.log(t);
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(`${clase.id}/tar/${t}`);
    alert(archivoPath);
    await archivoPath.delete();
    const coleccionRef = app.firestore().collection("Tareas " + clase.id);
    console.log("eliminara" + t);
    const document = await coleccionRef.doc(t).delete();
    setNameArchivo([]);
  };

  const updateHandler = async (d) => {
    const nombreArchivo = nombre;
    const DescArchivo = description;
    const moduloArchivo = module;
    const coleccionRef = app.firestore().collection("Tareas " + clase.id);
    // eliminara y creara un nuevo documento
    if (nameArchivo.name !== undefined) {
      if (nameArchivo.name !== name1) {
        // eliminamos el viejo en el storage
        const storageRef = app.storage().ref();
        let archivoPath = storageRef.child(`${clase.id}/tar/${name1}`);
        await archivoPath.delete();
        // eliminamos del cloud
        let coleccionRef = app.firestore().collection("Tareas " + clase.id);
        await coleccionRef.doc(name1).delete();
        // --------------------------------------------------------------------------------------------------------------------
        // creamos uno nuevo

        setDescription(description);
        setNombre(nameArchivo.name);
        setArchivo(nameArchivo);
        if (module !== 0) {
          setModule(module);
        } else {
          console.log(moduleP);
          setModule(moduleP);
        }

        submitHandler();
        return;
      }
      alert(
        "no se puede modificar ya que tiene los mismos parametros que al archivo anterior"
      );
    }
    if (DescArchivo !== "") {
      await coleccionRef.doc(colec1).update({ descripcion: DescArchivo });
    }
    if (module !== undefined) {
      await coleccionRef.doc(colec1).update({ modulo: module });
    }
  };

  const submitHandler = async () => {
    const nombreArchivo = nombre;
    const DescArchivo = description;
    const moduloArchivo = module;
    const narchivo = nameArchivo;
    const file = archivo;

    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(`${clase.id}/tar/${file.name}`);
    await archivoPath.put(archivo);
    console.log("archivo cargado" + file.name);
    const enlaceURL = await archivoPath.getDownloadURL();
    const coleccionRef = app.firestore().collection("Tareas " + clase.id);
    const document = await coleccionRef.doc(file.name).set({
      nombre: file.name,
      url: enlaceURL,
      descripcion: DescArchivo,
      modulo: moduloArchivo,
    });
    console.log("se cargo el archivo");
    setDescription("");
    setNameArchivo("");
    setModule(0);
  };

  useEffect(() => {
    async function fetching() {
      const docuList = await app
        .firestore()
        .collection("Tareas " + clase.id)
        .get();
      setDocumentos(docuList.docs.map((doc) => doc.data()));
    }
    fetching();
  }, [submitHandler]);

  useEffect(async () => {
    const docuList = await app
      .firestore()
      .collection("Tareas " + clase.id)
      .get();
    setDocumentos(docuList.docs.map((doc) => doc.data()));
  }, []);

  const rd = (e) => {
    if (documentos === null) {
      return <li>VACIO</li>;
    } else {
      return documentos.map((d) => {
        if (d.modulo == 1) {
          if (user.role === "teacher") {
            return (
              <>
                <tr>
                  <td>#</td>
                  <td>{d.descripcion}</td>
                  <td>
                    <a href={d.url}>{d.nombre}</a>
                  </td>
                  <td width="261px">
                    <Button
                      variant="warning"
                      className="ml-3 mr-4"
                      onClick={() => {
                        setDescription(d.descripcion);
                        setModuleP(d.modulo);
                        setname1(d.nombre);
                        setcolet1(d.nombre);
                        handleShow2();
                      }}
                    >
                      Modificar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteHandler(d.descripcion, d.nombre);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              </>
            );
          }
          return (
            <>
              <tr>
                <td>#</td>
                <td>{d.descripcion}</td>
                <td>
                  <a href={d.url}>{d.nombre}</a>
                </td>
              </tr>
            </>
          );
        }
      });
    }
  };
  const rg = (e) => {
    if (documentos === null) {
      return <li>VACIO</li>;
    } else {
      return documentos.map((d) => {
        if (d.modulo == 2) {
          if (user.role === "teacher") {
            return (
              <>
                <tr>
                  <td>#</td>
                  <td>{d.descripcion}</td>
                  <td>
                    <a href={d.url}>{d.nombre}</a>
                  </td>
                  <td width="261px">
                    <Button
                      variant="warning"
                      className="ml-3 mr-4"
                      onClick={() => {
                        setDescription(d.descripcion);
                        setModuleP(d.modulo);
                        setname1(d.nombre);
                        setcolet1(d.nombre);
                        handleShow2();
                      }}
                    >
                      Modificar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteHandler(d.descripcion, d.nombre);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              </>
            );
          }
          return (
            <>
              <tr>
                <td>#</td>
                <td>{d.descripcion}</td>
                <td>
                  <a href={d.url}>{d.nombre}</a>
                </td>
              </tr>
            </>
          );
        }
      });
    }
  };

  const rf = (e) => {
    if (documentos === null) {
      return <li>VACIO</li>;
    } else {
      return documentos.map((d) => {
        if (d.modulo == 3) {
          if (user.role === "teacher") {
            return (
              <>
                <tr>
                  <td>#</td>
                  <td>{d.descripcion}</td>
                  <td>
                    <a href={d.url}>{d.nombre}</a>
                  </td>
                  <td width="261px">
                    <Button
                      variant="warning"
                      className="ml-3 mr-4"
                      onClick={() => {
                        setDescription(d.descripcion);
                        setModuleP(d.modulo);
                        setname1(d.nombre);
                        setcolet1(d.nombre);
                        handleShow2();
                      }}
                    >
                      Modificar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteHandler(d.descripcion, d.nombre);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              </>
            );
          }
          return (
            <>
              <tr>
                <td>#</td>
                <td>{d.descripcion}</td>
                <td>
                  <a href={d.url}>{d.nombre}</a>
                </td>
              </tr>
            </>
          );
        }
      });
    }
  };

  const mood = () => {
    if (user === null) {
    } else if (user.role === "teacher") {
      return (
        <div className="formm">
          <div className="justify-content-center">
            <h1 className="display-4 text-center letraza">TAREAS</h1>
          </div>
          {/* PARA AGREGAR DOCUMENTOS ---------------------------------------------------------------------------------*/}
          <Button variant="success" className="m-3" onClick={handleShow}>
            Agregar Documento
          </Button>
          <Tabs
            defaultActiveKey="Modulo 1"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Modulo 1" title="Modulo 1">
              <div className="d-flex flex-column mh-25  ">
                <div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Enlace</th>
                      </tr>
                    </thead>
                    <tbody>{rd()}</tbody>
                  </Table>
                </div>
              </div>
            </Tab>
            <Tab eventKey="Modulo 2" title="Modulo 2">
              <div className="d-flex flex-column mh-25  ">
                <div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Enlace</th>
                      </tr>
                    </thead>
                    <tbody>{rg()}</tbody>
                  </Table>
                </div>
              </div>
            </Tab>
            <Tab eventKey="Modulo 3" title="Modulo 3">
              <div className="d-flex flex-column mh-25  ">
                <div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Enlace</th>
                      </tr>
                    </thead>
                    <tbody>{rf()}</tbody>
                  </Table>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      );
    } else if (user.role === "student") {
      return (
        <div className="formm">
          <div className="justify-content-center">
            <h1 className="display-4 text-center letraza">{clase.id} Tareas</h1>
          </div>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Modulo 1">
              <div className="d-flex flex-column mh-25  ">
                <div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Enlace</th>
                      </tr>
                    </thead>
                    <tbody>{rd()}</tbody>
                  </Table>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Modulo 2">
              <div className="d-flex flex-column mh-25  ">
                <div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Enlace</th>
                      </tr>
                    </thead>
                    <tbody>{rg()}</tbody>
                  </Table>
                </div>
              </div>
            </Tab>
            <Tab eventKey="contact" title="Modulo 3">
              <div className="d-flex flex-column mh-25  ">
                <div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Enlace</th>
                      </tr>
                    </thead>
                    <tbody>{rf()}</tbody>
                  </Table>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      );
    }
  };

  useEffect(() => {
    if (user === null) {
      setBack("log");
    } else {
      setBack(user.role);
    }
  }, []);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to={`/${back}`}>
            Regresar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  to={`/${user.role}/clases/${clase.id}`}
                >
                  Documentos
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className="nav-link active"
                  to={`/${user.role}/clases/${clase.id}/tareas`}
                >
                  Tareas
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/${user.role}/clases/${clase.id}/quizzes`}
                >
                  Quizzes
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {mood()}
      {/* Modal -------------------------------------------------------------------------------------------------------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mt-3 mb-3">
            <Form.Label>Seleccione el Tarea que desea subir.</Form.Label>
            <Form.Control
              type="file"
              onChange={(dato) => {
                setArchivo(dato.target.files[0]);
              }}
            />
          </Form.Group>
          <FloatingLabel
            controlId="documentName"
            label="Nombra la tarea"
            className="mb-3"
            onChange={(dato) => {
              setNombre(dato.target.value);
            }}
          >
            <Form.Control type="text" />
          </FloatingLabel>
          <FloatingLabel
            controlId="documentName"
            label="describe la tarea"
            className="mb-3"
            onChange={(dato) => {
              setDescription(dato.target.value);
            }}
          >
            <Form.Control type="text" />
          </FloatingLabel>
          <FloatingLabel controlId="documentModule" label="Modulo">
            <Form.Control
              type="number"
              min="1"
              max="3"
              className="mb-3"
              onChange={(dato) => {
                setModule(dato.target.value);
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              submitHandler();
              handleClose();
            }}
          >
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Termina Modal-------------------------------------------------------------------------------------------------- */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>modifique solamente los campos que desea modificar</p>
          <Form.Group controlId="formFile" className="mt-3 mb-3">
            <Form.Label>Seleccione el documento que desea subir.</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const archivo = e.target.files[0];
                setNameArchivo(archivo);
              }}
            />
          </Form.Group>
          <FloatingLabel
            controlId="documentName"
            label="describe el documento"
            className="mb-3"
            onChange={(dato) => {
              setDescription(dato.target.value);
            }}
          >
            <Form.Control type="text" />
          </FloatingLabel>
          <FloatingLabel controlId="documentModule" label="Modulo">
            <Form.Control
              type="number"
              min="1"
              max="3"
              className="mb-3"
              onChange={(dato) => {
                if (dato.target.value == 0) {
                  setModule(moduleP);
                } else {
                  setModule(dato.target.value);
                }
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateHandler();
              handleClose2();
            }}
          >
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TareasPag;
