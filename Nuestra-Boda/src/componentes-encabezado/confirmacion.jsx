import React, { useEffect, useState } from "react";

export default function ConfirmacionAsistencia() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState(0);

  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");
  const [datosCargados, setDatosCargados] = useState(false);

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxHqGt-0PZuDJaqs1pgeBBwxsRwD8dXRlsrg0KI3sqkf3lol79aPBrFP32GfTYbB9-L/exec";

  /*
  =====================================================
  DECODIFICAR DATOS DEL GENERADOR
  =====================================================

  El generador podrá crear enlaces como:

  https://tusitio.com/?data=...

  Dentro de "data" tendremos:

  {
    nombre: "Juan Pérez",
    pases: 4
  }

  También dejamos compatibilidad temporal con:

  ?nombre=Juan%20Perez&pases=4

  para poder hacer pruebas fácilmente.
  */

  const decodificarDatos = (valor) => {
    try {
      if (!valor) return null;

      /*
      ---------------------------------------
      Intentar como JSON directo
      ---------------------------------------
      */
      try {
        const texto = decodeURIComponent(valor);

        if (texto.startsWith("{")) {
          return JSON.parse(texto);
        }
      } catch {
        // continuar
      }

      /*
      ---------------------------------------
      BASE64 URL SAFE
      ---------------------------------------
      */

      let base64 = valor
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      while (base64.length % 4) {
        base64 += "=";
      }

      const binario = atob(base64);

      const bytes = Uint8Array.from(
        binario,
        (caracter) => caracter.charCodeAt(0)
      );

      const texto = new TextDecoder("utf-8").decode(bytes);

      return JSON.parse(texto);
    } catch (error) {
      console.error(
        "No se pudieron leer los datos de la invitación:",
        error
      );

      return null;
    }
  };

  /*
  =====================================================
  LEER URL AL ENTRAR
  =====================================================
  */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const data = params.get("data");

    /*
    =====================================================
    MÉTODO PRINCIPAL
    =====================================================
    */

    if (data) {
      const datos = decodificarDatos(data);

      if (datos) {
        const nombreInvitado =
          datos.nombre ||
          datos.name ||
          "";

        const numeroPases = parseInt(
          datos.pases ??
            datos.numeroPases ??
            datos.numero_pases ??
            0,
          10
        );

        setNombre(nombreInvitado);

        setPases(
          Number.isNaN(numeroPases)
            ? 0
            : numeroPases
        );

        setDatosCargados(true);

        return;
      }
    }

    /*
    =====================================================
    MÉTODO DE RESPALDO

    Útil mientras probamos:

    ?nombre=Juan%20Perez&pases=4
    =====================================================
    */

    const nombreURL = params.get("nombre");
    const pasesURL = params.get("pases");

    if (nombreURL) {
      setNombre(nombreURL);

      const numeroPases = parseInt(
        pasesURL || "1",
        10
      );

      setPases(
        Number.isNaN(numeroPases)
          ? 1
          : numeroPases
      );

      setDatosCargados(true);

      return;
    }

    /*
    =====================================================
    NO HAY DATOS
    =====================================================
    */

    setDatosCargados(true);
  }, []);

  /*
  =====================================================
  SELECCIONAR ASISTENCIA
  =====================================================
  */

  const seleccionarAsistencia = (valor) => {
    setAsistencia(valor);
    setConfirmacion("");

    /*
    Si dice que no asistirá,
    automáticamente serán 0 invitados.
    */

    if (valor === "No asistiré") {
      setInvitados("0");
    }

    /*
    Si cambia nuevamente a sí,
    limpiamos invitados.
    */

    if (valor === "Sí asistiré") {
      setInvitados("");
    }
  };

  /*
  =====================================================
  ENVIAR CONFIRMACIÓN
  =====================================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
    ---------------------------------------
    VALIDAR NOMBRE
    ---------------------------------------
    */

    if (!nombre.trim()) {
      setConfirmacion(
        "No pudimos identificar esta invitación."
      );

      return;
    }

    /*
    ---------------------------------------
    VALIDAR ASISTENCIA
    ---------------------------------------
    */

    if (!asistencia) {
      setConfirmacion(
        "Por favor selecciona si asistirás."
      );

      return;
    }

    /*
    ---------------------------------------
    VALIDAR INVITADOS
    ---------------------------------------
    */

    if (
      asistencia === "Sí asistiré" &&
      invitados === ""
    ) {
      setConfirmacion(
        "Selecciona cuántas personas asistirán."
      );

      return;
    }

    const numeroInvitados =
      asistencia === "No asistiré"
        ? 0
        : parseInt(invitados, 10);

    /*
    ---------------------------------------
    SEGURIDAD ADICIONAL
    ---------------------------------------

    Aunque alguien manipule el HTML,
    no permitimos enviar más invitados
    que pases asignados.
    */

    if (
      asistencia === "Sí asistiré" &&
      numeroInvitados > pases
    ) {
      setConfirmacion(
        `Tu invitación cuenta con un máximo de ${pases} ${
          pases === 1 ? "pase" : "pases"
        }.`
      );

      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      numeroInvitados < 1
    ) {
      setConfirmacion(
        "Selecciona al menos 1 asistente."
      );

      return;
    }

    setEnviando(true);
    setConfirmacion("");

    try {
      const datos = {
        tipo: "confirmacion",

        nombre: nombre.trim(),

        asistencia,

        pases,

        invitados: numeroInvitados,

        mensaje: mensaje.trim(),
      };

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(datos),
      });

      setConfirmacion(
        "¡Gracias! Tu confirmación fue enviada correctamente."
      );

      /*
      No limpiamos nombre ni pases
      porque pertenecen a la invitación.
      */

      setAsistencia("");
      setInvitados("");
      setMensaje("");
    } catch (error) {
      console.error(
        "Error al enviar confirmación:",
        error
      );

      setConfirmacion(
        "Ocurrió un error. Intenta nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  /*
  =====================================================
  CARGANDO DATOS
  =====================================================
  */

  if (!datosCargados) {
    return (
      <section className="w-full bg-[#B68B3C] px-5 py-20">
        <p
          className="
            text-center
            text-white
            font-['Cormorant_Garamond']
            text-2xl
          "
        >
          Cargando invitación...
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        w-full
        bg-[#B68B3C]
        px-5
        py-20
        sm:py-24
        overflow-hidden
      "
    >
      <div
        className="
          max-w-2xl
          mx-auto
          text-center
        "
      >
        {/* TEXTO SUPERIOR */}
        <p
          className="
            uppercase
            tracking-[0.28em]
            text-xs
            sm:text-sm
            text-white
          "
        >
          Nos encantará contar contigo
        </p>

        {/* TÍTULO */}
        <h2
          className="
            mt-5
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-['Cormorant_Garamond']
            font-medium
            text-white
            leading-tight
          "
        >
          Confirmación de Asistencia
        </h2>

        {/* DECORACIÓN */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-3
            mt-6
          "
        >
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

        <p
          className="
            mt-7
            text-xl
            sm:text-2xl
            font-['Cormorant_Garamond']
            text-white
          "
        >
          Confirma tu asistencia para ayudarnos
          a preparar todo para este día especial.
        </p>

        {/* ======================================
            SIN DATOS DEL GENERADOR
        ====================================== */}

        {!nombre ? (
          <div
            className="
              mt-10
              bg-white
              px-7
              py-10
              rounded-tl-[3rem]
              rounded-br-[3rem]
              rounded-tr-xl
              rounded-bl-xl
            "
          >
            <p
              className="
                text-2xl
                sm:text-3xl
                font-['Cormorant_Garamond']
                text-black
              "
            >
              Invitación no identificada
            </p>

            <p
              className="
                mt-4
                text-black
                font-['Cormorant_Garamond']
                text-lg
              "
            >
              Por favor abre el enlace personalizado
              que te enviaron los novios.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="
              mt-10
              bg-white
              px-6
              py-10
              sm:px-10
              sm:py-12
              rounded-tl-[3rem]
              rounded-br-[3rem]
              rounded-tr-xl
              rounded-bl-xl
              space-y-7
            "
          >
            {/* ======================================
                INVITADO
            ====================================== */}

            <div className="text-left">
              <label
                className="
                  block
                  mb-2
                  text-[#B68B3C]
                  uppercase
                  tracking-[0.2em]
                  text-xs
                  font-medium
                "
              >
                Invitación para
              </label>

              <input
                type="text"
                value={nombre}
                readOnly
                className="
                  w-full
                  px-5
                  py-4
                  rounded-xl
                  bg-white
                  text-black
                  border-2
                  border-[#B68B3C]
                  outline-none
                  cursor-default
                  font-['Cormorant_Garamond']
                  text-xl
                "
              />
            </div>

            {/* ======================================
                NÚMERO DE PASES
            ====================================== */}

            <div
              className="
                border-2
                border-[#B68B3C]
                rounded-xl
                px-5
                py-5
                text-center
              "
            >
              <p
                className="
                  text-[#B68B3C]
                  uppercase
                  tracking-[0.2em]
                  text-xs
                "
              >
                Número de pases
              </p>

              <p
                className="
                  mt-2
                  text-5xl
                  font-['Cormorant_Garamond']
                  font-medium
                  text-black
                "
              >
                {pases}
              </p>

              <p
                className="
                  mt-1
                  text-black
                  font-['Cormorant_Garamond']
                  text-lg
                "
              >
                {pases === 1
                  ? "persona"
                  : "personas"}
              </p>
            </div>

            {/* ======================================
                ASISTENCIA
            ====================================== */}

            <div>
              <p
                className="
                  text-[#B68B3C]
                  uppercase
                  tracking-[0.2em]
                  text-xs
                  mb-4
                "
              >
                ¿Podrás acompañarnos?
              </p>

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    seleccionarAsistencia(
                      "Sí asistiré"
                    )
                  }
                  className={`
                    py-4
                    rounded-xl
                    border-2
                    border-[#B68B3C]
                    transition-colors
                    duration-300
                    font-medium

                    ${
                      asistencia ===
                      "Sí asistiré"
                        ? "bg-[#B68B3C] text-white"
                        : "bg-white text-black"
                    }
                  `}
                >
                  Sí asistiré
                </button>

                <button
                  type="button"
                  onClick={() =>
                    seleccionarAsistencia(
                      "No asistiré"
                    )
                  }
                  className={`
                    py-4
                    rounded-xl
                    border-2
                    border-[#B68B3C]
                    transition-colors
                    duration-300
                    font-medium

                    ${
                      asistencia ===
                      "No asistiré"
                        ? "bg-[#B68B3C] text-white"
                        : "bg-white text-black"
                    }
                  `}
                >
                  No asistiré
                </button>
              </div>
            </div>

            {/* ======================================
                NÚMERO DE INVITADOS
            ====================================== */}

            {asistencia === "Sí asistiré" && (
              <div className="text-left">
                <label
                  htmlFor="invitados"
                  className="
                    block
                    mb-2
                    text-[#B68B3C]
                    uppercase
                    tracking-[0.2em]
                    text-xs
                    font-medium
                  "
                >
                  Personas que asistirán
                </label>

                <select
                  id="invitados"
                  value={invitados}
                  onChange={(e) =>
                    setInvitados(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-xl
                    bg-white
                    text-black
                    border-2
                    border-[#B68B3C]
                    outline-none
                    font-['Cormorant_Garamond']
                    text-xl
                  "
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  {Array.from(
                    {
                      length:
                        Math.max(pases, 0),
                    },
                    (_, index) =>
                      index + 1
                  ).map((cantidad) => (
                    <option
                      key={cantidad}
                      value={cantidad}
                    >
                      {cantidad}{" "}
                      {cantidad === 1
                        ? "persona"
                        : "personas"}
                    </option>
                  ))}
                </select>

                <p
                  className="
                    mt-2
                    text-sm
                    text-black
                  "
                >
                  Puedes confirmar hasta{" "}
                  <strong>
                    {pases}{" "}
                    {pases === 1
                      ? "persona"
                      : "personas"}
                  </strong>
                  .
                </p>
              </div>
            )}

            {/* ======================================
                MENSAJE
            ====================================== */}

            <div className="text-left">
              <label
                htmlFor="mensaje"
                className="
                  block
                  mb-2
                  text-[#B68B3C]
                  uppercase
                  tracking-[0.2em]
                  text-xs
                  font-medium
                "
              >
                Mensaje para los novios
              </label>

              <textarea
                id="mensaje"
                placeholder="Escribe un mensaje..."
                value={mensaje}
                onChange={(e) =>
                  setMensaje(
                    e.target.value
                  )
                }
                rows="4"
                className="
                  w-full
                  px-5
                  py-4
                  rounded-xl
                  bg-white
                  text-black
                  border-2
                  border-[#B68B3C]
                  outline-none
                  resize-none
                  font-['Cormorant_Garamond']
                  text-lg
                "
              />
            </div>

            {/* ======================================
                ENVIAR
            ====================================== */}

            <button
              type="submit"
              disabled={enviando}
              className="
                w-full
                py-4
                px-6
                rounded-full
                bg-[#B68B3C]
                text-white
                uppercase
                tracking-[0.18em]
                text-xs
                sm:text-sm
                font-medium
                border-2
                border-[#B68B3C]
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {enviando
                ? "Enviando..."
                : "Enviar confirmación"}
            </button>

            {/* ======================================
                RESULTADO
            ====================================== */}

            {confirmacion && (
              <p
                className="
                  text-black
                  font-['Cormorant_Garamond']
                  text-xl
                  font-medium
                "
              >
                {confirmacion}
              </p>
            )}
          </form>
        )}

        {/* FIRMA */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-3
            mt-10
          "
        >
          <span className="w-10 h-px bg-white" />

          <span
            className="
              text-white
              font-['Cormorant_Garamond']
              italic
              text-xl
            "
          >
            Guillermo & Itzel
          </span>

          <span className="w-10 h-px bg-white" />
        </div>
      </div>
    </section>
  );
}