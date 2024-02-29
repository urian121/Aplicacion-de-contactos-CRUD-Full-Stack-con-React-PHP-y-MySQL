import PropTypes from "prop-types";
import "../assets/styles/lista_amigos.css";

function ListaAmigos({ data, url_api, eliminarContacto }) {
  // Verifica si data es null o undefined antes de usarla
  if (!data) return null;
  return (
    <>
      <section className="media-list">
        <input
          type="search"
          placeholder="Buscar amigo 😉"
          id="buscador_amigo"
        />
        <ul>
          {data.map((amigo) => (
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
                  <span className="opacity">Télefono: {amigo.telefono}</span>
                </p>

                <p>
                  <span> {amigo.email}</span>
                  <span style={{ float: "right" }}>
                    <span className="px-4">
                      <i className="bi bi-pen"></i>
                    </span>
                    <span onClick={() => eliminarContacto(amigo.id)}>
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
ListaAmigos.propTypes = {
  eliminarContacto: PropTypes.func,
  url_api: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object), // 'data' debe ser un array de objetos
};

export default ListaAmigos;
