import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css';
import "../../components/admin/DashboardStyle.css" 
import Navbar from "../../components/admin/Navbar";
import Dashboard from "../../components/admin/Dashboard";



function admin() {

  return (
    <div className="dashboard d-flex">
      <div><Navbar user="Administrador"/></div>
      <div className="dashContainer"><Dashboard/></div>
    </div>

  );
}

export default admin;
