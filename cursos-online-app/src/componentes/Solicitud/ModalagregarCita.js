import React from "react";
import { Modal, Box, TextField, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ModalagregarCita = ({ openCita, handleOpenCita, setopenCita }) => {
  return (
    <Modal
      open={openCita}
      onClose={handleOpenCita}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "scroll" }}
    >
      <Box>
        <div className="flex flex-col justify- items-center  bg-slate-300 md:w-1/2 w-11/12 mx-auto snap-y">
          <form className="w-full max-w-lg">
            <div className="flex flex-col items-center my-10 bg-slate-300 w-full mx-auto">
              <div className="flex md:flex-row flex-col">
                <TextField
                  id="outlined-multiline-static"
                  label="Fecha de inicio"
                  variant="outlined"
                />

                <div className="flex flex-col justify-center items-center my-3 bg-slate-300 w-5 mx-auto"></div>
                <TextField
                  id="outlined-multiline-static"
                  label="Fecha de fin"
                  variant="outlined"
                />
                <div className="flex flex-col justify-center items-center my-3 bg-slate-300 w-5 mx-auto"></div>
                <TextField
                  id="outlined-multiline-static"
                  label="Hora "
                  variant="outlined"
                />
              </div>

        
              <div className="mt-5 w-full flex">
              <Autocomplete
              className="md:w-full w-7/12 mx-auto"
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Combo box" variant="outlined" />
                  )}
                />
              </div>
              
              <div className="mt-5 w-full flex">
              <Autocomplete
              className="md:w-full w-7/12 mx-auto"
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Combo box" variant="outlined" />
                  )}
                />
              </div>

              <div className="mt-5 w-full flex">
              <Autocomplete
              className="md:w-full w-7/12 mx-auto"
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Combo box" variant="outlined" />
                  )}
                />
              </div>

              <div className="mt-5 w-full flex mx-auto justify-center">
                <TextField
              className="md:w-full w-7/12 mx-auto"

                  id="outlined-multiline-static"
                  label="Observaciones"
                  variant="outlined"
                  multiline
                  rows={4}
                 
                />

              </div>
             


        
            

              <div className="flex flex-row mt-5">
                <button
                  onClick={() => setopenCita(false)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                >
                  Guardar
                </button>

                <button
                  onClick={() => setopenCita(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalagregarCita;
