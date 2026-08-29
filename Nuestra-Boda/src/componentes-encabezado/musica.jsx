import React, { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, X } from "lucide-react";

const Musica = ({
  src = "/musica.mp3",
  titulo = "Nuestra canción",
  texto = "Queremos acompañar este momento con una canción especial.",
}) => {
  const audioRef = useRef(null);

  const [modalAbierto, setModalAbierto] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
    }
  }, []);

  const iniciarMusica = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setReproduciendo(true);
        setModalAbierto(false);
      }
    } catch (error) {
      console.error("No se pudo reproducir la música:", error);
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const toggleMusica = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setReproduciendo(true);
      } else {
        audioRef.current.pause();
        setReproduciendo(false);
      }
    } catch (error) {
      console.error("Error al controlar la música:", error);
    }
  };

  return (
    <>
      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onPlay={() => setReproduciendo(true)}
        onPause={() => setReproduciendo(false)}
      />

      {/* VENTANA EMERGENTE */}
      {modalAbierto && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            bg-black/70
            flex
            items-center
            justify-center
            px-5
          "
        >
          <div
            className="
              relative
              w-full
              max-w-md
              bg-white
              border-2
              border-[#B68B3C]
              rounded-tl-[3rem]
              rounded-br-[3rem]
              rounded-tr-xl
              rounded-bl-xl
              px-7
              py-10
              text-center
            "
          >
            {/* CERRAR */}
            <button
              onClick={cerrarModal}
              className="
                absolute
                top-4
                right-4
                w-9
                h-9
                rounded-full
                border
                border-[#B68B3C]
                flex
                items-center
                justify-center
                text-[#B68B3C]
                hover:bg-[#B68B3C]
                hover:text-white
                transition-colors
              "
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            {/* ICONO */}
            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-full
                bg-[#B68B3C]
                flex
                items-center
                justify-center
                text-white
              "
            >
              <Music size={28} />
            </div>

            {/* TÍTULO */}
            <h2
              className="
                mt-6
                text-3xl
                sm:text-4xl
                font-['Cormorant_Garamond']
                font-medium
                text-black
              "
            >
              {titulo}
            </h2>

            {/* SEPARADOR */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <span className="w-10 h-px bg-[#B68B3C]" />

              <span
                className="
                  w-[6px]
                  h-[6px]
                  bg-[#B68B3C]
                  rotate-45
                "
              />

              <span className="w-10 h-px bg-[#B68B3C]" />
            </div>

            {/* TEXTO */}
            <p
              className="
                mt-6
                text-lg
                sm:text-xl
                font-['Cormorant_Garamond']
                text-black
                leading-relaxed
              "
            >
              {texto}
            </p>

            {/* BOTÓN */}
            <button
              onClick={iniciarMusica}
              className="
                mt-8
                bg-[#B68B3C]
                text-white
                px-8
                py-3
                rounded-full
                uppercase
                tracking-[0.18em]
                text-xs
                sm:text-sm
                font-medium
                flex
                items-center
                justify-center
                gap-3
                mx-auto
                hover:bg-black
                transition-colors
              "
            >
              <Play size={17} fill="currentColor" />
              Escuchar música
            </button>

            {/* CONTINUAR SIN MÚSICA */}
            <button
              onClick={cerrarModal}
              className="
                mt-5
                text-black
                text-sm
                underline
                underline-offset-4
              "
            >
              Continuar sin música
            </button>
          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE */}
      {!modalAbierto && (
        <button
          onClick={toggleMusica}
          className="
            fixed
            bottom-5
            right-5
            z-[9998]
            w-14
            h-14
            rounded-full
            bg-[#B68B3C]
            text-white
            border-2
            border-white
            flex
            items-center
            justify-center
          "
          aria-label={
            reproduciendo ? "Pausar música" : "Reproducir música"
          }
        >
          {reproduciendo ? (
            <Pause size={22} fill="currentColor" />
          ) : (
            <Play size={22} fill="currentColor" />
          )}
        </button>
      )}
    </>
  );
};

export default Musica;