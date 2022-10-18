import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;


export const registrarVisita = (visita) => {
    return new Promise((resolve, eject) => {
        instancia.post("/Visita/",visita).then((response) => {
        resolve(response);
      });
    });
  };

  export const consultarDetalleVisita = (idSolicitud) => {
    return new Promise((resolve, eject) => {
        instancia.get("/Visita/"+idSolicitud).then((response) => {
        resolve(response);
      });
    });
  };
