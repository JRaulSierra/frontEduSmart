import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "../../components/Card/Card";
import Navbar from "../admin/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { app } from "../../config/fb-config";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function ClasesAdmin(props) {
  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [image, setImage] = useState("");
  const [nombre, Setnombre] = useState("");
  const [descrip, Setdescrip] = useState("");

  useEffect(() => {
    fetch("backedusmart-educasmart.up.railway.app/clases/clasesData")
      .then((res) => res.json())
      .then((clases) => {
        setData(clases);
      });
  });

  let print = [];
  if (data !== 0) {
    for (let i = 0; i < data.length; i++) {
      print.push(<Card clase={data[i]}></Card>);
    }
  } else {
    print.push(<Card clase={data}></Card>);
  }

  const actionHandler = async () => {
    if (!/\.(jpg|png|gif)$/i.test(image.name)) {
      alert("El archivo a adjuntar no es una imagen");
      return;
    } else {
      const storageRef = app.storage().ref();
      const archivoPath = storageRef.child(`clase${nombre}/${image.name}`);
      await archivoPath.put(image);
      const enlaceURL = await archivoPath.getDownloadURL();
      await fetch("backedusmart-educasmart.up.railway.app/clases/crearClase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          img: enlaceURL,
          nombre: nombre,
          descripcion: descrip,
        }),
      });
    }
  };

  return (
    <div className="dashboard d-flex">
      <div>
        <Navbar user="Administrador" />
      </div>
      <Button className="" variant="primary" onClick={handleShow}>
        Agregar Nueva Clase
      </Button>
      <div>
        <Row xs={1} md={3} className="g-2 m-2">
          {print}
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Materia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Nombre de la clase"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onChange={(dato) => {
                Setnombre(dato.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Descripcion de la clase"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onChange={(dato) => {
                Setdescrip(dato.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingimage">
            <Form.Control
              type="file"
              onChange={(dato) => {
                setImage(dato.target.files[0]);
              }}
            />
          </FloatingLabel>
          {/* <Form.Group controlId="formFile" className="mt-3">
            <Form.Label>Seleccione una imagen de referencia</Form.Label>
            <Form.Control
              type="file"
              onChange={(dato) => {
                var reader = new FileReader();
                var url = reader.readAsDataURL(dato.target.files[0]);
                setImage(url);
              }}
            />
          </Form.Group> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              actionHandler();
              handleClose();
            }}
          >
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClasesAdmin;
