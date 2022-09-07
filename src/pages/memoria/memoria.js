import React, { useState, useEffect } from "react";
import "./MemoriaStyle.css";
import Card from "./Card";
import { images } from "./import";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import useAuth from "../../auth/useAuth";
import { app } from "../../config/fb-config";
import Swal from "sweetalert2";

function Memoria() {
  // estados
  const [cards, setCards] = useState([]);
  // lo utilizaremos para manejar los estados de las cartas encontradas
  const [primeraCarta, setPrimeraCarta] = useState({});
  const [segudaCarta, setSegundaCarta] = useState({});
  const [documentos, setDocumentos] = useState([]);
  const [unflippedCards, setUnflippedCards] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);
  const [conteo, setConteo] = useState(0);
  const [Imm,setImm]=useState("")
  // funcion para randomizar el arreglo.
  const randomArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  let img = [];
  const clase = useParams();
  useEffect(() => {
    async function fetching() {
      const docuList = await app.firestore().collection("quiz").get();
      let doc = docuList.docs.map((doc) => doc.data());
      doc.map((d) => {
        if (d.nombre === clase.id) {
          img.push({ src: d.urlImg1, name: "img1" });
          img.push({ src: d.urlImg1, name: "img1" });
          img.push({ src: d.urlImg2, name: "img2" });
          img.push({ src: d.urlImg2, name: "img2" });
          img.push({ src: d.urlImg3, name: "img3" });
          img.push({ src: d.urlImg3, name: "img3" });
        }
      });
      randomArray(img);
      setCards(img);
    }
    fetching();
  }, []);

  useEffect(() => {
    validarMatch();
  }, [segudaCarta]);

  // funcion que manejara las cartas volteadas
  const voltearCard = (name, number) => {
    // este no me permite volver a voltear la misma carta que ya esta volteada.
    if (primeraCarta.name === name && primeraCarta.number === number) {
      return 0;
    }
    // utilizamos este if para identificar y asignar la primera carta y la segunda carta
    if (!primeraCarta.name) {
      // es identificar si existe algun dato en primeraCarta.name
      setPrimeraCarta({ name, number });
    } else if (!segudaCarta.name) {
      setSegundaCarta({ name, number });
    }
    return 1;
  };

  // funcion creada para la validar si hacen match
  const validarMatch = () => {
    if (primeraCarta.name && segudaCarta.name) {
      const match = primeraCarta.name === segudaCarta.name;
      // operador terneario para verificar match
      // si es true          si no
      match ? desabilitarCards() : voltearRegreso();
    }
  };

  if (conteo === 3) {
    Swal.fire({
      title: "Felicidades Encontraste todos los pares :D. Tienes 3/3",
      width: 600,
      padding: "3em",
      background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    }).then(() => {
      window.location.reload();
    });
  }

  // funcion para desabilitar cartas iguales
  const desabilitarCards = () => {
    setDisabledCards([primeraCarta.number, segudaCarta.number]);
    setConteo(conteo + 1);
    ResetCards();
  };
  // funcion para regresarlas a la normalidad si no hacen match
  const voltearRegreso = () => {
    setUnflippedCards([primeraCarta.number, segudaCarta.number]);
    ResetCards();
  };

  // para resetear los arreglos y asi volver a hacer comparaciones
  const ResetCards = () => {
    setPrimeraCarta({});
    setSegundaCarta({});
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }} className="cont">
      <Link
        style={{ margin: "10px", border: "20px", background: "white" }}
        className="nav-link"
        to={`/log`}
      >
        Regresar
      </Link>
      <h1 style={{ color: "white" }}>{conteo}</h1>
      <div className="cards-container12">
        {}
        {cards.map((cards, index) => (
          <Card
            name={cards.name}
            number={index}
            imagen={cards.src}
            voltearCard={voltearCard}
            unflippedCards={unflippedCards}
            disabledCards={disabledCards}
          />
        ))}
      </div>
    </div>
  );
}

export default Memoria;
