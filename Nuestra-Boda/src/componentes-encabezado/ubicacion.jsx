import React from "react";

const Celebracion = ({
  dia,
  fecha,
  mesAnio,
  hora = "7:00 pm",
  titulo = "Celebración",
}) => {
  const ubicacion = "https://maps.app.goo.gl/9iFE86axhPunVJjx5";
  const lugar = "Salón Irekani";
  const direccion = "Fraccionamiento Irekani";

  return (
    <section
      className="
        w-full
        bg-[#B68B3C]
        py-20
        sm:py-24
        px-5
        sm:px-8
        flex
        flex-col
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* FECHA */}
      <div className="text-center mb-12">
        <p
          className="
            text-white
            tracking-[0.35em]
            uppercase
            text-xs
            sm:text-sm
            font-medium
          "
        >
          {dia}
        </p>

        <h1
          className="
            text-7xl
            sm:text-8xl
            md:text-9xl
            font-['Cormorant_Garamond']
            font-medium
            text-white
            leading-none
            mt-4
          "
        >
          {fecha}
        </h1>

        <p
          className="
            text-white
            text-xl
            sm:text-2xl
            tracking-[0.22em]
            uppercase
            mt-4
            font-['Cormorant_Garamond']
          "
        >
          {mesAnio}
        </p>
      </div>

      {/* TARJETA */}
      <div
        className="
          relative
          bg-white
          max-w-xl
          w-full
          px-7
          py-12
          sm:px-12
          sm:py-14

          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-[1rem]
          rounded-bl-[1rem]

          border-2
          border-white
        "
      >
        {/* ADORNO SUPERIOR */}
        <div className="flex items-center justify-center gap-3 mb-8">
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

        {/* TÍTULO */}
        <div className="text-center">
          <p
            className="
              text-[#B68B3C]
              uppercase
              tracking-[0.28em]
              text-xs
              sm:text-sm
              mb-3
            "
          >
            Nuestro Evento
          </p>

          <h2
            className="
              text-4xl
              sm:text-5xl
              font-['Cormorant_Garamond']
              font-medium
              text-black
              leading-tight
            "
          >
            {titulo}
          </h2>
        </div>

        {/* INFORMACIÓN */}
        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            text-center
          "
        >
          {/* HORA */}
          <div>
            <p
              className="
                text-[#B68B3C]
                uppercase
                tracking-[0.25em]
                text-xs
                sm:text-sm
              "
            >
              Hora
            </p>

            <p
              className="
                mt-2
                text-3xl
                sm:text-4xl
                font-['Cormorant_Garamond']
                font-medium
                text-black
              "
            >
              {hora}
            </p>
          </div>

          {/* SEPARADOR */}
          <div className="w-16 h-px bg-[#B68B3C] my-8" />

          {/* LUGAR */}
          <div>
            <p
              className="
                text-[#B68B3C]
                uppercase
                tracking-[0.25em]
                text-xs
                sm:text-sm
              "
            >
              Lugar
            </p>

            <p
              className="
                mt-3
                text-3xl
                sm:text-4xl
                font-['Cormorant_Garamond']
                font-medium
                text-black
              "
            >
              {lugar}
            </p>

            <p
              className="
                mt-3
                text-base
                sm:text-lg
                font-['Cormorant_Garamond']
                text-black
              "
            >
              {direccion}
            </p>
          </div>

          {/* BOTÓN */}
          <a
            href={ubicacion}
            target="_blank"
            rel="noreferrer"
            className="
              mt-9
              bg-[#B68B3C]
              text-white
              px-9
              py-3
              rounded-full
              uppercase
              tracking-[0.18em]
              text-xs
              sm:text-sm
              font-medium
              border-2
              border-[#B68B3C]

              hover:bg-white
              hover:text-black

              transition-colors
              duration-300
            "
          >
            Ver ubicación
          </a>
        </div>

        {/* ADORNO INFERIOR */}
        <div className="flex items-center justify-center gap-3 mt-10">
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
      </div>
    </section>
  );
};

export default Celebracion;