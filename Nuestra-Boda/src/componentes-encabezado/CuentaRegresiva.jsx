import React, { useEffect, useState } from "react";

const CuentaRegresiva = ({
  fechaEvento = "2026-09-26T00:00:00",
}) => {
  const calcularTiempo = () => {
    const ahora = new Date().getTime();
    const evento = new Date(fechaEvento).getTime();
    const diferencia = evento - ahora;

    if (diferencia <= 0) {
      return {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
        termino: true,
      };
    }

    return {
      dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
      horas: Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
      ),
      minutos: Math.floor(
        (diferencia / (1000 * 60)) % 60
      ),
      segundos: Math.floor(
        (diferencia / 1000) % 60
      ),
      termino: false,
    };
  };

  const [tiempo, setTiempo] = useState(calcularTiempo());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);

    return () => clearInterval(intervalo);
  }, [fechaEvento]);

  const bloques = [
    {
      valor: tiempo.dias,
      texto: "Días",
    },
    {
      valor: tiempo.horas,
      texto: "Horas",
    },
    {
      valor: tiempo.minutos,
      texto: "Minutos",
    },
    {
      valor: tiempo.segundos,
      texto: "Segundos",
    },
  ];

  return (
    <section
      className="
        relative
        w-full
        bg-white
        px-5
        py-20
        sm:py-24
        overflow-hidden
      "
    >
      {/* FLORES ESQUINA SUPERIOR IZQUIERDA */}
      <img
        src="/flores.png"
        alt=""
        className="
          pointer-events-none
          select-none
          absolute
          top-[-35px]
          left-[-50px]
          w-[155px]
          sm:w-[195px]
          md:w-[235px]
          lg:w-[275px]
          z-0
          rotate-90
        "
      />

      {/* FLORES ESQUINA INFERIOR DERECHA */}
      <img
        src="/flores.png"
        alt=""
        className="
          pointer-events-none
          select-none
          absolute
          bottom-[-35px]
          right-[-50px]
          w-[155px]
          sm:w-[195px]
          md:w-[235px]
          lg:w-[275px]
          z-0
          -rotate-90
        "
      />

      <div
        className="
          relative
          z-10
          max-w-5xl
          mx-auto
          text-center
        "
      >
        {/* TEXTO SUPERIOR */}
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
          Falta muy poco
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
            text-black
          "
        >
          Cuenta regresiva
        </h2>

        {/* ADORNO */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-3
            mt-6
          "
        >
          <span className="w-12 h-px bg-[#B68B3C]" />

          <span
            className="
              w-[6px]
              h-[6px]
              bg-[#B68B3C]
              rotate-45
            "
          />

          <span className="w-12 h-px bg-[#B68B3C]" />
        </div>

        {/* CONTADOR */}
        {!tiempo.termino ? (
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
              sm:gap-6
              mt-12
            "
          >
            {bloques.map((bloque) => (
              <div
                key={bloque.texto}
                className="
                  bg-[#B68B3C]
                  min-h-[145px]
                  sm:min-h-[165px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  px-3
                  py-7

                  rounded-tl-[2rem]
                  rounded-br-[2rem]
                  rounded-tr-lg
                  rounded-bl-lg
                "
              >
                <span
                  className="
                    text-5xl
                    sm:text-6xl
                    font-['Cormorant_Garamond']
                    font-medium
                    text-white
                    leading-none
                  "
                >
                  {String(bloque.valor).padStart(2, "0")}
                </span>

                <span
                  className="
                    mt-4
                    text-white
                    uppercase
                    tracking-[0.2em]
                    text-[10px]
                    sm:text-xs
                    font-medium
                  "
                >
                  {bloque.texto}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
              mt-12
              bg-[#B68B3C]
              max-w-xl
              mx-auto
              px-6
              py-12
              rounded-tl-[3rem]
              rounded-br-[3rem]
              rounded-tr-xl
              rounded-bl-xl
            "
          >
            <p
              className="
                text-4xl
                sm:text-5xl
                text-white
                font-['Cormorant_Garamond']
                italic
              "
            >
              ¡Llegó nuestro gran día!
            </p>
          </div>
        )}

        {/* FRASE INFERIOR */}
        <p
          className="
            mt-10
            text-2xl
            sm:text-3xl
            font-['Cormorant_Garamond']
            italic
            text-black
          "
        >
          26 de septiembre de 2026
        </p>
      </div>
    </section>
  );
};

export default CuentaRegresiva;