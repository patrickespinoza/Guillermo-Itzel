import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Galeria = () => {
  const imagenes = [
    {
      src: "/Carrusel01.jpeg",
      position: "center 30%",
    },
    {
      src: "/Carrusel02.jpeg",
      position: "center 80%",
    },
    {
      src: "/Carrusel03.jpeg",
      position: "center 50%",
    },
    {
      src: "/Carrusel04.jpeg",
      position: "center center",
    },
    {
      src: "/Carrusel06.png",
      position: "center 25%",
    },
  ];

  const [actual, setActual] = useState(0);

  useEffect(() => {
    imagenes.forEach((imagen) => {
      const img = new Image();
      img.src = imagen.src;
    });
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) =>
        prev === imagenes.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  const anterior = () => {
    setActual((prev) =>
      prev === 0 ? imagenes.length - 1 : prev - 1
    );
  };

  const siguiente = () => {
    setActual((prev) =>
      prev === imagenes.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      className="
        relative
        w-full
        bg-white
        py-20
        sm:py-24
        px-5
        overflow-hidden
      "
    >
      {/* =========================================
          FLORES SUPERIOR IZQUIERDA
      ========================================= */}
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

          rotate-90
          z-0
        "
      />

      {/* =========================================
          FLORES SUPERIOR DERECHA
      ========================================= */}
      <img
        src="/flores.png"
        alt=""
        className="
          pointer-events-none
          select-none
          absolute
          top-[-35px]
          right-[-50px]

          w-[155px]
          sm:w-[195px]
          md:w-[235px]
          lg:w-[275px]

          rotate-180
          z-0
        "
      />

      {/* =========================================
          FLORES INFERIOR IZQUIERDA
      ========================================= */}
      <img
        src="/flores.png"
        alt=""
        className="
          pointer-events-none
          select-none
          absolute
          bottom-[-35px]
          left-[-50px]

          w-[155px]
          sm:w-[195px]
          md:w-[235px]
          lg:w-[275px]

          z-0
        "
      />

      {/* =========================================
          FLORES INFERIOR DERECHA
      ========================================= */}
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

          -rotate-90
          z-0
        "
      />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* TEXTO SUPERIOR */}
        <p
          className="
            text-[#B68B3C]
            uppercase
            tracking-[0.3em]
            text-xs
            sm:text-sm
          "
        >
          Nuestros momentos
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
            text-black
          "
        >
          Nuestra Historia
        </h2>

        {/* ADORNO */}
        <div className="flex items-center justify-center gap-3 mt-6 mb-12">
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

        {/* CARRUSEL */}
        <div
          className="
            relative
            w-full
            max-w-3xl
            mx-auto
            bg-[#B68B3C]
            p-2
            sm:p-3

            rounded-tl-[3rem]
            rounded-br-[3rem]
            rounded-tr-[1rem]
            rounded-bl-[1rem]
          "
        >
          {/* CONTENEDOR DE FOTO */}
          <div
            className="
              relative
              w-full
              h-[500px]
              sm:h-[650px]
              md:h-[720px]
              overflow-hidden

              rounded-tl-[2.5rem]
              rounded-br-[2.5rem]
              rounded-tr-[0.7rem]
              rounded-bl-[0.7rem]

              bg-white
            "
          >
            {imagenes.map((imagen, index) => (
              <img
                key={imagen.src}
                src={imagen.src}
                alt={`Guillermo e Itzel ${index + 1}`}
                style={{
                  objectPosition: imagen.position,
                }}
                className={`
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition-opacity
                  duration-700
                  ${
                    index === actual
                      ? "opacity-100"
                      : "opacity-0"
                  }
                `}
              />
            ))}

            {/* BOTÓN ANTERIOR */}
            <button
              onClick={anterior}
              aria-label="Foto anterior"
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                z-20

                w-11
                h-11
                sm:w-12
                sm:h-12

                bg-white
                text-black
                rounded-full

                flex
                items-center
                justify-center

                border-2
                border-[#B68B3C]

                transition-transform
                duration-300

                hover:scale-110
              "
            >
              <ChevronLeft size={24} />
            </button>

            {/* BOTÓN SIGUIENTE */}
            <button
              onClick={siguiente}
              aria-label="Foto siguiente"
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                z-20

                w-11
                h-11
                sm:w-12
                sm:h-12

                bg-white
                text-black
                rounded-full

                flex
                items-center
                justify-center

                border-2
                border-[#B68B3C]

                transition-transform
                duration-300

                hover:scale-110
              "
            >
              <ChevronRight size={24} />
            </button>

            {/* CONTADOR */}
            <div
              className="
                absolute
                bottom-5
                left-1/2
                -translate-x-1/2
                z-20

                bg-white
                text-black

                px-5
                py-2
                rounded-full

                border
                border-[#B68B3C]

                font-['Cormorant_Garamond']
                text-lg
              "
            >
              {actual + 1} / {imagenes.length}
            </div>
          </div>
        </div>

        {/* INDICADORES */}
        <div className="flex items-center justify-center gap-3 mt-7">
          {imagenes.map((_, index) => (
            <button
              key={index}
              onClick={() => setActual(index)}
              aria-label={`Ir a foto ${index + 1}`}
              className={`
                transition-all
                duration-300
                ${
                  index === actual
                    ? "w-8 h-2 bg-[#B68B3C]"
                    : "w-2 h-2 bg-black"
                }
                rounded-full
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Galeria;