import { Link, useLocation } from "react-router-dom";
import img from "../../images/nave.svg";
import "./Log.css";
import useAuth from "../../auth/useAuth";
import { CDBLink } from "cdbreact";
import useUser from "../usuarioList/UsuarioContext";

import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import firebaseConfig from "../../config/firebase";


initializeApp(firebaseConfig);
const auth = getAuth();

function LogIn() {
  const { recibirDatos } = useUser();
  const location = useLocation();
  const { login } = useAuth();
  const [user, loading, error] = useAuthState(auth);
  let accessToken = user && user.accessToken;
  
  

  if (accessToken) {
    try {
      login(accessToken, location.state?.from);
    } catch (error) {
      console.log(error)
    }
  }
  
  //  estas constantes son creadas para hacer uso del context que esta en
  //  AuthProvider

  

  function signIn(usuario,pass) {
    signInWithEmailAndPassword(auth, usuario, pass).catch((error) => {
      alert("Usuario o Contraseña incorrecta ");
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const usuario = event.target.usuario.value;
    const pass = event.target.pass.value;
    // signOut(auth)
    signIn(usuario,pass);
    recibirDatos();
  }

  return (
    <div>
      <header className="header">
        <div>
          <Link to="/">
            <h1>EducaSmart</h1>
          </Link>
        </div>
      </header>
      <div className="cardlog">
        <form className="log" onSubmit={handleSubmit}>
          <h2>Inicio de sesion</h2>
          <div className="form-floating ">
            <input
              className="inputt form-control mb-3"
              type="email"
              autoComplete="off"
              name="usuario"
              placeholder="email"
              required
            />
            <input
              className="inputt form-control mb-2 "
              type="password"
              name="pass"
              autoComplete="off"
              placeholder="Contraseña"
              required
            />
          </div>
          {/* en el onClick se manda a llamar una funcion a la cual le mandamos los datos de credenciales y el local state
          que es el que se utiliza si se viene de otra direccion y al logearse se regresa a esa onClick={()=>login(userCredentials, location.state?.from) */}
          <input className="button" type="submit" value="Log In" />
          <div className="recuperar">
            <p>Recuperar Contraseña</p>
            <CDBLink to="#">ClickAqui!</CDBLink>
          </div>
        </form>
        <div>
          <div className="img">
            <img src={img} alt="esta imagen corresponde a login, es una nave" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
