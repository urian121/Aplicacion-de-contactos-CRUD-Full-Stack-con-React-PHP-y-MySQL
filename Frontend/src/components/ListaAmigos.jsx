import PropTypes from "prop-types";
import "../assets/styles/lista_amigos.css";

function ListaAmigos({ data, url_api }) {
  console.log("La data es:", data);

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
          {data.map((alumno) => (
            <li
              key={alumno.id}
              className="lista_amigo"
              data-search="{{ amigo.nombre }} {{ amigo.profesion }}">
              <div className="media">
                <a href="#" className="media__img">
                  <img
                    src={`${url_api}/fotos_amigos/${alumno.avatar}`}
                    alt={alumno.nombre}
                  />
                </a>
                <p className="media__body">{alumno.nombre} </p>
                <p>{alumno.email}</p>
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
  url_api: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object), // 'data' debe ser un array de objetos
};

export default ListaAmigos;
