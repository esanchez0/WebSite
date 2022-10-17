import React, { useState, useEffect } from "react";
import { paginacionCurso } from "../../actions/CursoAction";
import { Modal, Button, Box } from "@material-ui/core";
import ControlTyping from "../Tool/ControlTyping";
import NuevaSolicitud from "./NuevaSolicitud";

const ModalEditar = ({open, setopen}) => {


  const handleOpen = () => {     
    setopen(true); 
  };

  return (
    <Modal
      open={open}
      onClose={handleOpen} 
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "scroll", scrollSnapType: "y mandatory" }}
    >
      <Box>
        <div className="flex flex-col justify-center items-center  bg-slate-300 md:w-1/2 w-11/12 mx-auto snap-y">
          <NuevaSolicitud />
          <button
            onClick={() => setopen(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 mt-5 "
          >
            Cancelar
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalEditar;
