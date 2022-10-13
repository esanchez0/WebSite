import React from "react";
import { useStateValue } from "../../contexto/store";
import { Route, Redirect } from "react-router-dom";

//Component PARAMETRO JASON
//rest PROPIEDADES DE LA FUNCION
function RutaSegura({ component: Component, ...rest }) {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  //Se regresara una ruta condicionada
  return (
    <Route 
        {...rest} //tendra todas las caracteristicas originales que se pasa desde el parametro rest
        //Condiconamos el render, si la autentificacion es = true, se pintara la pagina que se solicito 
        render = { (props) =>
            sesionUsuario ? (
                sesionUsuario.autenticado == true ? (
                    <Component {...props} {...rest} />
                )
                : <Redirect to="/auth/login" />
            ): <Redirect to="/auth/login" />
        }
    />
  );
}

export default RutaSegura;
