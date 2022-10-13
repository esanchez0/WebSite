import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;


export const registrarSolicitud = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
      instancia
        .post("/Solicitud", usuario)
        .then((response) => {
        //   if (response.data && response.data.imagenPerfil) {
        //     let fotoPerfil = response.data.imagenPerfil;
        //     const nuevoFile =
        //       "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
        //     response.data.imagenPerfil = nuevoFile;
        //   }
  
        //   dispatch({
        //     type: "INICIAR_SESION",
        //     sesion: response.data,
        //     autenticado: true,
        //   });
  
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  };
  

  
  export const obtenerSolicitudes = () => {
    return new Promise((resolve, eject) => {
        instancia.get("/Solicitud/ObtenerSolicitudes").then((response) => {
        resolve(response);
      });
    });
  };