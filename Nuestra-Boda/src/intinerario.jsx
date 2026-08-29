import React from "react";
import Celebracion from "./componentes-encabezado/ubicacion";
import Vestimenta from "./componentes-encabezado/vestimenta";
import Novios from "./componentes-encabezado/novios";
import ConfirmacionAsistencia from "./componentes-encabezado/confirmacion";
import Musica from "./componentes-encabezado/musica";
import CuentaRegresiva from "./componentes-encabezado/CuentaRegresiva";
import SugerirCancion from "./componentes-encabezado/sugerencias";
import Galeria from "./componentes-encabezado/galeria";

export default function Itinerario() {

  return (
    <div>

      <Musica/>



      <Novios />
  
      <CuentaRegresiva/>

      <SugerirCancion/>
      <div className=" overflow-hidden">

        <Celebracion/>



      </div>

      <Vestimenta />

      <Galeria/>


      <ConfirmacionAsistencia/>
    </div>
  );
}