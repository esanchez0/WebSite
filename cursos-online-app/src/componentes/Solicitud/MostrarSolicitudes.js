import React, { useState, useEffect } from "react";
import { paginacionCurso } from "../../actions/CursoAction";
import {
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  Table,
  TableRow,
  TableCell,
  TablePagination,
  Hidden,
  Grid,
  TextField,
} from "@material-ui/core";
import ControlTyping from "../Tool/ControlTyping";

import { obtenerSolicitudes } from "../../actions/SolicitudAction";

const MostrarSolicitudes = () => {
  //   const [textoBusquedaCurso, setTextoBusquedaCurso] = useState("");
  //   const typingBuscadorTexto = ControlTyping(textoBusquedaCurso, 900);

  //   const [paginadorRequest, setPaginadorRequest] = useState({
  //     titulo: "",
  //     numeroPagina: 0,
  //     cantidadElementos: 5,
  //   });

  //   const [paginadorResponse, setPaginadorResponse] = useState({
  //     listaRecords: [],
  //     totalRecords: 0,
  //     numeroPaginas: 0,
  //   });

  //   useEffect(() => {
  //     const obtenerListaCurso = async () => {
  //       let tituloVariant = "";
  //       let paginaVariant = paginadorRequest.numeroPagina + 1;

  //       if (typingBuscadorTexto) {
  //         tituloVariant = typingBuscadorTexto;
  //         paginaVariant = 1;
  //       }

  //       const objetoPaginadorRequest = {
  //         titulo: tituloVariant,
  //         numeroPagina: paginaVariant,
  //         cantidadElementos: paginadorRequest.cantidadElementos,
  //       };

  //       const response = await obtenerSolicitudes();
  //       console.log(response.data);
  //       setPaginadorResponse(response.data);
  //     };

  //     obtenerListaCurso();
  //   }, [paginadorRequest, typingBuscadorTexto]);

  //   const cambiarPagina = (event, nuevaPagina) => {
  //     setPaginadorRequest((anterior) => ({
  //       ...anterior,
  //       numeroPagina: parseInt(nuevaPagina),
  //     }));
  //   };

  //   const cambiarCantidadRecords = (event) => {
  //     setPaginadorRequest((anterior) => ({
  //       ...anterior,
  //       cantidadElementos: parseInt(event.target.value),
  //       numeroPagina: 0,
  //     }));
  //   };

  const [solicitud, setSolicitud] = useState({
    NombreCliente: "",
    PerfilActividad: "",
    Coordinacion: "",
    Analista: "",
    Asesor: "",
  });

  const [iniciaApp, setIniciaApp] = useState(true);
  useEffect(() => {
    const obtenerLineaNegocio = async () => {
      const response = await obtenerSolicitudes();
      setSolicitud(response.data);
      setIniciaApp(false);
    };

    obtenerLineaNegocio();
  }, [iniciaApp]);

  const rows = [];

  Object.keys(solicitud).forEach(function (key) {
    rows.push(solicitud[key]);
  });

  console.log("rows rows rows", rows);

  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        {/* <Grid item xs={12} sm={4} md={6}>
            <TextField
              fullWidth
              name="textoBusquedaCurso"
              variant="outlined"
              label="Busca tu curso"
              onChange={(e) => setTextoBusquedaCurso(e.target.value)}
            />
          </Grid> */}
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell align="left">Nombre Cliente</TableCell> */}
              <Hidden mdDown>
                <TableCell align="left">Nombre del cliente</TableCell>
                <TableCell align="left">Perfil actividad economica</TableCell>
                <TableCell align="left">Coordinacion</TableCell>
                <TableCell align="left">Analista</TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((curso) => ( */}
            {rows.map((row, index) => (
              <TableRow key={row.llaveUnica}>
                {/* <TableCell align="left">{curso.nombreCliente}</TableCell> */}

                <Hidden mdDown>
                  <TableCell align="left">{row.nombreCliente}</TableCell>
                  <TableCell align="left">{row.perfilActividadEconomica}</TableCell>
                  <TableCell align="left">{row.coordinacion}</TableCell>
                  <TableCell align="left">{row.analista}</TableCell>
                </Hidden>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={paginadorResponse.totalRecords}
          rowsPerPage={paginadorRequest.cantidadElementos}
          page={paginadorRequest.numeroPagina}
          onPageChange={cambiarPagina}
          onRowsPerPageChange={cambiarCantidadRecords}
          labelRowsPerPage="Cursos por pagina"
        /> */}
    </div>
  );
};

export default MostrarSolicitudes;
