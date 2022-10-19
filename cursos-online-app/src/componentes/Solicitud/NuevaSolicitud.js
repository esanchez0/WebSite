import React, { useState, useEffect } from "react";
import style from "../Tool/Style";
import { Modal, Box } from "@material-ui/core";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../contexto/store";
import { registrarSolicitud } from "../../actions/SolicitudAction";
import { catalogosComunes } from "../../actions/CatalogosAction";
import { obtenerUsuariosXRoles } from "../../actions/UsuarioAction";
import logo from "../Tool/LogoSiric.jpg";
import { obtenerEstado } from "../../actions/CatalogosAction";
import { obtenerMunicipioXEstadoId } from "../../actions/CatalogosAction";

const NuevaSolicitud = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [Direccion, setDireccion] = useState({});
 


  const [solicitud, setSolicitud] = useState({
    idLineaDeNegocio: 0,
    //Datos del cliente
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefonoCasa: "",
    telefonoEmpleo: "",
    telefonoCelular: "",
    idPerfilActividadEconomica: 0,
    //Datos de la solicitud
    idCoordinacion: 0,
    idAsesor: 0,
    idAnalista: 0,
    idMotivoDelEstudio: 0,
    //Direcciones
    listaDeDirecciones: [
      //Add 3 objects with directions to the array
    ],

    // idEstatus: "013ef650-e683-40c9-9e57-35f00028165f",
  });

  const [estadoid, setestadoid] = useState("");
  const [Botones, setBotones] = useState([
    { id: 1, titulo: "Direccion particular", estado: false },
    { id: 2, titulo: "Direccion de negocio", estado: false },
    { id: 3, titulo: "Direccion adicional", estado: false },
  ]);

  const [open, setopen] = useState(false);

  const [Titulo, setTitulo] = useState("");

  const handleOpen = () => {
    setopen(true);
  };

  const obtenerEstadoid = async (Estado) => {
    const Id = ComboEstado.filter((item) => item.nombre === Estado);
    setestadoid(Id[0].estadoId);
    obtenerMunicipios(Id[0].estadoId);
  };

  const botonElegido = (id) => {
if(Botones,id===1){
  setTitulo("Direccion particular")
}
if(Botones,id===2){
  setTitulo("Direccion de negocio")
}
if(Botones,id===3){
  setTitulo("Direccion adicional")
}

  };

  const cancelar = () => {
    setopen(false);
    //put all the buttons on false
    const botones = Botones.map((boton) => {
      boton.estado = false;
      return boton;
    });
  };

  const Guardar = () => {
    //if titulo is direccion particular then add the object to the array  direccion and add transformacion:"trabajo"

    if (Titulo === "Direccion particular") {

        const direccion = {
          calle: Direccion.calle,
          numeroExterior: Direccion.numeroExterior,
          numeroInterior: Direccion.numeroInterior,
          colonia: Direccion.colonia,
          codigoPostal: parseInt(Direccion.codigoPostal),
          idMunicipio: Direccion.municipio,
          referencias:"Particular",
        };
    
        const lista = solicitud.listaDeDirecciones;
        lista.push(direccion);
        setSolicitud({
          ...solicitud,
          listaDeDirecciones: lista,
        });
    
      
  };

  if(Titulo === "Direccion de negocio"){
    const direccion = {
      calle: Direccion.calle,
      numeroExterior: Direccion.numeroExterior,
      numeroInterior: Direccion.numeroInterior,
      colonia: Direccion.colonia,
      codigoPostal: parseInt(Direccion.codigoPostal),
      idMunicipio: Direccion.municipio,
      referencias:"Negocio",
    };

    const lista = solicitud.listaDeDirecciones;
    lista.push(direccion);
    setSolicitud({
      ...solicitud,
      listaDeDirecciones: lista,
    });
  }

  if(Titulo === "Direccion adicional"){
    const direccion = {
      
      calle: Direccion.calle,
      numeroExterior: Direccion.numeroExterior,
      numeroInterior: Direccion.numeroInterior,
      colonia: Direccion.colonia,
      codigoPostal: parseInt(Direccion.codigoPostal),
      idMunicipio: Direccion.municipio,
      referencias:"Adicional",
    };

    const lista = solicitud.listaDeDirecciones;
    lista.push(direccion);
    setSolicitud({
      ...solicitud,
      listaDeDirecciones: lista,
    });
  }

  setopen(false);
}

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setSolicitud((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  //------- COMBO LINEA NEGOCIO
  const initialValue = [{ id: 0, Descripcion: "" }];
  const [ComboLineaNegocio, setComboLineaNegocio] = useState(initialValue);
  const [iniciaApp, setIniciaApp] = useState(true);
  useEffect(() => {
    const obtenerLineaNegocio = async () => {
      const response = await catalogosComunes("LineaNegocio");
      setComboLineaNegocio(response.data);
      console.log("La Data COmbo", response.data);
      setIniciaApp(false);
    };

    obtenerLineaNegocio();
  }, [iniciaApp]);

  const changeLineaNegocio = (e) => {
    setSolicitud((anterior) => ({
      ...anterior,
      idLineaDeNegocio: e.id,
    }));

    console.log("ahora linea es ", e.id);
  };

  //------- COMBO ACTIVIDAD ECONOMICA
  const initialValueActividadEconomica = [{ id: 0, Descripcion: "" }];
  const [ComboActividadEconomica, setComboActividadEconomica] = useState(
    initialValueActividadEconomica
  );

  useEffect(() => {
    const obtenerActividadEconomica = async () => {
      const response = await catalogosComunes("PerfilActividadEconomica");
      setComboActividadEconomica(response.data);
      console.log("La Data COmbo actividad economica", response.data);
      setIniciaApp(false);
    };

    obtenerActividadEconomica();
  }, [iniciaApp]);

  const changeActividadEconomica = (e) => {
    setSolicitud((anterior) => ({
      ...anterior,
      idPerfilActividadEconomica: e.id,
    }));
  };

  //------- COMBO Coordinacion
  const initialValueCoordinacion = [{ id: 0, Descripcion: "" }];
  const [ComboCoordinacion, setCoordinacion] = useState(
    initialValueCoordinacion
  );

  useEffect(() => {
    const obtenerCoordinacion = async () => {
      const response = await catalogosComunes("COORDINACION");
      setCoordinacion(response.data);
      console.log("La Data COmbo coordinacion", response.data);
      setIniciaApp(false);
    };

    obtenerCoordinacion();
  }, [iniciaApp]);

  const changeobtenerCoordinacion = (e) => {
    setSolicitud((anterior) => ({
      ...anterior,
      idCoordinacion: e.id,
    }));
  };

  //------- COMBO Motivo del estudio
  const initialValueMotivoEstudio = [{ id: 0, Descripcion: "" }];
  const [ComboMotivoEstudio, setMotivoEstudio] = useState(
    initialValueMotivoEstudio
  );

  useEffect(() => {
    const obtenerMotivoEstudio = async () => {
      const response = await catalogosComunes("MOTIVO DEL ESTUDIO");
      setMotivoEstudio(response.data);
      console.log("La Data COmbo MOTIVO DEL ESTUDIO", response.data);
      setIniciaApp(false);
    };

    obtenerMotivoEstudio();
  }, [iniciaApp]);

  const changeobtenerMotivoEstudio = (e) => {
    setSolicitud((anterior) => ({
      ...anterior,
      idMotivoDelEstudio: e.id,
    }));
  };

  //------- COMBO Analista
  const initialValueAnalista = [{ idUsuario: 0, nombreCompleto: "" }];
  const [ComboAnalista, setAnalista] = useState(initialValueAnalista);

  useEffect(() => {
    const obtenerAnalista = async () => {
      const response = await obtenerUsuariosXRoles("Analista");
      setAnalista(response.data);
      console.log("La Data Combo Analista", response.data);
      setIniciaApp(false);
    };

    obtenerAnalista();
  }, [iniciaApp]);

  const changeobtenerAnalista = (e) => {
    setSolicitud((anterior) => ({
      ...anterior,
      idAnalista: e.idUsuario,
    }));
  };

  //------- COMBO Asesor
  const initialValueAsesor = [{ idUsuario: 0, nombreCompleto: "" }];
  const [ComboAsesor, setAsesor] = useState(initialValueAsesor);

  useEffect(() => {
    const obtenerAnalista = async () => {
      const response = await obtenerUsuariosXRoles("Asesor Bancario");
      setAsesor(response.data);
      console.log("La Data Combo Asesor", response.data);
      setIniciaApp(false);
    };

    obtenerAnalista();
  }, [iniciaApp]);

  const changeobtenerAsesor = (e) => {
    setSolicitud((anterior) => ({
      ...anterior,
      idAsesor: e.idUsuario,
    }));
  };

  //------- COMBO Estado
  const initialValueEstado = [{ estadoId: 0, nombre: "" }];
  const [ComboEstado, setEstado] = useState(initialValueEstado);

  useEffect(() => {
    const obtenerEstados = async () => {
      const response = await obtenerEstado();
      setEstado(response.data);
      console.log("La Data Combo Estado", response.data);
      setIniciaApp(false);
    };

    obtenerEstados();
  }, [iniciaApp]);

  const changeobtenerEstado = (e) => {
    console.log("Id estado", e.estadoId);
    setSolicitud((anterior) => ({
      ...anterior,
      idAsesor: e.estadoId,
    }));
  };

  //------- COMBO Municipio
  const initialValueMunicipio = [{ municipioId: 0, nombre: "" }];
  const [ComboMunicipio, setMunicipio] = useState(initialValueMunicipio);

  const obtenerMunicipios = async (id) => {
    const response = await obtenerMunicipioXEstadoId(id);
    setMunicipio(response.data);
    console.log("La Data Combo Municipio", response.data);
    setIniciaApp(false);
  };

  const changeobtenerMunicipio = (e) => {
    console.log("Id Municipio", e.municipioId);
    setSolicitud((anterior) => ({
      ...anterior,
      idAsesor: e.municipioId,
    }));
  };

  const guardarSolicitud = (e) => {
    e.preventDefault();
    console.log("Esto se manda", solicitud);
    registrarSolicitud(solicitud, dispatch).then((response) => {
      console.log("JSON ", JSON.stringify(solicitud));
      // console.log("response.data.token", response.data.token);
      console.log(solicitud);
      if (response.status === 200) {
        console.log("Se agrego");
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Solicitud agregada",
          },
        });
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

  return (
    <Container component="main" maxWidth="md" justifycontent="center">
      <div style={style.paper}>
        <Avatar style={style.avatar} src={logo} />
        <Typography component="h1" variant="h5">
          Datos del Cliente
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Autocomplete
                onChange={(event, newValue) => {
                  changeLineaNegocio(newValue);
                }}
                id="lineaDeNegocio"
                name="lineaDeNegocio"
                options={ComboLineaNegocio}
                getOptionLabel={(option) => option.descripcion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Linea de Negocio"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name="nombre"
                value={solicitud.nombre || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Nombre"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="apellidoPaterno"
                value={solicitud.apellidoPaterno || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Apellido Paterno"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="apellidoMaterno"
                value={solicitud.apellidoMaterno || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Apellido Materno"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="telefonoCasa"
                value={solicitud.telefonoCasa || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Tel Casa"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="telefonoEmpleo"
                value={solicitud.telefonoEmpleo || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Tel Empleo"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="telefonoCelular"
                value={solicitud.telefonoCelular || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Celular"
              />
            </Grid>
          </Grid>
        </form>
      </div>

      <div style={style.paper}>
        <Typography component="h1" variant="h5" className="text-center ">
          Escoge la dirección:
          <div className=" flex md:flex-row flex-col  justify-between mt-4 ">
            {Botones.map((boton) => (
              <button
                key={boton.id}
                onClick={() => {
                  {
                    botonElegido(boton.id);
                    handleOpen();
                  }
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5"
              >
                {boton.titulo}
              </button>
            ))}
          </div>
        </Typography>
        <form style={style.form}>
          <Modal
            open={open}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: "scroll", scrollSnapType: "y mandatory" }}
          >
            <Box>
              <div className="flex flex-col justify- items-center md:w-auto w-11/12 mx-auto snap-y py-10">
                <div className="w-full max-w-lg">
                  <div className="flex flex-col items-center  bg-gray-100 w-full mx-auto p-1 rounded-md">
                    <h1 className="text-3xl my-3 font-semibold">{Titulo}</h1>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className="flex w-full  mx-auto"
                          id="outlined-multiline-static"
                          label="Calle"
                          variant="outlined"
                          name="calle"
                          onChange={(e) =>
                            setDireccion({
                              ...Direccion,
                              calle: e.target.value,
                            })
                          }
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          onChange={(e) => {
                            setDireccion({
                              ...Direccion,
                              numeroExterior: e.target.value,
                            });
                          }}
                          label="Numero Exterior"
                          name="numeroExterior"
                          className="flex w-full  mx-auto"
                          id="outlined-multiline-static"
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          onChange={(e) => {
                            setDireccion({
                              ...Direccion,
                              numeroInterior: e.target.value,
                            });
                          }}
                          name="numeroInterior"
                          label="Ingrese Numero interior"
                          className="flex w-full  mx-auto"
                          id="outlined-multiline-static"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          onChange={(e) => {
                            setDireccion({
                              ...Direccion,
                              colonia: e.target.value,
                            });
                          }}
                          name="colonia"
                          label="Ingrese Colonia"
                          className="flex w-full  mx-auto"
                          id="outlined-multiline-static"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          onChange={(e) => {
                            obtenerEstadoid(e.target.textContent);
                            console.log(e.target.textContent);

                            setDireccion({
                              ...Direccion,
                              estado: e.target.textContent,
                            });
                          }}
                          id="idEstado"
                          name="idEstado"
                          options={ComboEstado}
                          getOptionLabel={(option) => option.nombre}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Seleccione Estado"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          onChange={(event, newValue) => {
                            changeobtenerMunicipio(newValue);
                            setDireccion({
                              ...Direccion,
                              municipio: newValue.municipioId,
                            });
                          }}
                          id="idMunicipio"
                          name="idMunicipio"
                          options={ComboMunicipio}
                          getOptionLabel={(option) => option.nombre}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Seleccione Municipio"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="codigoPostal"
                          onChange={(e) => {
                            setDireccion({
                              ...Direccion,
                              codigoPostal: e.target.value,
                            });
                          }}
                          variant="outlined"
                          fullWidth
                          label="Ingrese Codigo Postal"
                        />
                      </Grid>
                    </Grid>

                    <div onClick={Guardar} className="flex flex-row mt-5">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 ">
                        Guardar
                      </button>

                      <button
                        onClick={() => cancelar()}
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
        </form>
      </div>
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Perfil / Actividad Economica
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Autocomplete
                onChange={(event, newValue) => {
                  changeActividadEconomica(newValue);
                }}
                id="perfilActividadEconomica"
                name="perfilActividadEconomica"
                options={ComboActividadEconomica}
                getOptionLabel={(option) => option.descripcion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </div>

      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Coordinación
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Autocomplete
                onChange={(event, newValue) => {
                  changeobtenerCoordinacion(newValue);
                }}
                id="coordinacion"
                name="coordinacion"
                options={ComboCoordinacion}
                getOptionLabel={(option) => option.descripcion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </div>

      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Asesor
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Grid item xs={12} md={12}>
                <Autocomplete
                  onChange={(event, newValue) => {
                    changeobtenerAsesor(newValue);
                  }}
                  id="asesor"
                  name="asesor"
                  options={ComboAsesor}
                  getOptionLabel={(option) => option.nombreCompleto}
                  renderInput={(params) => (
                    <TextField {...params} label="Asesor" variant="outlined" />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>

      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Analista
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Autocomplete
                onChange={(event, newValue) => {
                  changeobtenerAnalista(newValue);
                }}
                id="idAnalista"
                name="idAnalista"
                options={ComboAnalista}
                getOptionLabel={(option) => option.nombreCompleto}
                renderInput={(params) => (
                  <TextField {...params} label="Analista" variant="outlined" />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </div>

      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Motivo del estudio
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Autocomplete
                onChange={(event, newValue) => {
                  changeobtenerMotivoEstudio(newValue);
                }}
                id="motivoDelEstudio"
                name="motivoDelEstudio"
                options={ComboMotivoEstudio}
                getOptionLabel={(option) => option.descripcion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                onClick={guardarSolicitud}
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={style.submit}
              >
                Guardar Datos Dos
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default NuevaSolicitud;
