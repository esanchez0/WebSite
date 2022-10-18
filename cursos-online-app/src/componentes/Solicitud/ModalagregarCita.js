import React from "react";
import { Modal, Box, TextField, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
 import { alpha } from '@material-ui/core/styles'
import {
  catalogoEstatus,
  catalogosComunes,
} from "../../actions/CatalogosAction";
import { obtenerUsuariosXRoles } from "../../actions/UsuarioAction";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import id from "date-fns/esm/locale/id/index.js";
import { set } from "date-fns/esm";
import { registrarVisita } from "../../actions/VisitaAction";
import { useStateValue } from "../../contexto/store";



const ModalagregarCita = ({
  openCita,
  handleOpenCita,
  setopenCita,
  idSolicitud,
}) => {

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [infoCita, setinfoCita] = useState({
    fechaInicio: new Date(),
    fechaFin: new Date(),
    hora: new Date(),
    idPrimeroEn: "",
    idVisitador: "",
    observaciones: "",
    idEstatus: "",
    idSolicitud: idSolicitud.idSolicitud,
  });

  const [PrimeroEn, setPrimeroEn] = useState([]);
  const [catalogoStatus, setcatalogoStatus] = useState([]);
  const [usuarioxRoles, setusuarioxRoles] = useState([]);
  const [iniciaApp, setIniciaApp] = useState(true);

  useEffect(() => {
    const obtenerLineaNegocio = async () => {
      const response = await catalogosComunes("PrimeroEn");
      const response2 = await catalogoEstatus();
      const response3 = await obtenerUsuariosXRoles("Visitador");
      setPrimeroEn(response.data);
      setcatalogoStatus(response2.data);
      setusuarioxRoles(response3.data);
      //console.log("La Data COmbo", response.data);
      setIniciaApp(false);
    };

    obtenerLineaNegocio();
  }, [iniciaApp]);


  const guardarVisita = (e) => {
    e.preventDefault();

    setinfoCita({
      ...infoCita,
      idSolicitud: idSolicitud,
    });
    console.log("La Data Enviar", JSON.stringify(infoCita, null, 2));



    registrarVisita(infoCita, dispatch).then((response) => {
      // console.log("JSON ",JSON.stringify(solicitud));
      // console.log("response.data.token", response.data.token);
      if (response.status === 200) {

        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Visita agregada",
          },
        });

        handleOpenCita(!openCita);

      } else {
        console.log(response);
        console.log("error:  ", response);
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Error",
          },
        });
      }
    });
  };
  
  const enviarDatos = () => {
    setinfoCita({
      ...infoCita,
      idSolicitud: idSolicitud,
    });
    console.log("La Data Enviar", JSON.stringify(infoCita, null, 2));
  };

  const idPrimeroEn=(ocupacion)=>{
    //get id of ocupacion
    const idOcupacion=PrimeroEn.filter((item)=>item.descripcion===ocupacion)
    //console.log("idOcupacion",idOcupacion);
    setinfoCita({
      ...infoCita,
      idPrimeroEn: idOcupacion[0].id,
    });
  }

  const idVisitador=(visitador)=>{
    const idVisitador=usuarioxRoles.filter((item)=>item.nombreCompleto===visitador)
   // console.log("idVisitador",idVisitador);
    setinfoCita({
      ...infoCita,
      idVisitador: idVisitador[0].idUsuario,
    });
  }

  const idEstatus=(estatus)=>{
    const idEstatus=catalogoStatus.filter((item)=>item.descripcion===estatus)
    //console.log("idEstatus",idEstatus);
    setinfoCita({
      ...infoCita,
      idEstatus: idEstatus[0].estatusId
    });
  }

  return (
    <Modal
      open={openCita}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "scroll" }}


    >
      <Box>
        <div className="flex flex-col justify- items-center md:w-auto w-11/12 mx-auto ">
          <div className="w-full max-w-lg">
            <div className="flex flex-col items-center my-10 bg-gray-100 w-full mx-auto p-1 rounded-md  ">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="flex  flex-col">
                  <div className="flex md:flex-row flex-col justify-between ">
                    <KeyboardDatePicker
                      className="md:w-5/12 w-full"
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Fecha de inicio"
                      value={infoCita.fechaInicio}
                      onChange={(e) => {
                        setinfoCita({ ...infoCita, fechaInicio: e });
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />

                    <KeyboardDatePicker
                      className="md:w-5/12 w-full px-2"
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Fecha de fin"
                      value={infoCita.fechaFin}
                      onChange={(e) =>
                        setinfoCita({ ...infoCita, fechaFin: e })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </div>

                  <div className="flex md:flex-row flex-col justify-between">
                    <KeyboardTimePicker
                      className="md:w-5/12 w-full mx-2"
                      margin="normal"
                      id="time-picker"
                      label="Hora"
                      value={infoCita.hora}
                      onChange={(e) =>
                        setinfoCita({ ...infoCita, hora: e })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />

                    <Autocomplete
                      className="mt-2 md:w-5/12 w-full"
                      id="combo-box-demo"
                      options={PrimeroEn}
                      onChange={(e) =>
                        idPrimeroEn(e.target.textContent)
                      }
                      getOptionLabel={(option) => option.descripcion}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Primero en"
                          variant="outlined"
                        />
                      )}
                    />

                  </div>
                  <div className="flex md:flex-row flex-col justify-between">
                  
                  <Autocomplete
                      className="mt-2 md:w-5/12 w-full"
                      id="combo-box-demo"
                      options={usuarioxRoles}
                      getOptionLabel={(option) => option.nombreCompleto}
                      onChange={(e) =>
                        idVisitador(e.target.textContent)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Visitador"
                          variant="outlined"
                        />
                      )}
                    />
                    <Autocomplete
                      className="mt-2 md:w-5/12 w-full"
                      id="combo-box-demo"
                      options={catalogoStatus}
                      getOptionLabel={(option) => option.descripcion}
                      onChange={(e) =>
                        idEstatus(e.target.textContent)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Estatus"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>
                </div>
              </MuiPickersUtilsProvider>

              <div className="mt-5  flex mx-auto justify-center w-full  md:px-3 px-16 ">
                <TextField
                  className="flex w-full  mx-auto"
                  id="outlined-multiline-static"
                  label="Observaciones"
                  variant="outlined"
                  multiline
                  minRows={4}
                  onChange={(e) =>
                    setinfoCita({ ...infoCita, observaciones: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-row mt-5">
                <button
                  // onClick={() => {
                  //   guardarVisita();
                  // }}
                  onClick={guardarVisita}
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
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalagregarCita;
