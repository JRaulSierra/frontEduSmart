import React from "react";
import MainNavigation from "../../components/navBar/MainNavigation";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function juegos(props) {
  return (
    <div>
      <MainNavigation />
      <div
        style={{
          width: "100vw",
          height: "65vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <div style={{ width: "80vw", height: "65vh" }}>
          <Carousel fade variant="dark">
            <Carousel.Item>
              <img
                style={{ width: "80vw", height: "65vh" }}
                className="d-block w-100"
                src="https://smallbusiness.com/wp-content/uploads/2014/02/shapes_square-2.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <Button variant="primary" size="lg">
                  <Link to="/pizarra" style={{ color: "black" }}>
                    Ir al juego WhiteBoard
                  </Link>
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ width: "80vw", height: "65vh" }}
                className="d-block w-100"
                src="https://cdn5.dibujos.net/dibujos/pintados/201524/pizarra-escolar-colegio-10012147.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                <Button variant="primary" size="lg">
                  <Link to="/mathGame" style={{ color: "black" }}>
                    Ir al juego Multiplicación
                  </Link>
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ width: "80vw", height: "65vh" }}
                className="d-block w-100"
                src="https://cdn5.dibujos.net/dibujos/pintados/201238/12=3-colegio-pintado-por-ale05-9771330.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <Button variant="primary" size="lg">
                  <Link to="/mathSum" style={{ color: "black" }}>
                    Ir al juego Suma
                  </Link>
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ width: "80vw", height: "65vh" }}
                className="d-block w-100"
                src="https://i1.sndcdn.com/artworks-Z2XBOAKyDbEkMqMG-1D4yfg-t500x500.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <Button variant="primary" size="lg">
                  <Link to="/mathRes" style={{ color: "black" }}>
                    Ir al juego Resta
                  </Link>
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default juegos;
