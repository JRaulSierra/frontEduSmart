import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../auth/useAuth';


function PublicRoute(props) {
    // funcion que obtenemos de AuthContext
    const {isLogged,user} = useAuth();
    // funcion de si esta logeado
    if (isLogged()) {
         return <Redirect to={`/${user.role}`}/>
    }
    return (
        <Route {...props}/>
    );
}

export default PublicRoute;