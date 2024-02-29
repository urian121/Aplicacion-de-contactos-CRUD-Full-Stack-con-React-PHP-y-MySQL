import { useState, useEffect } from "react";
import axios from "axios";

import ListaAmigos from "./ListaAmigos";
import Titulo from "./Titulo";
import FormularioRegistro from "./FormularioRegistro";

/** Alertas con React Toastify */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL_API =
  "http://localhost/crud-full-stack-agenda-de-contactos-con-react-php-mysql/Backend-php/";

const HomePage = () => {
  const [amigos, setAmigos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editarContacto, setEditarContacto] = useState(false);

  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const manejarCambioInput = (e) => {
    console.log(e.target.name, e.target.value);
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * La función handleSubirImagen captura el primer archivo seleccionado por el usuario desde un campo de entrada de
   * archivos y lo establece como el archivo seleccionado en el estado del componente.
   */
  const handleSubirImagen = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const manejarEnvioFormulario = async (e) => {
    e.preventDefault();

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
        /* setDatos({
          nombre: "",
          email: "",
          telefono: "",
        });*/

        obtenerContactos();
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
    obtenerContactos();
  }, []);

  const obtenerContactos = async () => {
    try {
      const response = await axios.get(URL_API);
      setAmigos(response.data);
    } catch (error) {
      console.error("Error al obtener los contactos:", error);
    }
  };

  const eliminarContacto = async (id) => {
    try {
      const response = await axios.delete(`${URL_API}/?id=${id}`);
      console.log("Contacto eliminado:", response.data);
      toast.error("Contacto eliminado correctamente.");
      // Actualizar la lista de acontactos
      obtenerContactos();
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };

  const obtenerContactoParaEditar = async (id) => {
    try {
      const response = await axios.get(`${URL_API}?id=${id}`);
      console.log("datos del contacto:", response.data);
      setEditarContacto(true);
      //const idContacto = response.data.id;

      /**
       * Opcion 1: Establecer los valores de los campos del formulario
       */
      /*
      setDatos({
        nombre: response.data.nombre,
        email: response.data.email,
        telefono: response.data.telefono,
        id: idContacto,
      });
      */

      /**
       * Opcion 2: Crear una copia de los datos existentes y agregar el campo id, que pertence al contacto que se va a editar
       */
      setDatos({
        ...response.data,
        //id: idContacto,
      });

      // Establecer el archivo seleccionado en el estado del componente
      setSelectedFile(response.data.avatar);
    } catch (error) {
      console.error("Error al obtener los datos del contacto:", error);
    }
  };

  /**
   * La función manejarUpdateFormulario se ejecuta cuando el usuario hace clic en el botón de actualizar.
   */
  const manejarUpdateFormulario = async (e) => {
    e.preventDefault();
    // console.log("Recibiendo datos para actualizar el contacto", datos);
    console.log(datos);
    console.log(selectedFile);

    try {
      /*  const formData = new FormData(); // Objeto FormData para enviar datos y archivos

      formData.append("id", datos.id);
      formData.append("nombre", datos.nombre);
      formData.append("email", datos.email);
      formData.append("telefono", datos.telefono);
      formData.append("avatar", datos.avatar);
      */

      const informData = { ...datos };
      //Imagen default de la base de datos
      let avatarBD = datos.avatar;
      if (avatarBD == selectedFile) {
        delete datos.avatar;
        console.log("no se actualiza la imagen");
      } else {
        informData.avatar = selectedFile;
        console.log("se actualiza la imagen");
      }

      console.log(informData);
      // Realizar la solicitud PUT al backend con FormData
      /*
      const response = await axios.put(`${URL_API}${datos.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Respuesta de la API:", response.data);
      toast.success("Contacto actualizado correctamente.");

      obtenerContactos();
      setEditarContacto(false);
      */
    } catch (error) {
      console.error("Error al actualizar los datos del contacto:", error);
    }
  };

  const volverHome = () => {
    console.log("culoooo");
    console.log(editarContacto);
    setEditarContacto(false);
    setSelectedFile(null);
    setDatos({
      nombre: "",
      email: "",
      telefono: "",
    });
  };

  return (
    <div className="row justify-content-md-center">
      <Titulo />
      <ToastContainer />
      <div className="col-md-7">
        <ListaAmigos
          data={amigos}
          url_api={URL_API}
          eliminarContacto={eliminarContacto}
          obtenerContactoParaEditar={obtenerContactoParaEditar}
        />
      </div>

      <div className="col-md-5">
        <h2 className="text-center mb-3">
          {editarContacto ? (
            <>
              <i
                className="bi bi-arrow-left-circle"
                onClick={volverHome}
                style={{ cursor: "pointer", float: "left" }}></i>{" "}
              Editar Contacto
            </>
          ) : (
            "Registrar Contacto"
          )}
        </h2>

        <FormularioRegistro
          manejarEnvioFormulario={manejarEnvioFormulario}
          manejarCambioInput={manejarCambioInput}
          handleSubirImagen={handleSubirImagen}
          status_btn={editarContacto}
          infoContacto={datos}
          selectedFile={selectedFile}
          url_api={URL_API}
          manejarUpdateFormulario={manejarUpdateFormulario}
        />
      </div>
    </div>
  );
};

export default HomePage;
