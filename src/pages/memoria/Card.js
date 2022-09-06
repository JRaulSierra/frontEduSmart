import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import backimage from "./images/imagen-fondo.jpg";

const Card = ({
  name,
  number,
  imagen,
  voltearCard,
  unflippedCards,
  disabledCards,
}) => {
  //creacion del estado, inicializado en false
  const [isFlip, setFlip] = useState(false);
  const [hasEvent, setHasEvent] = useState(true);

  // ejecuta en todo Momento para hacer voltear las cartas si unflippedCards regresa un num
  useEffect(() => {
    if (unflippedCards.includes(number)) {
      setTimeout(() => setFlip(false), 700);
    }
  }, [unflippedCards]);

  // ejecuta en todo Momento para hacer voltear las cartas si disabledCards regresa un num
  useEffect(() => {
    if (disabledCards.includes(number)) {
      setHasEvent(false);
    }
  }, [disabledCards]);

  // cada vez que se realiza un click esta funcion se ejecuta
  const handlerClick = (e) => {
    // mando a llamar voltearCard para obtener un valor para que no voltee, 1 si los creo y 0 si ya estaba seleccionado y asi no hacer ninguna modificacion
    const val = voltearCard(name, number);
    if (val !== 0) {
      setFlip(!isFlip);
    }
  };

  return (
    <div className="card12">
      <ReactCardFlip isFlipped={isFlip}>
        <img
          className="card-image12"
          src={backimage}
          alt="fondo"
          onClick={hasEvent ? handlerClick : null}
        ></img>
        <img
          className="card-image12"
          src={imagen}
          alt="frontimagen"
          onClick={hasEvent ? handlerClick : null}
        ></img>
      </ReactCardFlip>
    </div>
  );
};

export default Card;