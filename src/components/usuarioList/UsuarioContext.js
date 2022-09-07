import { useContext } from 'react';
import { userContext } from "./UsuarioList";

export default function useUser() {
    const contextValue = useContext(userContext);
    return contextValue;
};

