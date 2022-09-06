import React from "react";
import "./Error.css";

function Error(props) {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <div></div>
          <h1>404</h1>
        </div>
        <h2>Page not found</h2>
        <p>La pagina que buscas ha sido removida o no exite.</p>
        <a href="/">EducaSmart</a>
      </div>
    </div>
  );
}

export default Error;
