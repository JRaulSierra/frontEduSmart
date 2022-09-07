import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "./navBarusers.css";
import routes from "../../helpers/routesHelper";
import "bootstrap/dist/css/bootstrap.min.css";

const NavUser = (props) => {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [image, setImage] = useState("");
  const [nombre, Setnombre] = useState("");
  const [descrip, Setdescrip] = useState("");
  // gracias a context podrmos mandar a llamar la funcion logout que se encuentra en
  // el autorizationProvider
  const { logout, user } = useAuth();
  let dash = "";
  if (user.role === "admin") {
    dash = routes.admin;
  } else if (user.role === "student") {
    dash = routes.student;
  } else if (user.role === "teacher") {
    dash = routes.teacher;
  }

  function clases() {
    if (user.role === "admin") {
      return (
        <NavLink
          exact
          to={routes.clases}
          activeClassName={false}
          activeStyle={{
            color: "#007bff",
            pointerEvents: "none",
          }}
        >
          <CDBSidebarMenuItem icon="user">clases</CDBSidebarMenuItem>
        </NavLink>
      );
    }
    return <></>;
  }

  function meeting() {
    if (user.role === "teacher") {
      return (
        <div><a
        style={{ "margin": "14%","display":"flex"}}
        href="https://meet.google.com/vvj-gybd-vjy?pli=1&authuser=1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-camera-video"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
          />
        </svg>
        <h6 style={{ "margin-left": "10px" }}>Meeting</h6>
      </a></div>
      );
    } else if (user.role === "student") {
      return (
        <div><a
        style={{ "margin": "14%","display":"flex"}}
        href="https://meet.google.com/vvj-gybd-vjy?pli=1&authuser=1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-camera-video"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
          />
        </svg>
        <h6 style={{ "margin-left": "10px" }}>Meeting</h6>
      </a></div>
        
      );
    }
    return <></>;
  }

  function usuario() {
    if (user.role === "admin") {
      return (
        <NavLink
          exact
          to={routes.users}
          activeClassName={false}
          activeStyle={{
            color: "#007bff",
            pointerEvents: "none",
          }}
        >
          <CDBSidebarMenuItem icon="user">Usuarios</CDBSidebarMenuItem>
        </NavLink>
      );
    } else if (user.role === "student") {
      return (
        <NavLink
          exact
          to={routes.usuarioStudent}
          activeClassName={false}
          activeStyle={{
            color: "#007bff",
            pointerEvents: "none",
          }}
        >
          <CDBSidebarMenuItem icon="address-card">Usuario</CDBSidebarMenuItem>
        </NavLink>
      );
    } else if (user.role === "teacher") {
      return (
        <NavLink
          exact
          to={routes.usuarioMaestro}
          activeClassName={false}
          activeStyle={{
            color: "#007bff",
            pointerEvents: "none",
          }}
        >
          <CDBSidebarMenuItem icon="address-card">Usuario</CDBSidebarMenuItem>
        </NavLink>
      );
    }
  }

  function op() {
    if (user.role === "admin") {
      return (
        <NavLink
          exact
          to={routes.adminTable}
          activeClassName={false}
          activeStyle={{
            color: "#007bff",
            pointerEvents: "none",
          }}
        >
          <CDBSidebarMenuItem icon="table">Tablas</CDBSidebarMenuItem>
        </NavLink>
      );
    }
    return <></>;
  }

  return (
    <div>
      <div className="navUser-i">
        <CDBSidebar textColor="#fff" backgroundColor="#1D2242">
          <div className="letra">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <h1>{props.name}</h1>
            </CDBSidebarHeader>
          </div>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                exact
                to={dash}
                activeClassName={false}
                activeStyle={{
                  color: "#007bff",
                  pointerEvents: "none",
                }}
              >
                <CDBSidebarMenuItem icon="columns">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              {usuario()}
              {op()}
              {clases()}
              {meeting()}
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter className="pl-0" style={{ textAlign: "center" }}>
            <div
              className="pl-0 sidebar-btn-wrapper"
              style={{
                padding: "20px 5px",
              }}
            >
              <NavLink to="/log" onClick={logout} className="pl-0">
                <CDBSidebarMenuItem className="pl-0">
                  <p> Cerrar Sesion</p>
                </CDBSidebarMenuItem>
              </NavLink>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default NavUser;
