import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Portada from "./portada";
import Intinerario from "./intinerario";
import Generador from "./pages/Generador";

const Invitacion = () => {
  return (
    <main>
      <div>
        <Portada />
        <Intinerario />
      </div>
    </main>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* INVITACIÓN */}
        <Route path="/" element={<Invitacion />} />

        {/* GENERADOR */}
        <Route path="/generador" element={<Generador />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);