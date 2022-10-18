import React from "react";
import { Modal, Box, TextField } from "@material-ui/core";
import  { useState } from "react";
import id from "date-fns/esm/locale/id/index.js";

const ModalDetalles = ({
  openDetalles,
  setopenDetalles,
  Information,
  setInformation,
  handleOpenDetalles,
  idSolicitud
}) => {

  const [idDetalles, setidDetalles] = useState();
  return (
  
    <Modal
      open={openDetalles}
      onClose={handleOpenDetalles}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "scroll"  }}
    >
      <Box>
        <div className="flex flex-col justify- items-center md:w-auto w-11/12 mx-auto snap-y py-10">
          <div className="w-full max-w-lg">
            <div className="flex flex-col items-center  bg-gray-100 w-full mx-auto p-1 rounded-md">
              <TextField
              style={{marginTop: "10px"}}
              
                id="outlined-multiline-static"
                label="Nombre Cliente"
                defaultValue={Information.nombreCliente}
                onChange={(e) => {
                  setInformation({
                    ...Information,
                    nombreCliente: e.target.value,
                  });
                }}
                variant="outlined"
              />
              <div className="flex flex-col justify-center items-center my-3 bg-slate-300 w-1/2 mx-auto"></div>

              <TextField
                id="outlined-multiline-static"
                label="Perfil Actividad"
                defaultValue={Information.perfilActividadEconomica}
                onChange={(e) =>
                  setInformation({
                    ...Information,
                    perfilActividadEconomica: e.target.value,
                  })
                }
                variant="outlined"
              />
              <div className="flex flex-col justify-center items-center my-3 bg-slate-300 w-1/2 mx-auto"></div>

              <TextField
                id="outlined-multiline-static"
                label="Nombre Proyecto"
                defaultValue={Information.coordinacion}
                onChange={(e) =>
                  setInformation({
                    ...Information,
                    coordinacion: e.target.value,
                  })
                }
                variant="outlined"
              />
              <div className="flex flex-col justify-center items-center my-3 bg-slate-300 w-1/2 mx-auto"></div>

              <TextField
                id="outlined-multiline-static"
                label="Analista"
                defaultValue={Information.analista}
                onChange={(e) =>
                  setInformation({ ...Information, analista: e.target.value })
                }
                variant="outlined"
              />
              <div className="flex flex-col justify-center items-center my-3 bg-slate-300 w-1/2 mx-auto"></div>

              <TextField
                id="outlined-multiline-static"
                label="Asesor"
                defaultValue={Information.asesor}
                onChange={(e) =>
                  setInformation({ ...Information, asesor: e.target.value })
                }
                variant="outlined"
              />

              <div className="flex flex-row mt-5">
                <button
                  onClick={() => {
                    setopenDetalles(false)
                    console.log(idSolicitud)
                    setidDetalles(idSolicitud)
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                >
                  Guardar
                </button>

                <button
                  onClick={() => setopenDetalles(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDetalles;
