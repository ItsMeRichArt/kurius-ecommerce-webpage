import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const RestorePassword = () => {
  const { store, actions } = useContext(Context);
  
  const restoreDisplay = () => {
		if (true){
			return (
				<>
					<form onSubmit={(e) => restore(e)}>
            <div className=" d-flex flex-column bd-highlight mb-3">
              <div className="d-flex">
                <h5 className="col-4 text-end pe-3">Email:</h5>
                <input
                  className="col-6"
                  name="email"
                  placeholder="Escriba el email registrado"
                  type="email"
                />
              </div>
            </div>
            <button className="btn buttonRegister" type="submit">
              Enviar
            </button>
          </form>
				</>
			)
		}
		return (
			<>
				<Link to="/login">
					<button type="button" className="btn btn-outline-light me-2">Login</button>
				</Link>
				<Link to="/signup">
					<button type="button" className="btn btn-warning">Sign-up</button>
				</Link>
			</>
		)
	}

  const restore = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let email = data.get("email");
    let restoreData = { email: email }
    let response = await actions.restoreGET(restoreData)
    console.log(response)
    if (response.message == "User found") {
      let response = await actions.restoreGET(restoreData)
      //definir las acciones que se harán
      //flaskmail?
    } else {
      response = await response.json();
      console.log(response.message)
      alert("Email no registrado");
      return;
    }
  }
  
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center letraKurius"
        style={{ minHeight: "40vw", maxHeight: "100%", marginTop: "5%" }}
      >
        <div className="card text-center border-0" style={{ minWidth: "50%", maxWidth: "100%", maxHeight: "100%" }}>
          <div className="card-header cabezoteRegistro" style={{ width: "100%" }}>
            <h3>Recuperar contraseña</h3>
          </div>
          <div className="card-body cajatextoRegistro" style={{ width: "100%" }}>
            
          </div>
        </div>
      </div>
    </>
  );
};