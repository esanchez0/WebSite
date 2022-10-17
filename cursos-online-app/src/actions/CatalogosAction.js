import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;


export const catalogosComunes = (catalogo) => {
    return new Promise((resolve, eject) => {
        instancia.get("/catalogo/" + catalogo).then((response) => {
        resolve(response);
      });
    });
  };

  export const obtenerEstado = () => {
    return new Promise((resolve, eject) => {
        instancia.get("/catalogo/ObtenerEstado/" ).then((response) => {
        resolve(response);
      });
    });
  };

  export const obtenerMunicipioXEstadoId = (idEstado) => {
    return new Promise((resolve, eject) => {
        instancia.get("/catalogo/ObtenerMunicipio?idEstado=" + idEstado).then((response) => {
        resolve(response);
      });
    });
  };
  
  export const catalogoEstatus = () => {
    return new Promise((resolve, eject) => {
        instancia.get("/catalogo/Estatus").then((response) => {
        resolve(response);
      });
    });
  };