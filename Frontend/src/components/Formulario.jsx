import { useState, useEffect } from "react";
import axios from "axios";

import Titulo from "./Titulo";
import ListaAmigos from "./ListaAmigos";

/** Alertas con React Toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL_API =
  "http://localhost/crud-full-stack-agenda-de-contactos-con-react-php-mysql/Backend-php/";

const Formulario = () => {
  const [amigos, setAmigos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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

  /**
   * La función handleSubirImagen captura el primer archivo seleccionado por el usuario desde un campo de entrada de archivos y lo establece como el archivo seleccionado en el estado del componente.
   */
  const handleSubirImagen = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const manejarEnvioFormulario = async (e) => {
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // Crear una copia de los datos del formulario
    const datosConImagen = { ...datos };

    // Agregar la imagen al objeto datos si existe
    if (selectedFile) {
      datosConImagen.avatar = selectedFile;
    }

    // Console.log solo para verificar los datos en el objeto datosConImagen
    //console.log("Datos del formulario con imagen:", datosConImagen);

    if (selectedFile) {
      try {
        const response = await axios.post(URL_API, datosConImagen, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Respuesta del servidor:", response.data);
        setSelectedFile(null);
        toast.success("Imagen subida correctamente");

        // Limpiar los campos del formulario después de enviar con éxito
        setDatos({
          nombre: "",
          email: "",
          telefono: "",
        });

        obtenerAlumnos();
      } catch (error) {
        console.error("Error al agregar alumno:", error);
      }
    } else {
      console.log("No se ha seleccionado ningún archivo.");
      toast.error("Debe seleccionar una imagen");
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
      <div className="col-md-7">
        <ListaAmigos data={amigos} url_api={URL_API} />
      </div>

      <div className="col-md-5">
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
              onChange={handleSubirImagen}
              accept="image/png, image/jpeg"
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn_add">
              Registrar Amigo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
