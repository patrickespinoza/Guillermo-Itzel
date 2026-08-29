import React from "react";
import { motion } from "framer-motion";

const Novios = () => {
  return (
    <section
      className="
        relative
        w-full
        bg-white
        py-20
        sm:py-24
        px-5
        sm:px-8
        flex
        items-center
        justify-center
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
          top-[-0px]
          left-[-0px]
          w-[150px]
          sm:w-[190px]
          md:w-[230px]
          lg:w-[270px]
          z-30
          rotate-90
        "
      />

      {/* FLORES ESQUINA SUPERIOR DERECHA */}
      <img
        src="/flores.png"
        alt=""
        className="
          pointer-events-none
          select-none
          absolute
          top-[-0px]
          right-[-0px]
          w-[150px]
          sm:w-[190px]
          md:w-[230px]
          lg:w-[270px]
          z-30
          rotate-180
        "
      />

      {/* FLORES ESQUINA INFERIOR IZQUIERDA */}
      <img
        src="/flores.png"
        alt=""
        className="
          pointer-events-none
          select-none
          absolute
          bottom-[-0px]
          left-[-0px]
          w-[150px]
          sm:w-[190px]
          md:w-[230px]
          lg:w-[270px]
          z-30
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
          bottom-[-0px]
          right-[-0px]
          w-[150px]
          sm:w-[190px]
          md:w-[230px]
          lg:w-[270px]
          z-30
          -rotate-90
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="
          relative
          z-10
          max-w-4xl
          w-full
          bg-[#B68B3C]
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-[1rem]
          rounded-bl-[1rem]
          px-7
          py-16
          sm:px-14
          md:px-16
          text-center
          overflow-hidden
        "
      >
        {/* CONTENIDO */}
        <div className="relative z-10">
          {/* TEXTO SUPERIOR */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="
              uppercase
              text-white
              tracking-[0.28em]
              text-xs
              sm:text-sm
              font-medium
            "
          >
            Nuestra Boda
          </motion.p>

          {/* ADORNO SUPERIOR */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="w-10 sm:w-14 h-px bg-white" />

            <span
              className="
                w-[6px]
                h-[6px]
                bg-white
                rotate-45
              "
            />

            <span className="w-10 sm:w-14 h-px bg-white" />
          </div>

          {/* GUILLERMO */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="
              mt-10
              text-[38px]
              sm:text-5xl
              md:text-6xl
              font-['Cormorant_Garamond']
              font-medium
              text-white
              leading-[1.05]
            "
          >
            Guillermo Calixtro Bustos
          </motion.h1>

          {/* & */}
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="
              my-5
              text-5xl
              sm:text-6xl
              font-['Cormorant_Garamond']
              italic
              text-white
            "
          >
            &
          </motion.p>

          {/* ITZEL */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="
              text-[38px]
              sm:text-5xl
              md:text-6xl
              font-['Cormorant_Garamond']
              font-medium
              text-white
              leading-[1.05]
            "
          >
            Itzel Telles Herrera
          </motion.h1>

          {/* SEPARADOR */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="
              h-px
              bg-white
              mx-auto
              mt-10
            "
          />

          {/* BENDICIÓN */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            viewport={{ once: true }}
            className="
              mt-9
              text-2xl
              sm:text-3xl
              text-white
              font-['Cormorant_Garamond']
              italic
              leading-relaxed
            "
          >
            Con la bendición de nuestros padres
          </motion.p>

          {/* PADRES */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-7
              md:gap-10
              mt-14
            "
          >
            {/* PADRES DEL NOVIO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              viewport={{ once: true }}
              className="
                bg-white
                rounded-tl-[2.5rem]
                rounded-br-[2.5rem]
                rounded-tr-lg
                rounded-bl-lg
                px-6
                py-10
              "
            >
              <h2
                className="
                  text-[#B68B3C]
                  uppercase
                  tracking-[0.22em]
                  text-xs
                  sm:text-sm
                  font-medium
                  mb-8
                "
              >
                Padres del Novio
              </h2>

              <p
                className="
                  text-[25px]
                  sm:text-[28px]
                  font-['Cormorant_Garamond']
                  font-medium
                  text-black
                  leading-tight
                "
              >
                Guillermo Calixtro Ortiz
              </p>

              <div className="w-10 h-px bg-[#B68B3C] mx-auto my-5" />

              <p
                className="
                  text-[25px]
                  sm:text-[28px]
                  font-['Cormorant_Garamond']
                  font-medium
                  text-black
                  leading-tight
                "
              >
                Maria Bustos Paniagua
              </p>
            </motion.div>

            {/* PADRES DE LA NOVIA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 1 }}
              viewport={{ once: true }}
              className="
                bg-white
                rounded-tl-[2.5rem]
                rounded-br-[2.5rem]
                rounded-tr-lg
                rounded-bl-lg
                px-6
                py-10
              "
            >
              <h2
                className="
                  text-[#B68B3C]
                  uppercase
                  tracking-[0.22em]
                  text-xs
                  sm:text-sm
                  font-medium
                  mb-8
                "
              >
                Padres de la Novia
              </h2>

              <p
                className="
                  text-[25px]
                  sm:text-[28px]
                  font-['Cormorant_Garamond']
                  font-medium
                  text-black
                  leading-tight
                "
              >
                Benito Telles Hernández
              </p>

              <div className="w-10 h-px bg-[#B68B3C] mx-auto my-5" />

              <p
                className="
                  text-[25px]
                  sm:text-[28px]
                  font-['Cormorant_Garamond']
                  font-medium
                  text-black
                  leading-tight
                "
              >
                Celia Herrera Sánchez
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Novios;