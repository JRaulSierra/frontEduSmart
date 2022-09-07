import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import firebaseConfig from "../config/firebase";

initializeApp(firebaseConfig);
const auth = getAuth();

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null);
  // el history sirve para cuando se quiera ingresar a un url regrese al ultimo ingresado
  const history = useHistory();

  // esta es la funcion con la que realizaremos el login y las utenticaciones
  const login = (userCredentials, fromLocation) => {
    fetch("backedusmart-educasmart.up.railway.app/access/accessApprove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userCredentials}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //     // ------------------------------------------------------------
        if (data.activo) {
          setInfo(data);
          setUser({ role: data.Role });
          if (fromLocation) {
            history.push(fromLocation);
          }
        } else {
          return (
            alert(
              "Usuario no Registrado o no Activo, contactar al administrador "
            ),
            console.log("error usuario")
          );
        }
      });
  };

  // Para cuando se realice un logout el usuario regrese a ser null
  const logout = () => {
     signOut(auth);
     Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cerrando Sesion',
      showConfirmButton: false,
      timer: 1500
    }).then((result)=>{
      setUser(null);
    })
  };

  const isLogged = () => !!user;

  // funcion para verificar si el usuario y el rol cumplen
  const hasRole = (role) => user?.role === role;

  // context value para la comunicacion entre los demas componentes
  const contextValue = { user, isLogged, hasRole, login, logout, info,setUser };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
