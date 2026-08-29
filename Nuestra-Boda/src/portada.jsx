import React from "react";

export default function Portada() {
  return (
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden bg-black">
      
      {/* FUENTE ELEGANTE */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400;1,500&display=swap');
        `}
      </style>

      {/* IMAGEN */}
      <img
        src="/portada.png"
        alt="Guillermo e Itzel"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
        "
      />

      {/* DEGRADADO SUAVE INFERIOR */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-black/60
        "
      />

      {/* INFORMACIÓN */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          flex
          flex-col
          items-center
          text-center
          px-6
          pb-12
          sm:pb-14
          md:pb-16
          text-white
        "
      >
        {/* NOMBRES */}
        <h1
          className="
            font-['Cormorant_Garamond']
            italic
            font-normal
            text-[48px]
            sm:text-[58px]
            md:text-[70px]
            lg:text-[82px]
            leading-[0.9]
            tracking-[-0.02em]
            drop-shadow-md
          "
        >
          Guillermo
          <span className="mx-3 font-light">&</span>
          Itzel
        </h1>

        {/* LÍNEA DECORATIVA */}
        <div className="flex items-center w-[220px] sm:w-[260px] mt-6 mb-5">
          <div className="h-px flex-1 bg-white" />

          <span
            className="
              mx-4
              font-['Cormorant_Garamond']
              italic
              text-3xl
            "
          >
            G & I
          </span>

          <div className="h-px flex-1 bg-white" />
        </div>

        {/* FECHA */}
        <p
          className="
            font-['Cormorant_Garamond']
            text-[30px]
            sm:text-base
            md:text-3xl
            uppercase
            tracking-[0.38em]
            pl-[0.38em]
            font-normal
          "
        >
          26 · 09 · 2026
        </p>
      </div>
    </section>
  );
}