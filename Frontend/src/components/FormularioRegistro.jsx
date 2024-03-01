import PropTypes from "prop-types";

const FormularioRegistro = ({
  manejarEnvioFormulario,
  manejarCambioInput,
  handleSubirImagen,
  status_btn,
  infoContacto,
  selectedFile,
  url_api,
  manejarUpdateFormulario,
}) => {
  console.log("aqui", infoContacto);

  return (
    <form
      className="px-5"
      onSubmit={status_btn ? manejarUpdateFormulario : manejarEnvioFormulario}
      method="POST"
      encType="multipart/form-data">
      {status_btn ? (
        <input type="text" name="id" value={infoContacto.id} readOnly hidden />
      ) : (
        ""
      )}

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={infoContacto ? infoContacto.nombre : ""}
          className="form-control"
          onChange={manejarCambioInput}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={infoContacto ? infoContacto.email : ""}
          className="form-control"
          onChange={manejarCambioInput}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="number"
          name="telefono"
          value={infoContacto ? infoContacto.telefono : ""}
          className="form-control"
          onChange={manejarCambioInput}
        />
      </div>
      {selectedFile && (
        <div>
          <label htmlFor="avatar" className="form-label">
            Avatar seleccionado
          </label>
          <span className="d-flex justify-content-start">
            {selectedFile !== infoContacto.avatar ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="avatar"
                style={{ width: "100px" }}
              />
            ) : (
              <img
                src={`${url_api}/fotos_amigos/${selectedFile}`}
                alt="avatar"
                style={{ width: "100px" }}
              />
            )}
          </span>
        </div>
      )}

      <div className="mb-3 mt-4">
        <label htmlFor="avatar" className="form-label">
          {status_btn ? "Cambiar el " : "Agregar el"} Avatar
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
          {status_btn ? "Editar" : "Registrar"} Amigo
        </button>
      </div>
    </form>
  );
};

FormularioRegistro.propTypes = {
  manejarEnvioFormulario: PropTypes.func.isRequired,
  manejarCambioInput: PropTypes.func.isRequired,
  handleSubirImagen: PropTypes.func.isRequired,
  status_btn: PropTypes.bool.isRequired,
  infoContacto: PropTypes.object,
  selectedFile: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  url_api: PropTypes.string,
  manejarUpdateFormulario: PropTypes.func.isRequired,
};

export default FormularioRegistro;
