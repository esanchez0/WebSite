import React, { useState,useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

import style from "../Tool/Style";
import { registrarUsuario } from "../../actions/UsuarioAction";
import { obtenerRoles } from "../../actions/UsuarioAction";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { catalogosComunes } from "../../actions/CatalogosAction";

const RegistrarUsuario = () => {
  const [usuario, setUsuario] = useState({
    NombreCompleto: "",
    Email: "",
    Username: "",
    Password: "",
    ConfirmarPassword: "",
    NombreRol:""
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const [iniciaApp, setIniciaApp] = useState(true);

    //------- COMBO Roles
  //------- COMBO LINEA NEGOCIO
  const initialValue = [{ id: 0, name: "" }];
  const [ComboLineaNegocio, setComboLineaNegocio] = useState(initialValue);
  useEffect(() => {
    const obtenerLineaNegocio = async () => {
      const response = await obtenerRoles();
      setComboLineaNegocio(response.data);
      console.log("La Data COmbo", response.data);
      setIniciaApp(false);
    };

    obtenerLineaNegocio();
  }, [iniciaApp]);

  const changeLineaNegocio = (e) => {
    setUsuario((anterior) => ({
      ...anterior,
      NombreRol: e.name,
    }));
  };

  const registrarUsuarioBoton = (e) => {
    e.preventDefault();

    registrarUsuario(usuario).then(response => {
        console.log('Se registro exitosamente el usuario', response);
        window.localStorage.setItem("token_seguridad", response.data.token);//Almacenando token
        console.log("imprime los valores de memoria temporal de usuario", response.data);
    })

   
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Nuevo Usuario
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="NombreCompleto"
                value={usuario.NombreCompleto }
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese nombre y apellidos"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Email"
                value={usuario.Email}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese su email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Username"
                value={usuario.Username}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese su username"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Password"
                value={usuario.Password}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="ConfirmarPassword"
                value={usuario.ConfirmarPassword}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Confirme Password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <Autocomplete
                onChange={(event, newValue) => {
                  changeLineaNegocio(newValue);
                }}
                id="NombreRol"
                name="NombreRol"
                options={ComboLineaNegocio}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Roles" variant="outlined" />
                )}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                onClick={registrarUsuarioBoton}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={style.submit}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegistrarUsuario;
