import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./auth/AuthProvider";
import roles from "./helpers/roles";
import routes from "./helpers/routesHelper";
import Contactanos from "./pages/homePages/Contactanos";
import Home from "./pages/homePages/Home";
import Nosotros from "./pages/homePages/Nosotros";
import Login from "./pages/login/Login";
import admin from "./pages/admin/admin";
import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";
import Error from "./pages/error404/Error";
import Teacher from "./pages/teacher/Teacher";
import Student from "./pages/student/Student";
import UsersAdmin from "./pages/admin/UsersAdmin";
import AdminTable from "./pages/admin/AdminTable";
import UsuarioList from "./components/usuarioList/UsuarioList";
import UsuarioInfo from "./pages/usuario/UsuarioInfo";
import TareasPag from "./pages/Materias/TareasPag";
import ClasesPag from "./pages/Materias/ClasesPag";
import ClasesAdmin from "./components/CLasesAdmin/ClasesAdmin";
import QuizzesPag from "./pages/Materias/QuizzesPag";
import Memoria from "./pages/memoria/memoria";
import Game from "./components/MathGame/MathGame";
import DrawingTool from "./components/pizarra/drawingtool";
import Penciltool from "./components/pizarra/PencilTool";
import Pizzaron from "./components/pizarra/pizarra";
import juegos from "./pages/juegos/juegos";
import MathSum from "./components/MathSum/MathSum";
import MathRes from "./components/MathRes/MathRes";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <UsuarioList>
            <Switch>
              {/* rutas para las clases */}
              
              <PrivateRoute
                hasRole={roles.student}
                path="/student/clases/:id/tareas"
                component={TareasPag}
              />
              <PrivateRoute
                hasRole={roles.teacher}
                path="/teacher/clases/:id/tareas"
                component={TareasPag}
              />
              <PrivateRoute
                hasRole={roles.student}
                path="/student/clases/:id/quizzes"
                component={QuizzesPag}
              />
              <PrivateRoute
                hasRole={roles.teacher}
                path="/teacher/clases/:id/quizzes"
                component={QuizzesPag}
              />
              
              <PrivateRoute
                hasRole={roles.student}
                path="/student/clases/:id"
                component={ClasesPag}
              />
              <PrivateRoute
                hasRole={roles.teacher}
                path="/teacher/clases/:id"
                component={ClasesPag}
              />

              

              {/* fin rutas para las clases */}
              <PrivateRoute
                hasRole={roles.admin}
                path={routes.clases}
                component={ClasesAdmin}
              />
              <PrivateRoute
                hasRole={roles.admin}
                path={routes.admin}
                component={admin}
              />
              <PrivateRoute
                hasRole={roles.admin}
                path={routes.users}
                component={UsersAdmin}
              />

              <PrivateRoute
                hasRole={roles.admin}
                path={routes.adminTable}
                component={AdminTable}
              />
              <PrivateRoute
                hasRole={roles.teacher}
                path={routes.teacher}
                component={Teacher}
              />
              <PrivateRoute
                hasRole={roles.student}
                path={routes.student}
                component={Student}
              />
              <PrivateRoute
                hasRole={roles.student}
                path={routes.usuarioStudent}
                component={UsuarioInfo}
              />
              <PrivateRoute
                hasRole={roles.teacher}
                path={routes.usuarioMaestro}
                component={UsuarioInfo}
              />

              {/* funcion publica donde cualquiera lo puede ver */}
              <PublicRoute
                hasRole={roles.normal}
                path="/pizarra"
                component={Pizzaron}
              />
              <PublicRoute
                hasRole={roles.normal}
                path="/mathGame"
                component={Game}
              />
              <PublicRoute
                hasRole={roles.normal}
                path="/mathRes"
                component={MathRes}
              />
              <PublicRoute
                hasRole={roles.normal}
                path="/mathSum"
                component={MathSum}
              />
              <PublicRoute
                hasRole={roles.normal}
                path="/juegos"
                component={juegos}
              />
              <PublicRoute
                hasRole={roles.normal}
                path="/memoria/:id"
                component={Memoria}
              />
              <PublicRoute
                hasRole={roles.normal}
                path={routes.home}
                exact
                component={Home}
              />
              <PublicRoute
                hasRole={roles.normal}
                path={routes.us}
                component={Nosotros}
              />
              <PublicRoute
                hasRole={roles.normal}
                path={routes.contact}
                component={Contactanos}
              />
              <PublicRoute
                hasRole={roles.normal}
                path={routes.login}
                component={Login}
              />

              <Route path="*" component={Error} />
            </Switch>
          </UsuarioList>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
