import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

const SugerirCancion = () => {
  const [nombre, setNombre] = useState("");
  const [cancion, setCancion] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Aquí pondremos el mismo Apps Script que usaremos
  // para confirmaciones y canciones.
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHqGt-0PZuDJaqs1pgeBBwxsRwD8dXRlsrg0KI3sqkf3lol79aPBrFP32GfTYbB9-L/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !cancion.trim()) {
      setMensaje("Por favor completa tu nombre y la canción.");
      return;
    }

    setEnviando(true);
    setMensaje("");

    try {
      const datos = {
        tipo: "cancion",
        nombre: nombre.trim(),
        cancion: cancion.trim(),
      };

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      setMensaje("¡Gracias! Tu canción ya está en nuestra lista.");
      setNombre("");
      setCancion("");
    } catch (error) {
      console.error("Error al enviar la canción:", error);
      setMensaje(
        "No pudimos enviar tu sugerencia. Inténtalo nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section
      className="
        w-full
        bg-white
        py-20
        sm:py-24
        px-5
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="
          max-w-3xl
          w-full
          bg-[#B68B3C]
          px-7
          py-14
          sm:px-12
          sm:py-16
          text-center

          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-[1rem]
          rounded-bl-[1rem]
        "
      >
        {/* ICONO */}
        <div
          className="
            w-16
            h-16
            mx-auto
            bg-white
            rounded-full
            flex
            items-center
            justify-center
            text-[#B68B3C]
          "
        >
          <Music2 size={28} />
        </div>

        {/* SUBTÍTULO */}
        <p
          className="
            mt-7
            text-white
            uppercase
            tracking-[0.25em]
            text-xs
            sm:text-sm
          "
        >
          Nuestra Playlist
        </p>

        {/* TÍTULO */}
        <h2
          className="
            mt-4
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-['Cormorant_Garamond']
            font-medium
            text-white
            leading-tight
          "
        >
          Sugiere una canción
        </h2>

        {/* SEPARADOR */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="w-12 h-px bg-white" />

          <span
            className="
              w-[6px]
              h-[6px]
              bg-white
              rotate-45
            "
          />

          <span className="w-12 h-px bg-white" />
        </div>

        {/* MENSAJE */}
        <p
          className="
            mt-7
            max-w-xl
            mx-auto
            text-xl
            sm:text-2xl
            font-['Cormorant_Garamond']
            text-white
            leading-relaxed
          "
        >
          Queremos que la pista también tenga un poquito de ti.
          Recomiéndanos una canción que no pueda faltar en nuestra
          celebración.
        </p>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          className="
            mt-10
            max-w-lg
            mx-auto
            flex
            flex-col
            gap-5
          "
        >
          {/* NOMBRE */}
          <div className="text-left">
            <label
              htmlFor="nombreCancion"
              className="
                block
                mb-2
                text-white
                uppercase
                tracking-[0.18em]
                text-xs
              "
            >
              Tu nombre
            </label>

            <input
              id="nombreCancion"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre"
              className="
                w-full
                bg-white
                text-black
                px-5
                py-4
                rounded-xl
                border-2
                border-white
                outline-none
                font-['Cormorant_Garamond']
                text-lg
              "
            />
          </div>

          {/* CANCIÓN */}
          <div className="text-left">
            <label
              htmlFor="cancion"
              className="
                block
                mb-2
                text-white
                uppercase
                tracking-[0.18em]
                text-xs
              "
            >
              Canción sugerida
            </label>

            <input
              id="cancion"
              type="text"
              value={cancion}
              onChange={(e) => setCancion(e.target.value)}
              placeholder="Ej. Perfect - Ed Sheeran"
              className="
                w-full
                bg-white
                text-black
                px-5
                py-4
                rounded-xl
                border-2
                border-white
                outline-none
                font-['Cormorant_Garamond']
                text-lg
              "
            />
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={enviando}
            className="
              mt-3
              bg-white
              text-black
              px-8
              py-4
              rounded-full
              uppercase
              tracking-[0.18em]
              text-xs
              sm:text-sm
              font-medium
              border-2
              border-white
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {enviando ? "Enviando..." : "Sugerir canción"}
          </button>
        </form>

        {/* MENSAJE DE ESTADO */}
        {mensaje && (
          <p
            className="
              mt-6
              text-white
              font-['Cormorant_Garamond']
              text-xl
            "
          >
            {mensaje}
          </p>
        )}

        {/* FIRMA */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <span className="w-10 h-px bg-white" />

          <span
            className="
              font-['Cormorant_Garamond']
              italic
              text-white
              text-lg
            "
          >
            Guillermo & Itzel
          </span>

          <span className="w-10 h-px bg-white" />
        </div>
      </motion.div>
    </section>
  );
};

export default SugerirCancion;