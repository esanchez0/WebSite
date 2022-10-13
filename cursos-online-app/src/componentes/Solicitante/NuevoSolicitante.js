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
import {
  actualizarUsuario,
  obtenerUsuarioActual,
} from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";

import reactFoto from "../../logo.svg";
import { v4 as uuidv4 } from "uuid";
import ImageUploader from "react-images-upload";
import { obtenerDataImagen } from "../../actions/ImagenAction";

const NuevoSolicitante = () => {
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
        <Avatar style={style.avatar} src={usuario.fotoUrl || reactFoto} />
        <Typography component="h1" variant="h5">
          Nuevo Solicitante Datos Personales
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
                label="Ingrese nombre"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="username"
                value={usuario.username || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Apellido Paterno"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                value={usuario.email || ""}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Apellido Materno"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="password"
                value={usuario.password || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Tel Casa"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Tel Empleo"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword || ""}
                onChange={ingresarValoresMemoria}
                // type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Celular"
              />
            </Grid>
            {/* <Grid item xs={12} md={12}>
              <ImageUploader
                withIcon={false}
                key={fotoKey}
                singleImage={true}
                buttonText="Seleccione una imagen de perfil"
                onChange={subirFoto}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
              />
            </Grid> */}
          </Grid>

          {/* <Grid container justifyContent="center">
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
          </Grid> */}
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
                name="Calle"
                // value={usuario.nombreCompleto || ""}
                // onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Calle"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="NumExterior"
                // value={usuario.username || ""}
                // onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Numero exterior"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="NumInterior"
                // value={usuario.email || ""}
                // onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Numero interior"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Colonia"
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
                name="MunicipioAlcaldia"
                // value={usuario.confirmarPassword || ""}
                // onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Municipio/Alcaldia"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Estado"
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
                name="CodigoPostal"
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
                label="Ingrese Municipio/Alcaldia"
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
                label="Ingrese Estado"
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
            <Grid item xs={12} md={12}>
              <ImageUploader
                withIcon={false}
                key={fotoKey}
                singleImage={true}
                buttonText="Seleccione una imagen de perfil"
                onChange={subirFoto}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
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

export default NuevoSolicitante;
