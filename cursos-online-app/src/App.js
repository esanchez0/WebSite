import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  MuiThemeProvider,
  Snackbar,
  TextField,
} from "@material-ui/core";
import theme from "./theme/theme";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNavbar from "./componentes/navegacion/AppNavbar";
import { useStateValue } from "./contexto/store";
import { obtenerUsuarioActual, registrarUsuario } from "./actions/UsuarioAction";
import RutaSegura from "./componentes/navegacion/RutaSegura";
import NuevoCurso from "./componentes/Cursos/NuevoCurso";
import PaginadorCurso from "./componentes/Cursos/PaginadorCurso";
import NuevoSolicitante from "./componentes/Solicitante/NuevoSolicitante";
import FINANMADRID_ARRENDADOR from "./componentes/CuestionariosDeVisitas/FINANMADRID_ARRENDADOR";
import FINANMADRID_EMPLEADO from "./componentes/CuestionariosDeVisitas/FINANMADRID_EMPLEADO";
import FINANMADRID_EMPRESARIAL from "./componentes/CuestionariosDeVisitas/FINANMADRID_EMPRESARIAL";
import NuevaSolicitud from "./componentes/Solicitud/NuevaSolicitud";
import MostrarSolicitudes from "./componentes/Solicitud/MostrarSolicitudes";


import testpopup from "./componentes/Solicitud/testpopup";

function App() {
  const [{ sesionUsuario, openSnackbar }, dispatch] = useStateValue(); //useStateValue = inicializador del contenedor todo el contexto de la aplicacion
  //dispatch = representacion del contexto

  const [iniciaApp, setIniciaApp] = useState(false);

  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuarioActual(dispatch)
        .then((response) => {
          setIniciaApp(true);
        })
        .catch((error) => {
          setIniciaApp(true);
        });
    }
  }, [iniciaApp]);

  return iniciaApp === false ? null : (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: "",
            },
          })
        }
      ></Snackbar>

      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavbar></AppNavbar>
          <Grid container>
            <Switch>
              <Route exact path="/auth/login" component={Login} />
              <Route
                exact
                path="/auth/registrar"
                component={RegistrarUsuario}
              />
              
              {/*Usuarios*/} 
              <RutaSegura exact path="/auth/perfil" component={PerfilUsuario} />
              <RutaSegura exact path="/usuario/nuevo" component={RegistrarUsuario} />
               
              {/*Solicitudes*/} 
              <RutaSegura exact path="/solicitud/nueva" component={NuevaSolicitud} />
              <RutaSegura exact path="/solicitud/lista" component={MostrarSolicitudes} />




              {/* <RutaSegura exact path="/usuario/lista" component={RegistrarUsuario} /> */}

              {/* <RutaSegura exact path="/auth/perfil" component={PerfilUsuario} /> */}
              {/* <RutaSegura exact path="/auth/perfil" component={NuevoSolicitante} /> */}
              {/* <RutaSegura exact path="/auth/perfil" component={FINANMADRID_EMPRESARIAL} /> */}
              {/* <RutaSegura exact path="/auth/perfil" component={NuevaSolicitud} /> */}
              
              
            
              <RutaSegura exact path="/" component={PerfilUsuario} />
              <RutaSegura exact path="/curso/nuevo" component={NuevoCurso} />

              <RutaSegura
                exact
                path="/curso/paginador"
                component={PaginadorCurso}
              />
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
