import PropTypes from "prop-types";
import imgExplosion from "../assets/imgs/explosion.svg";
import "../assets/styles/lista_amigos.css";
function GridIzquierdo({ data }) {
  console.log("La data es:", data);

  // Verifica si data es null o undefined antes de usarla
  if (!data) return null;

  return (
    <>
      {data.map((alumno) => (
        <div className="media mb-3" key={alumno.id}>
          <img
            src={imgExplosion}
            className="mr-3 latidos-animation"
            style={{ width: "40px" }}
            alt="perfil"
          />
          <div className="media-body">
            <h4 className="mt-2">
              {alumno.nombre} {alumno.email}
            </h4>
            <p>
              {" "}
              <strong> Email: </strong> {alumno.telefono}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

// Define la validación de tipo para la prop 'data'
GridIzquierdo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object), // 'data' debe ser un array de objetos
};

export default GridIzquierdo;
