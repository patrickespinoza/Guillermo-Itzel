import React from "react";
import { motion } from "framer-motion";

const Vestimenta = () => {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
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
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* FLORES ARRIBA A LA DERECHA */}
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
          z-0
          rotate-180
        "
      />

      {/* FLORES ABAJO A LA IZQUIERDA */}
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

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          relative
          z-10
          max-w-3xl
          w-full
          bg-[#B68B3C]
          px-7
          py-16
          sm:px-14
          sm:py-20
          text-center

          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-[1rem]
          rounded-bl-[1rem]
        "
      >
        {/* DETALLE SUPERIOR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
            flex
            items-center
            justify-center
            gap-4
          "
        >
          <span className="w-12 sm:w-16 h-px bg-white" />

          <span
            className="
              w-[7px]
              h-[7px]
              bg-white
              rotate-45
            "
          />

          <span className="w-12 sm:w-16 h-px bg-white" />
        </motion.div>

        {/* TEXTO SUPERIOR */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          whileInView={{
            opacity: 1,
            letterSpacing: "0.25em",
          }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="
            mt-8
            uppercase
            text-white
            text-[11px]
            sm:text-sm
            tracking-[0.25em]
            font-medium
          "
        >
          Un detalle importante
        </motion.p>

        {/* TÍTULO */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
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
          Solo Adultos
        </motion.h2>

        {/* SEPARADOR */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="
            h-px
            bg-white
            mx-auto
            mt-7
          "
        />

        {/* MENSAJE */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="
            mt-8
            max-w-xl
            mx-auto
            text-[22px]
            sm:text-2xl
            md:text-[28px]
            font-['Cormorant_Garamond']
            text-white
            leading-relaxed
          "
        >
          Amamos a sus pequeños, pero esta ocasión será exclusiva
          para adultos. Gracias por ayudarnos a que todos disfruten
          al máximo.
        </motion.p>

        {/* DETALLE INFERIOR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          viewport={{ once: true }}
          className="
            flex
            items-center
            justify-center
            gap-4
            mt-10
          "
        >
          <span className="w-12 sm:w-16 h-px bg-white" />

          <span
            className="
              font-['Cormorant_Garamond']
              italic
              text-white
              text-lg
            "
          >
            G & I
          </span>

          <span className="w-12 sm:w-16 h-px bg-white" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Vestimenta;