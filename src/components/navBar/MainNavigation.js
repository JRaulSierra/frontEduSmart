import style from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import routes from "../../helpers/routesHelper";

// funcion donde podremos trasladarnos de pantallas solamente en el
// Main, no se ha ingresado a ningun usuario

function MainNavigation() {
  return (
    <header className={style.header}>
      <div className={style.logo}><Link to={routes.home}><h1>EducaSmart</h1></Link></div>
      <nav>
        <ul>
          <li><Link to={routes.us}>Nosotros</Link></li>
          <li><Link to={routes.contact}>Contactanos</Link></li>
          <li><Link to="/juegos">Juegos</Link></li>
          <div className={style.login}><li><Link to={routes.login}>Login</Link></li></div>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
