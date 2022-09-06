import React from "react";
import Button from "react-bootstrap/Button";

export default function Swatch({ setToolType }) {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div>
          {" "}
            <Button
              variant="success"
              title="Pencil"
              onClick={() => {
                setToolType("pencil");
              }}
            >
              Pencil
            </Button>{" "}
            <Button
              variant="success"
              title="Line"
              onClick={() => {
                setToolType("line");
              }}
            >
              Line
            </Button>
            <Button
              variant="success"
              title="Line"
              onClick={() => {
                window.location.reload();
              }}
            >
              Borrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
