import React, { useState, useEffect } from "react";
import { paginacionCurso } from "../../actions/CursoAction";
import { Modal, Button, Box } from "@material-ui/core";
import ControlTyping from "../Tool/ControlTyping";
import NuevaSolicitud from "./NuevaSolicitud";
import ModalEditar from "./ModalEditar";
import ModalDetalles from "./ModalDetalles";
import ModalagregarCita from "./ModalagregarCita";

import { obtenerSolicitudes } from "../../actions/SolicitudAction";

const MostrarSolicitudes = () => {
  const [open, setopen] = useState(false);
  const [openDetalles, setopenDetalles] = useState(false);
  const [openCita, setopenCita] = useState(false);
  const [solicitud, setSolicitud] = useState([]);
  const [idSolicitud, setidSolicitud] = useState("");
  const [Information, setInformation] = useState({});
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

  const handleOpen = () => {
    setopen(!open);
  };

  const handleOpenDetalles = () => {
    setInformation();
    setopenDetalles(!openDetalles);
  };

  const handleOpenCita = () => {
    setopenCita(!openCita);
  };

  return (
    <div className="flex flex-col  w-full mt-10 ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nombre Cliente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Perfil Actividad
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Coordinacion
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Analista
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Asesor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider mx-auto"
                  >
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row) => (
                  <tr key={row.idSolicitud}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {row.nombreCliente}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {row.perfilActividadEconomica}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {row.coordinacion}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {row.analista}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{row.asesor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  ">
                      <div className="text-sm text-gray-900 flex flex-col md:flex-row mx-auto justify-between  ">
                        {/* <button
                          onClick={() => {
                            setopen(true);
                            setInformation(row);
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                        >
                          Editar
                        </button> */}
                        <button
                          onClick={() => {
                            setopenDetalles(true);
                            setInformation(row);
                            setidSolicitud(row.idSolicitud);  
                          }}
                          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                        >
                          Detalles
                        </button>
                        <button
                          onClick={() => {
                            setopenCita(true);
                            setidSolicitud(row.idSolicitud);
                            console.log(row.idSolicitud);
                          }}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                        >
                          Agregar cita
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalEditar
        open={open}
        handleOpen={handleOpen}
        Information={Information}
        setopen={setopen}
      />

      <ModalDetalles
        openDetalles={openDetalles}
        handleOpenDetalles={handleOpenDetalles}
        Information={Information}
        setopenDetalles={setopenDetalles}
        setInformation={setInformation}
        idSolicitud={idSolicitud}
      />

      <ModalagregarCita
        openCita={openCita}
        handleOpenCita={handleOpenCita}
        idSolicitud={idSolicitud}
        setopenCita={setopenCita}
        setInformation={setInformation}
      />
    </div>
  );
};

export default MostrarSolicitudes;
