import { createContext, useState } from "react";

import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import firebaseConfig from "../../config/firebase";

initializeApp(firebaseConfig);
const auth = getAuth();

export const userContext = createContext();

export default function UsuarioList({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [materiasEstudiantes, setMateriasEstudiantes] = useState([]);
  const [materiasMaestros, setMateriasMaestros] = useState([]);

  const recibirDatos = () => {
    fetch("http://backedusmart-educasmart.up.railway.app/updateUsuarios/usuarios")
      .then((res) => res.json())
      .then((info) => letsTry(info));
  };

  function letsTry(data) {
    setUsers(data);
    let naturalesStudent = 0;
    let matematicasStudent = 0;
    let lenguajeStudent = 0;
    let naturalesTeacher = 0;
    let matematicasTeacher = 0;
    let lenguajeTeacher = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].Role === "student") {
        naturalesStudent = naturalesStudent + 1;
        console.log(naturalesStudent);
      } else if (data[i].Role === "teacher") {
        lenguajeStudent = lenguajeStudent + 1;
        console.log(lenguajeStudent);
      }
    }
  }

  // en este hacemos la actualizacion de los datos en nuestro json de bacjend futuro nuestro DB
  const updateDatos = (User) => {
    fetch("https://backedusmart-educasmart.up.railway.app/updateUsuarios/modify", {
      method: "POST",
      body: JSON.stringify({ User }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    // .then((data) => console.log(data));
  };

  const deleteDatos = (User) => {
    // console.log("asdfasdf"+ User.email)
    fetch("https://backedusmart-educasmart.up.railway.app/deleteUsuarios/delete", {
      method: "POST",
      body: JSON.stringify({ User }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  // en este mandamos los datos del nuevo usuario que vamos a crear en firebase
  const createDatos = async (User) => {
    // console.log("ESTE ES EL USUARIO" + User.email);
    // const dato = User;
    // console.log("ESTE ES EL USUARIO" + dato.email);
    await fetch("https://backedusmart-educasmart.up.railway.app/updateUsuarios/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ User }),
    }).then((res) => res.json());
    // .then((data) => console.log(data));
  };

  const contextValue = {
    recibirDatos,
    users,
    updateDatos,
    deleteDatos,
    createDatos,
  };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
}
