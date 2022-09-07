import React, { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./cardStyle.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { app } from "../../config/fb-config";

function CardClases(props) {
  const { user, setUser } = useAuth();

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  // --------------------------------------------------------------------------- area update
  const [images, setImage] = useState("");
  const [descrip, Setdescrip] = useState("");

  const image = props.clase.imagen;

  const deleteHandler = async (c) => {
    await fetch("backedusmart-educasmart.up.railway.app/clases/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clase: { c },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Clase Modificada con exito",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const updateHandler = async () => {
    if (images.name !== undefined) {
      if (!/\.(jpg|png|gif|jpg)$/i.test(images.name)) {
        alert("El archivo a adjuntar no es una imagen");
        return;
      } else {
        const storageRef = app.storage().ref();
        const archivoPath = storageRef.child(
          `clase${props.clase.clase}/${images.name}`
        );
        await archivoPath.put(images);
        const enlaceURL = await archivoPath.getDownloadURL();
        await fetch("backedusmart-educasmart.up.railway.app/clases/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            img: enlaceURL,
            descripcion: descrip,
            key: props.clase.clase,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Clase Modificada con exito",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    } else {
      await fetch("backedusmart-educasmart.up.railway.app/clases/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          img: image,
          descripcion: descrip,
          key: props.clase.clase,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Clase Modificada con exito",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  function print() {
    if (user.role === "admin") {
      return (
        <Col>
          <Card border="light" style={{ width: "18rem" }}>
            <Card.Header as="h5">{props.clase.clase}</Card.Header>
            <Card.Img
              variant="top"
              src={image}
              alt="..."
              style={{ height: "144px" }}
            />
            <Card.Body>
              <Card.Text>
                <p>{props.clase.informacion_clase}</p>
              </Card.Text>

              <Button
                variant="warning"
                className="ml-3 mr-5"
                onClick={handleShow}
              >
                Modificar
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  deleteHandler(props.clase.clase);
                }}
              >
                Eliminar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return (
      <Col>
        <Card border="light" style={{ width: "18rem" }}>
          <Card.Header as="h5">{props.clase.clase}</Card.Header>
          <Card.Img
            variant="top"
            src={image}
            alt="..."
            style={{ height: "144px" }}
          />
          <Card.Body>
            <Card.Text>
              <p>{props.clase.informacion_clase}</p>
            </Card.Text>
            <Button variant="outline-primary">
              <Link to={`/${user.role}/clases/${props.clase.clase}`}>
                Ir a la clase
              </Link>
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
  return (
    <div>
      {print()}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar materia {props.clase.clase}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingPassword"
            label={props.clase.informacion_clase}
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="fsd"
              onChange={(dato) => {
                Setdescrip(dato.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingimage">
            <Form.Control
              type="file"
              onChange={(dato) => {
                console.log(dato.target.files[0]);
                setImage(dato.target.files[0]);
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
              updateHandler();
              handleClose();
            }}
          >
            Modificar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CardClases;
