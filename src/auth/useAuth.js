import { useContext } from "react";
import { AuthContext } from "./AuthProvider";


// esta carpeta se creo para la funcion que controla los contextvalues de comunicacion
// con los demas componente
export default function useAuth() {
    const contextValue = useContext(AuthContext);
    return contextValue;
}