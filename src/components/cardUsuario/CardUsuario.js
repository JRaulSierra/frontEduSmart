import React from "react";
import useAuth from "../../auth/useAuth";

function CardUsuario() {
    const { info } = useAuth();
    console.log("este es "+info.name)
  return (
    <div className="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            class="rounded-circle mt-5"
            width="150px"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          />
          <span class="font-weight-bold">#{info.username}</span>
          <span class="text-black-50">{info.email}</span>
          <span> </span>
        </div>
      </div>
      <div class="col-md-5 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Profile</h4>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <label class="labels">Name</label>
              <input
                type="text"
                class="form-control"
                placeholder={info.name}
                value=""
                disabled
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">Password</label>
              <input
                type="text"
                class="form-control"
                placeholder={info.password}
                value=""
                disabled
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">Mobile Number</label>
              <input
                type="text"
                class="form-control"
                placeholder={info.telefono}
                value=""
                disabled
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">Role</label>
              <input
                type="text"
                class="form-control"
                placeholder={info.Role}
                value=""
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-3 py-5">
          <div class="col-md-12">
            <label class="labels">Clases asignadas</label>
            <input
              type="text"
              class="form-control"
              placeholder={info.clases}
              value=""
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardUsuario;
