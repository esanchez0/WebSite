import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

// export const catalogosComunes = (catalogo) => {
//   return new Promise((resolve, eject) => {
//     instancia.post("/catalogo/"+catalogo).then((Response) => {
//       resolve(Response);
//     });
//   });
// };

export const catalogosComunes = (catalogo) => {
    return new Promise((resolve, eject) => {
        instancia.get("/catalogo/" + catalogo).then((response) => {
        resolve(response);
      });
    });
  };
  
