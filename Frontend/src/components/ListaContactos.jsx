import { useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/lista_amigos.css";

function ListaContactos({
  data,
  url_api,
  eliminarContacto,
  obtenerContactoParaEditar,
}) {
  // Estado para almacenar el valor del campo de búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Verifica si data es null o undefined antes de usarla
  if (!data) return null;

  // Filtrar la lista de amigos según el texto de búsqueda
  const amigosFiltrados = data.filter((amigo) =>
    amigo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <section className="media-list">
        <input
          type="search"
          placeholder="Buscar amigo 😉"
          id="buscador_amigo"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <ul>
          {/* Renderizar amigos filtrados */}
          {amigosFiltrados.map((amigo) => (
            <li key={amigo.id} className="lista_amigo">
              <div className="media">
                <span href="#" className="media__img">
                  <img
                    src={`${url_api}/fotos_amigos/${amigo.avatar}`}
                    alt={amigo.nombre}
                  />
                </span>
                <p className="media__body flex">
                  {amigo.nombre}
                  <span className="opacity">Teléfono: {amigo.telefono}</span>
                </p>
                <p>
                  <span> {amigo.email}</span>
                  <span style={{ float: "right" }}>
                    <span
                      title={`Editar amigo ${amigo.nombre}`}
                      className="px-4"
                      onClick={() => obtenerContactoParaEditar(amigo.id)}>
                      <i className="bi bi-pen"></i>
                    </span>
                    <span
                      title="Eliminar amigo"
                      onClick={() => eliminarContacto(amigo.id)}>
                      <i className="bi bi-trash3"></i>
                    </span>
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

// Define la validación de tipo para la prop 'data'
ListaContactos.propTypes = {
  obtenerContactoParaEditar: PropTypes.func,
  eliminarContacto: PropTypes.func,
  url_api: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object), // 'data' debe ser un array de objetos
};

export default ListaContactos;
