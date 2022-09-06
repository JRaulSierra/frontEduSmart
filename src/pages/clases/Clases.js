// import React, { useState } from "react";
// import NavUser from "../../components/navUsers/NavUser";
// import useAuth from "../../auth/useAuth";
// import useUser from "../../components/usuarioList/UsuarioContext";

// import "bootstrap/dist/css/bootstrap.css";

// function Clases() {
//   const [abierto, setabierto] = useState(false);
//   const [button, setbutton] = useState([]);
//   const { info } = useAuth();
//   const { users } = useUser();

//   const abrirModal = () => {
//     setabierto(true);
//   };

//   function asdf() {
//     buttonModify();
//   }

//   function buttonModify() {
//     setbutton(
//       <div>
//         <button className="btn btn-primary" onClick={abrirModal()}>
//           Agregar Tarea
//         </button>
//       </div>
//     );
//   }
//   const modalStyles = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//   };

//   return (
//     <div className="dashboard d-flex">
//       <div>
//         <NavUser name={info.Role} />
//       </div>
//       <div class="container m-4 p-3 d-flex bg-white justify-content-center">
//         <div class="mb-3 row">
//           <div className="col">
//             <select class="form-select" aria-label="Default select example">
//               <option selected>Seleccione la clase</option>
//               <option value="1">Naturales</option>
//               <option value="2">Matematicas</option>
//               <option value="3">Sociales</option>
//             </select>
//           </div>
//           <div className="col">
//             <button className="btn btn-primary" onClick={() => asdf()}>
//               Buscar
//             </button>
//           </div>
//         </div>
//         {button}
//         {/* <div><Modal isOpen={abierto} style={modalStyles}>
//         <ModalHeader>Iniciar Sesión</ModalHeader>
//         <ModalBody>
//           <FormGroup>
//             <Label for="usuario">Usuario</Label>
//             <Input type="text" id="usuario" />
//           </FormGroup>
//           <FormGroup>
//             <Label for="password">Contraseña</Label>
//             <Input type="text" id="password" />
//           </FormGroup>
//         </ModalBody>

//         <ModalFooter>
//           <Button color="primary">Iniciar Sesión</Button>
//           <Button color="secondary" onClick={setabierto(false)}>
//             Cerrar
//           </Button>
//         </ModalFooter>
//       </Modal></div> */}
//       </div>
      
//     </div>
//   );
// }

// export default Clases;
