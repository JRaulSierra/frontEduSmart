import React, { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";
import CardClases from "../../components/Card/Card";
import Row from "react-bootstrap/Row";
import NavUser from "../../components/navUsers/NavUser";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function Teacher(props) {
  const { info } = useAuth();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://backedusmart-educasmart.up.railway.app/clases/clasesData")
      .then((res) => res.json())
      .then((clases) => {
        setData(clases);
      });
  }, []);
  let print = [];
  if (data !== 0) {
    for (let i = 0; i < data.length; i++) {
      console.log("entroasdf");
      print.push(<CardClases clase={data[i]}></CardClases>);
    }
  } else {
    print.push(<CardClases clase={data}></CardClases>);
  }

  const actionHandler = () => {};

  return (
    <div className="dashboard d-flex">
      <div>
        <NavUser name={info.Role} />
      </div>
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
            <Form.Control type="text"  />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Descripcion de la clase">
            <Form.Control type="text"  />
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>Seleccione una imagen de referencia</Form.Label>
          <Form.Control type="file" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Teacher;
