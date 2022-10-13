import React, { useState } from "react";
import style from "../Tool/Style";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginUsuario } from "../../actions/UsuarioAction";
import { withRouter } from "react-router-dom";
import { useStateValue } from "../../contexto/store";

const Login = (props) => {
  const [{ usuarioSesion }, dispatch] = useStateValue();

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  // const loginUsuarioBoton = (e) => {
  //   e.preventDefault();
  //   loginUsuario(usuario).then((response) => {
  //     console.log("login exitoso", response);
  //     window.localStorage.setItem("token_seguridad", response.data.token);
  //     props.history.push("/auth/perfil");
  //   });
  // };

  const loginUsuarioBoton = (e) => {
    e.preventDefault();
    loginUsuario(usuario, dispatch).then((response) => {
      console.log("response.data.token", response.data.token);
      if (response.status === 200) {
        window.localStorage.setItem("token_seguridad", response.data.token);
        props.history.push("/");
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Las credenciales del usuario son incorrectas",
          },
        });
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LockOutlinedIcon style={style.icon}></LockOutlinedIcon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login de Usuario
        </Typography>
        <form style={style.form}>
          <TextField
            variant="outlined"
            value={usuario.username}
            onChange={ingresarValoresMemoria}
            label="Ingrese mail"
            name="email"
            fullWidth
            margin="normal"
          ></TextField>
          <TextField
            variant="outlined"
            value={usuario.password}
            onChange={ingresarValoresMemoria}
            type="password"
            label="Ingrese password"
            name="password"
            fullWidth
            margin="normal"
          ></TextField>
          <Button
            type="submit"
            onClick={loginUsuarioBoton}
            fullWidth
            variant="contained"
            color="primary"
            style={style.submit}
          >
            Enviar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Login);
