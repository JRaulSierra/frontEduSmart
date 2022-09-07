import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routesHelper";
// SE CREARAN MAS ROUTES PARA LOS DEMAS USUARIOS, MAESTRO Y ESTUDIANTE ESTA ES SOLAMENTE PARA ADMIN
// esta funcion es creada para administrar los usuarios privados,
// este manda a traer funciones de AuthProvider para su funcionamiento
function PrivateRoute({ hasRole: role, uuser, pass, ...props }) {
  const location = useLocation();
  // funciones de AuthProvider que utilizaremos y mandaremos a llamar gracias al context
  const { hasRole, isLogged, user, setUser } = useAuth();
  if (pass) {
    setUser(uuser);
    return <Route {...props} />;
  }
  //   Si existe role y al llamar la funcion hasRole es falsa ingresara-+

  if (role && !hasRole(role)) {
    return <Redirect to={routes.login} />;
  }

  if (!isLogged()) {
    return (
      <Redirect to={{ pathname: routes.login, state: { from: location } }} />
    );
  }

  return <Route {...props} />;
}

export default PrivateRoute;
