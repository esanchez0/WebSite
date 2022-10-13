import React, { useState, useEffect } from "react";
import style from "../Tool/Style";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  InputLabel,
} from "@material-ui/core";
import {
  actualizarUsuario,
  obtenerUsuarioActual,
} from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";

import reactFoto from "../../logo.svg";
import { v4 as uuidv4 } from "uuid";
import ImageUploader from "react-images-upload";
import { obtenerDataImagen } from "../../actions/ImagenAction";

const FINANMADRID_EMPLEADO = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState({
    nombreCompleto: "",
    username: "",
    email: "",
    password: "",
    confirmarPassword: "",
    imagenPerfil: null,
    fotoUrl: "",
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  useEffect(() => {
    // setUsuario(sesionUsuario.usuario);
    setUsuario((anterior) => ({
      ...anterior,
      fotoUrl: sesionUsuario.usuario.imagenPerfil,
      imagenPerfil: null,
    }));
  }, []);

  const guardarUsuario = (e) => {
    e.preventDefault();
    // console.log("usuario beofre send", usuario);
    actualizarUsuario(usuario, dispatch).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se guardaron exitosamente los cambios en Perfil Usuario",
          },
        });
        window.localStorage.setItem("token_seguridad", response.data.token);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje:
              "Errores al intentar guardar en : " +
              Object.keys(response.data.errors), //Object.keys para imprimir json
          },
        });
      }
    });
  };

  const fotoKey = uuidv4();

  const subirFoto = (imagenes) => {
    const foto = imagenes[0];
    const fotoUrl = URL.createObjectURL(foto);

    obtenerDataImagen(foto).then((respuesta) => {
      console.log("Respuesta ", respuesta);
      setUsuario((anterior) => ({
        ...anterior,
        imagenPerfil: respuesta, //respuesta es un json que proviene del action obtener imagen { data : ..., nombre:...,extension:... }
        fotoUrl: fotoUrl, // el archivo en formato url
      }));
    });
  };

  return (
    <Container component="main" maxWidth="md" justifycontent="center">
      <div style={style.paper}>
        {/* <Avatar style={style.avatar} src={usuario.fotoUrl || reactFoto} /> */}
        <Typography component="h1" variant="h5">
          HOJA DE VISITA FINANMADRID EMPLEADO
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="nombreCompleto"
                value={usuario.nombreCompleto || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="NOMBRE DEL CLIENTE"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="username"
                value={usuario.username || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="TELEFONO PARTICULAR"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                value={usuario.email || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="TELEFONO CELULAR"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="password"
                value={usuario.password || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="DIRECCION PARTICULAR"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="EDAD"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="ESTADO CIVIL"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="NO. HIJOS"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="NO. DEP ECONOMICOS"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="VIVE EN CASA PROPIO O RENTADA "
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="TIEMPO DE VIVIR AHÍ"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={<Checkbox name="checkedCliente" />}
                label="¿A NOMBRE DE QUIEN ESTA LA CASA? CLIENTE"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={<Checkbox name="checkedCFamiliar" />}
                label="FAMILIAR"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="NOMBRE"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={<Checkbox name="checkedCFamiliar" />}
                label="OTRO"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="NOMBRE"
              />
            </Grid>
          </Grid>
        </form>
      </div>

      <div style={style.paper}>
        {/* <Avatar style={style.avatar} src={usuario.fotoUrl || reactFoto} /> */}
        <Typography component="h1" variant="h5">
          EMPLEADO
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="nombreCompleto"
                value={usuario.nombreCompleto || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="NOMBRE DE LA EMPRESA PARA LA CUAL LABORA:"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="ANTIGÜEDAD:"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label=" PUESTO QUE DESARROLLA:"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="NOMBRE DE JEFE DIRECTO O RH:"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="username"
                value={usuario.username || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="NUMERO TELEFONICO:"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name="email"
                value={usuario.email || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="ACTIVIDADES QUE REALIZA (A DETALLE):"
                multiline
                minRows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                value={usuario.password || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="INGRESO NOMINAL:"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="CON QUE LO ACREDITA?"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="confirmarPassword"
                label="¿CUENTA CON BONOS O PAGOS EXTRAS?"
                multiline
                minRows={4}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                label="FORMA DE PAGO:"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                label="MUESTRA ACCESO A PORTAL?"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  EN CASO DE QUE EL PAGO SEA COBRADO EN EFECTIVO, SE VALIDA CON
                  JEFE DIRECTO:
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="gilad" />}
                    label="SI"
                  />
                  <FormControlLabel
                    control={<Checkbox name="jason" />}
                    label="NO"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="confirmarPassword"
                label="TIENE ALGUNA ACTIVIDAD O INGRESO EXTRA (EXPLICA A DETALLE Y QUE DOCUMENTACION LO 
                  ACREDITA)."
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                label="GASTOS MENSUALES PROMEDIO PERSONALES"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                label="USO DE LA UNIDAD SOLICITADA"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </div>

      <div style={style.paper}>
        {/* <Avatar style={style.avatar} src={usuario.fotoUrl || reactFoto} /> */}
        <Typography component="h1" variant="h5">
          DATOS ADICIONALES DEL INMUEBLE PARTICULAR
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="nombreCompleto"
                value={usuario.nombreCompleto || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="DETALLES DE INTERIOR DE DOMICILIO:"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name="username"
                value={usuario.username || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="MODO DE VIDA: "
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  ES ACORDE A LA UNIDAD SOLICITADA?
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="gilad" />}
                    label="SI"
                  />
                  <FormControlLabel
                    control={<Checkbox name="jason" />}
                    label="NO"
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="standard-basic"
                label="REFERENCIA VECINAL 1"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="password"
                value={usuario.password || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="NOMBRE:"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="password"
                value={usuario.password || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="DIRECCION DE REFERENCIA:"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="standard-basic"
                label="REFERENCIA VECINAL 2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="password"
                value={usuario.password || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="NOMBRE:"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="password"
                value={usuario.password || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="DIRECCION DE REFERENCIA:"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                onClick={guardarUsuario}
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

export default FINANMADRID_EMPLEADO;
