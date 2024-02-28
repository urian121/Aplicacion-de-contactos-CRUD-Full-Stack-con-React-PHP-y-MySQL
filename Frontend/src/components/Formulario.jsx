import { useState, useEffect } from "react";
import axios from "axios";

import Titulo from "./Titulo";
import GridIzquierdo from "./GridIzquierdo";

/** Alertas con React Toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Formulario = () => {
  const URL_API = "http://localhost/backend-php/";
  const [amigos, setAmigos] = useState([]);

  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const manejarCambioInput = (e) => {
    /*
    console.log(e.target);
    console.log(e.target.name, e.target.value);
    */

    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const manejarEnvioFormulario = async (e) => {
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario
    console.log("Datos del formulario:", datos);

    try {
      const response = await axios.post(URL_API, datos);
      toast.success("Alumno registrado correctamente.");
      console.log("Alumno agregado:", response.data);

      //obtenerAlumnos();
    } catch (error) {
      console.error("Error al agregar alumno:", error);
    }
  };

  useEffect(() => {
    // Obtener lista de alumnos al cargar la página
    obtenerAlumnos();
  }, []);

  const obtenerAlumnos = async () => {
    try {
      const response = await axios.get(URL_API);
      setAmigos(response.data);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
    }
  };

  return (
    <div className="row justify-content-md-center">
      <Titulo />
      <ToastContainer />
      <div className="col-md-7 contenedor_amigos">
        <GridIzquierdo data={amigos} />
      </div>

      <div className="col-md-5 px-3">
        <h2 className="text-center mb-3">Registrar Amigo</h2>
        <form
          className="px-5"
          onSubmit={manejarEnvioFormulario}
          method="POST"
          encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              onChange={manejarCambioInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={manejarCambioInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Télefono</label>
            <input
              type="number"
              name="telefono"
              className="form-control"
              onChange={manejarCambioInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formFileSm" className="form-label">
              Avatar
            </label>
            <input
              className="form-control form-control-sm"
              id="formFileSm"
              type="file"
              name="avatar"
              onChange={manejarCambioInput}
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-primary">
              Registrar Amigo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
