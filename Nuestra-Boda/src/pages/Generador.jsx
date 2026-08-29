import React, { useMemo, useState } from "react";
import {
  Copy,
  Check,
  MessageCircle,
  Link as LinkIcon,
  Users,
} from "lucide-react";

export default function GeneradorInvitaciones() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("");

  const [copiadoLink, setCopiadoLink] = useState(false);
  const [copiadoMensaje, setCopiadoMensaje] = useState(false);

  /*
  =====================================================
  CONFIGURACIÓN AUTOMÁTICA DE URL
  =====================================================

  NO necesitas cambiar esta URL.

  En desarrollo:
  http://localhost:5173/

  En Vercel:
  https://tu-proyecto.vercel.app/

  Con dominio propio:
  https://tudominio.com/

  window.location.origin detectará automáticamente
  dónde está funcionando la aplicación.
  */

  const URL_INVITACION = `${window.location.origin}/`;

  /*
  =====================================================
  IMAGEN DEL GENERADOR
  =====================================================
  */

  const IMAGEN_NOVIOS = "/vistaprevia02.avif";

  /*
  =====================================================
  CODIFICAR DATOS
  =====================================================

  Convertimos:

  {
    nombre: "Familia Chávez",
    pases: 5
  }

  en un texto codificado para colocarlo
  dentro de ?data=
  */

  const codificarDatos = (datos) => {
    try {
      const texto = JSON.stringify(datos);

      const bytes = new TextEncoder().encode(texto);

      let binario = "";

      bytes.forEach((byte) => {
        binario += String.fromCharCode(byte);
      });

      const base64 = btoa(binario);

      /*
      Convertimos Base64 normal
      en Base64 URL Safe.
      */

      return base64
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
    } catch (error) {
      console.error(
        "Error al codificar los datos:",
        error
      );

      return "";
    }
  };

  /*
  =====================================================
  NORMALIZAR NÚMERO DE PASES
  =====================================================
  */

  const numeroPases = useMemo(() => {
    const numero = parseInt(pases, 10);

    if (
      Number.isNaN(numero) ||
      numero < 1
    ) {
      return 0;
    }

    return numero;
  }, [pases]);

  /*
  =====================================================
  GENERAR LINK
  =====================================================
  */

  const linkInvitacion = useMemo(() => {
    if (
      !nombre.trim() ||
      numeroPases < 1
    ) {
      return "";
    }

    /*
    Datos que leerá posteriormente
    ConfirmacionAsistencia.jsx
    */

    const datos = {
      nombre: nombre.trim(),
      pases: numeroPases,
    };

    const data = codificarDatos(datos);

    if (!data) {
      return "";
    }

    return `${URL_INVITACION}?data=${encodeURIComponent(
      data
    )}`;
  }, [nombre, numeroPases, URL_INVITACION]);

  /*
  =====================================================
  MENSAJE DE WHATSAPP
  =====================================================
  */

  const mensajeWhatsApp = useMemo(() => {
    if (
      !nombre.trim() ||
      numeroPases < 1 ||
      !linkInvitacion
    ) {
      return "";
    }

    return `Hola ${nombre.trim()} ✨

Guillermo & Itzel tienen el gusto de invitarte a compartir con ellos uno de los días más importantes de sus vidas. 🤍

Tu invitación cuenta con ${
      numeroPases === 1
        ? "1 pase"
        : `${numeroPases} pases`
    }.

Puedes consultar todos los detalles de la boda y confirmar tu asistencia en el siguiente enlace:

${linkInvitacion}

Con cariño,
Guillermo & Itzel 💍`;
  }, [
    nombre,
    numeroPases,
    linkInvitacion,
  ]);

  /*
  =====================================================
  COPIAR TEXTO
  =====================================================
  */

  const copiarTexto = async (texto) => {
    if (!texto) return false;

    try {
      await navigator.clipboard.writeText(texto);

      return true;
    } catch (error) {
      console.error(
        "No se pudo copiar:",
        error
      );

      /*
      Método de respaldo para navegadores
      donde navigator.clipboard falle.
      */

      try {
        const textarea =
          document.createElement("textarea");

        textarea.value = texto;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);

        return true;
      } catch (errorSecundario) {
        console.error(
          "Tampoco se pudo copiar con el método alternativo:",
          errorSecundario
        );

        return false;
      }
    }
  };

  /*
  =====================================================
  COPIAR LINK
  =====================================================
  */

  const copiarLink = async () => {
    if (!linkInvitacion) return;

    const resultado =
      await copiarTexto(linkInvitacion);

    if (resultado) {
      setCopiadoLink(true);

      setTimeout(() => {
        setCopiadoLink(false);
      }, 1800);
    }
  };

  /*
  =====================================================
  COPIAR MENSAJE
  =====================================================
  */

  const copiarMensaje = async () => {
    if (!mensajeWhatsApp) return;

    const resultado =
      await copiarTexto(mensajeWhatsApp);

    if (resultado) {
      setCopiadoMensaje(true);

      setTimeout(() => {
        setCopiadoMensaje(false);
      }, 1800);
    }
  };

  /*
  =====================================================
  ABRIR WHATSAPP
  =====================================================
  */

  const enviarWhatsApp = () => {
    if (!mensajeWhatsApp) return;

    const urlWhatsApp =
      `https://wa.me/?text=${encodeURIComponent(
        mensajeWhatsApp
      )}`;

    window.open(
      urlWhatsApp,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /*
  =====================================================
  NUEVA INVITACIÓN
  =====================================================
  */

  const limpiar = () => {
    setNombre("");
    setPases("");

    setCopiadoLink(false);
    setCopiadoMensaje(false);
  };

  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (
    <section
      className="
        min-h-screen
        w-full
        bg-white
        px-5
        py-12
        sm:py-16
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* ==========================================
            ENCABEZADO
        ========================================== */}

        <div className="text-center mb-12">
          <p
            className="
              text-[#B68B3C]
              uppercase
              tracking-[0.3em]
              text-xs
              sm:text-sm
              font-medium
            "
          >
            Guillermo & Itzel
          </p>

          <h1
            className="
              mt-4
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-['Cormorant_Garamond']
              font-medium
              text-black
            "
          >
            Generador de Invitaciones
          </h1>

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
            <span
              className="
                w-12
                h-px
                bg-[#B68B3C]
              "
            />

            <span
              className="
                w-[6px]
                h-[6px]
                bg-[#B68B3C]
                rotate-45
              "
            />

            <span
              className="
                w-12
                h-px
                bg-[#B68B3C]
              "
            />
          </div>

          <p
            className="
              mt-6
              max-w-xl
              mx-auto
              text-lg
              sm:text-xl
              font-['Cormorant_Garamond']
              text-black
            "
          >
            Crea una invitación personalizada
            asignando el nombre del invitado y
            su número de pases.
          </p>
        </div>

        {/* ==========================================
            CONTENIDO
        ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
            lg:gap-10
          "
        >

          {/* ========================================
              FORMULARIO
          ======================================== */}

          <div
            className="
              bg-[#B68B3C]
              px-6
              py-10
              sm:px-9
              sm:py-12

              rounded-tl-[3rem]
              rounded-br-[3rem]
              rounded-tr-xl
              rounded-bl-xl
            "
          >
            <h2
              className="
                text-3xl
                sm:text-4xl
                font-['Cormorant_Garamond']
                text-white
                font-medium
                text-center
              "
            >
              Datos del invitado
            </h2>

            <div className="mt-8 space-y-6">

              {/* ==================================
                  NOMBRE
              ================================== */}

              <div>
                <label
                  htmlFor="nombre"
                  className="
                    block
                    mb-2
                    text-white
                    uppercase
                    tracking-[0.18em]
                    text-xs
                  "
                >
                  Nombre del invitado
                </label>

                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) =>
                    setNombre(e.target.value)
                  }
                  placeholder="Ej. Familia Chávez"
                  autoComplete="off"
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
                    text-xl
                  "
                />
              </div>

              {/* ==================================
                  PASES
              ================================== */}

              <div>
                <label
                  htmlFor="pases"
                  className="
                    block
                    mb-2
                    text-white
                    uppercase
                    tracking-[0.18em]
                    text-xs
                  "
                >
                  Número de pases
                </label>

                <div className="relative">
                  <Users
                    size={19}
                    className="
                      absolute
                      left-5
                      top-1/2
                      -translate-y-1/2
                      text-[#B68B3C]
                    "
                  />

                  <input
                    id="pases"
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={pases}
                    onChange={(e) =>
                      setPases(e.target.value)
                    }
                    placeholder="Ej. 5"
                    className="
                      w-full
                      bg-white
                      text-black
                      pl-14
                      pr-5
                      py-4
                      rounded-xl
                      border-2
                      border-white
                      outline-none

                      font-['Cormorant_Garamond']
                      text-xl
                    "
                  />
                </div>
              </div>

              {/* ==================================
                  LINK GENERADO
              ================================== */}

              <div>
                <label
                  className="
                    block
                    mb-2
                    text-white
                    uppercase
                    tracking-[0.18em]
                    text-xs
                  "
                >
                  Link generado
                </label>

                <div
                  className="
                    bg-white
                    rounded-xl
                    px-4
                    py-4
                    min-h-[74px]

                    flex
                    items-center
                    gap-3
                  "
                >
                  <LinkIcon
                    size={19}
                    className="
                      text-[#B68B3C]
                      shrink-0
                    "
                  />

                  <p
                    className="
                      text-black
                      text-sm
                      break-all
                      leading-relaxed
                    "
                  >
                    {linkInvitacion ||
                      "El enlace aparecerá aquí..."}
                  </p>
                </div>
              </div>

              {/* ==================================
                  BOTONES
              ================================== */}

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
                  onClick={copiarLink}
                  disabled={!linkInvitacion}
                  className="
                    bg-white
                    text-black
                    py-4
                    px-5
                    rounded-full

                    flex
                    items-center
                    justify-center
                    gap-2

                    uppercase
                    tracking-[0.12em]
                    text-xs
                    font-medium

                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {copiadoLink ? (
                    <>
                      <Check size={17} />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy size={17} />
                      Copiar link
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={limpiar}
                  className="
                    bg-[#B68B3C]
                    text-white
                    py-4
                    px-5
                    rounded-full
                    border-2
                    border-white

                    uppercase
                    tracking-[0.12em]
                    text-xs
                    font-medium
                  "
                >
                  Nueva invitación
                </button>
              </div>
            </div>
          </div>

          {/* ========================================
              VISTA PREVIA
          ======================================== */}

          <div
            className="
              border-2
              border-[#B68B3C]
              bg-white
              overflow-hidden

              rounded-tl-[3rem]
              rounded-br-[3rem]
              rounded-tr-xl
              rounded-bl-xl
            "
          >

            {/* ==================================
                IMAGEN
            ================================== */}

            <div
              className="
                relative
                w-full
                h-[260px]
                sm:h-[320px]
                overflow-hidden
              "
            >
              <img
                src="portada.jpg"
                alt="Guillermo e Itzel"
                className="
                  w-full
                  h-full
                  object-cover
                  object-center
                "
              />
            </div>

            {/* ==================================
                MENSAJE
            ================================== */}

            <div
              className="
                px-6
                py-8
                sm:px-9
                sm:py-10
              "
            >
              <p
                className="
                  text-[#B68B3C]
                  uppercase
                  tracking-[0.22em]
                  text-xs
                  font-medium
                "
              >
                Vista previa del mensaje
              </p>

              <h3
                className="
                  mt-3
                  text-3xl
                  sm:text-4xl
                  font-['Cormorant_Garamond']
                  font-medium
                  text-black
                "
              >
                Invitación personalizada
              </h3>

              <div
                className="
                  mt-6
                  bg-white
                  border-2
                  border-[#B68B3C]
                  rounded-xl
                  p-5
                  min-h-[260px]
                "
              >
                {mensajeWhatsApp ? (
                  <p
                    className="
                      text-black
                      whitespace-pre-line
                      leading-relaxed
                      font-['Cormorant_Garamond']
                      text-lg
                    "
                  >
                    {mensajeWhatsApp}
                  </p>
                ) : (
                  <p
                    className="
                      text-black
                      font-['Cormorant_Garamond']
                      text-lg
                    "
                  >
                    Escribe el nombre del invitado
                    y el número de pases para
                    visualizar el mensaje.
                  </p>
                )}
              </div>

              {/* ==================================
                  COPIAR MENSAJE
              ================================== */}

              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={copiarMensaje}
                  disabled={!mensajeWhatsApp}
                  className="
                    w-full
                    bg-white
                    text-black
                    py-4
                    rounded-full
                    border-2
                    border-[#B68B3C]

                    flex
                    items-center
                    justify-center
                    gap-2

                    uppercase
                    tracking-[0.14em]
                    text-xs
                    font-medium

                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {copiadoMensaje ? (
                    <>
                      <Check size={18} />
                      Mensaje copiado
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copiar mensaje
                    </>
                  )}
                </button>

                {/* ==================================
                    WHATSAPP
                ================================== */}

                <button
                  type="button"
                  onClick={enviarWhatsApp}
                  disabled={!mensajeWhatsApp}
                  className="
                    w-full
                    bg-[#B68B3C]
                    text-white
                    py-4
                    rounded-full
                    border-2
                    border-[#B68B3C]

                    flex
                    items-center
                    justify-center
                    gap-2

                    uppercase
                    tracking-[0.14em]
                    text-xs
                    font-medium

                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  <MessageCircle size={19} />

                  Enviar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            INFORMACIÓN
        ========================================== */}

        <div className="text-center mt-10">
          <p
            className="
              text-black
              font-['Cormorant_Garamond']
              text-lg
              sm:text-xl
            "
          >
            Cada enlace contiene el nombre del
            invitado y el número de pases asignados.
          </p>
        </div>
      </div>
    </section>
  );
}