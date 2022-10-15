import React, { useState, useEffect } from "react";
import style from "../Tool/Style";
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

const NuevaSolicitud = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [solicitud, setSolicitud] = useState({
    idMotivoDelEstudio: 0,
    idCoordinacion: 0,
    idLineaDeNegocio: 0,
    idPerfilActividadEconomica: 0,
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefonoCasa: "",
    telefonoEmpleo: "",
    telefonoCelular: "",
    idAsesor: "",
    idAnalista: 0,
    idEstatus: "013ef650-e683-40c9-9e57-35f00028165f"
  });

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

  const guardarSolicitud = (e) => {
    e.preventDefault();
    console.log("Esto se manda", solicitud);
    registrarSolicitud(solicitud, dispatch).then((response) => {
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
        <Typography component="h1" variant="h5">
          Direccion Particular
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                name="calle"
                value={solicitud.calle || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Calle"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="numeroExterior"
                value={solicitud.numeroExterior || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Numero exterior"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="numeroInterior"
                value={solicitud.numeroInterior || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Numero interior"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="colonia"
                value={solicitud.colonia || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Colonia"
              />
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <TextField
                name="estado"
                value={solicitud.municipio || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Estado"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="municipio"
                value={solicitud.municipio || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Municipio o Alcaldia"
              />
            </Grid> */}
            <Grid item xs={12} md={6}>
              <TextField
                name="codigoPostal"
                value={solicitud.codigoPostal || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Codigo Postal"
              />
            </Grid>
          </Grid>
        </form>
      </div>

      {/*  <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Direccion Empleo
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                name="CalleEmpleo"
                // value={usuario.nombreCompleto || ""}
                // onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Calle"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="NumExteriorEmpleo"
                // value={usuario.username || ""}
                // onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Numero exterior"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="NumInteriorEmpleo"
                // value={usuario.email || ""}
                // onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Numero interior"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="ColoniaEmpleo"
                // value={usuario.password || ""}
                // onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Colonia"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="MunicipioAlcaldiaEmpleo"
                // value={usuario.confirmarPassword || ""}
                // onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Estado"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="EstadoEmpleo"
                // value={usuario.confirmarPassword || ""}
                // onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Municipio o Alcaldia"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="CodigoPostalEmpleo"
                // value={usuario.confirmarPassword || ""}
                // onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Codigo Postal"
              />
            </Grid>
          </Grid>
        </form>
      </div>

      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Direccion Adicional
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                name="CalleEmpleo"
                // value={usuario.nombreCompleto || ""}
                // onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Calle"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="NumExteriorEmpleo"
                // value={usuario.username || ""}
                // onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Numero exterior"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="NumInteriorEmpleo"
                // value={usuario.email || ""}
                // onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Numero interior"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="ColoniaEmpleo"
                // value={usuario.password || ""}
                // onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Colonia"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="MunicipioAlcaldiaEmpleo"
                // value={usuario.confirmarPassword || ""}
                // onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Estado"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="EstadoEmpleo"
                // value={usuario.confirmarPassword || ""}
                // onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Municipio o Alcaldia"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="CodigoPostalEmpleo"
                // value={usuario.confirmarPassword || ""}
                // onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Codigo Postal"
              />
            </Grid>
          </Grid>
        </form>
      </div>
*/}
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
                    <TextField
                      {...params}
                      label="Asesor"
                      variant="outlined"
                    />
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
                Guardar Datos
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default NuevaSolicitud;
