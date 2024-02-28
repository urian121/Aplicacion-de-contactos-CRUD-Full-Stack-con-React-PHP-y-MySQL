import imgExplosion from "../assets/imgs/explosion.svg";

const Titulo = () => {
  return (
    <div className="col-md-12">
      <h1 className="text-center titulo mb-5">
        🙀 Cómo Enviar Formularios de React a PHP{" "}
        <img src={imgExplosion} alt="emoji" style={{ width: "50px" }} /> de
        Forma Efectiva <hr />
      </h1>
    </div>
  );
};

export default Titulo;
