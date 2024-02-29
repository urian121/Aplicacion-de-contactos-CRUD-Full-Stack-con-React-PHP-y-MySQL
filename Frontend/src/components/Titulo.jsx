import imgExplosion from "../assets/imgs/explosion.svg";

const Titulo = () => {
  return (
    <div className="col-md-12">
      <h1 className="text-center titulo mb-5">
        🙀 Aplicación de Gestión de Contactos CRUD Full Stack con React, PHP y
        <img src={imgExplosion} alt="emoji" style={{ width: "50px" }} /> de
        MySQL
        <hr />
      </h1>
    </div>
  );
};

export default Titulo;
