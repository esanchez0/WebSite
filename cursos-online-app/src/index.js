import React from "react";
// import reportWebVitals from "./reportWebVitals";
import App from "./App";
import ReactDOM from "react-dom";
import { initialState } from "./contexto/initialState"; //A qui se concentran todas las sesiones
import { StateProvider } from "./contexto/store"; // Inicizlizador del contenedor de variables globales
import { mainReducer } from "./contexto/reducers"; //indice de variables globales

// import { useContext, useEffect, useRef } from "react";

ReactDOM.render(
  // <React.StrictMode>
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <App />
    </StateProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
