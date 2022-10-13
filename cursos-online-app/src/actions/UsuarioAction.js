import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    instancia.post("/Usuario/registrar", usuario).then((Response) => {
      resolve(Response);
    });
  });
};

//dispatch para invocar al reducer y obtener toda las variables globales
export const obtenerUsuarioActual = (dispatch) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get("/usuario")
      .then((response) => {
        console.log("response", response);
        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile =
            "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }

        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        console.log("exitoso");
        resolve(response);
      })
      .catch((error) => {
        console.log("error actualizar aqui", error);

        resolve(error);
      });
  });
};

export const actualizarUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put("/usuario", usuario)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile =
            "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }

        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });

        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const loginUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    instancia
      .post("/usuario/login", usuario)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile =
            "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }

        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });

        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const obtenerUsuariosXRoles = (rol) => {
  return new Promise((resolve, eject) => {
    instancia.get("/Usuario/" + rol).then((Response) => {
      resolve(Response);
    });
  });
};

export const obtenerRoles = () => {
  return new Promise((resolve, eject) => {
    instancia.get("/Rol/lista").then((Response) => {
      resolve(Response);
    });
  });
};