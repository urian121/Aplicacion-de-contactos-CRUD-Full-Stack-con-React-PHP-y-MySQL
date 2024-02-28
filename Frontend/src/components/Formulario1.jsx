import { useState } from "react";

import Titulo from "./Titulo";
import GridIzquierdo from "./GridIzquierdo";

/**
 * Enviar este formulario al servidor, usando el estado local de React
 */

const Formulario1 = () => {
  /**
   *  Utiliza el hook useState para inicializar el estado local del formulario.
   *  Se define un objeto con tres propiedades: username, email y movil, que representan los valores iniciales de los campos del formulario.
   *  Estos valores se establecen inicialmente en cadenas vacías ("") para permitir que el usuario ingrese información.
   */
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    movil: "",
  });

  /**
   *  Esta función se llama cuando se produce un cambio en un campo del formulario.
   *  Toma el evento del cambio (event) como parámetro, que contiene información sobre el elemento que cambió.
   *  Extrae el nombre y el valor del campo del formulario del evento.
   *  Luego, actualiza el estado del formulario utilizando la función setFormData del hook useState.
   *  Ademas, utiliza el operador spread (...) para copiar los valores existentes del estado formData y luego sobrescribe el valor del campo específico que cambió (name) con el nuevo valor ingresado por el usuario.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   *  Esta función se activa cuando se envía el formulario, cancelando el comportamiento predeterminado de recarga de la página.
   *  Realiza una validación básica para asegurarse de que todos los campos requeridos estén completos.
   *  Si falta algún campo requerido, muestra una alerta al usuario y devuelve la función sin realizar más acciones.
   *  Si todos los campos requeridos están completos, muestra los datos del formulario en la consola y realiza cualquier otra lógica de manipulación de datos necesaria.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación de entrada
    if (!formData.username || !formData.email || !formData.movil) {
      alert("Por favor, completa todos los campos");
      return;
    }

    console.log(formData);
    const { username, email, movil } = formData;
    console.log(username, email, movil);
  };

  return (
    <div className="row justify-content-md-center">
      <Titulo />

      <GridIzquierdo data={formData} />

      <div className="col-md-7 py-5 px-">
        <h2 className="text-center mb-3">Registrar Empleados</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Alumno</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email del Alumno</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Télefono del Alumno</label>
            <input
              type="number"
              name="movil"
              className="form-control"
              value={formData.movil}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Formulario1;
