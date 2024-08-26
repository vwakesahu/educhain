import React from "react";
import { motion } from "framer-motion";

const freshbooks = "/logos/freshbooks.svg";
const sendgrid = "/logos/sendgrid.svg";
const layers = "/logos/layers.svg";
const adobe = "/logos/adobe.svg";

const logos = [
  { src: freshbooks, alt: "freshbooks" },
  { src: sendgrid, alt: "sendgrid" },
  { src: layers, alt: "layers" },
  { src: adobe, alt: "adobe" },
];

const LogoGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div className="custom-screen">
        <motion.h2
          className="font-semibold text-sm text-gray-600 text-center"
          variants={itemVariants}
        >
          BUILT ON TOP OF THE BEST SOLUTIONS
        </motion.h2>
        <motion.div className="mt-6" variants={itemVariants}>
          <ul className="flex gap-x-10 gap-y-6 flex-wrap items-center justify-center md:gap-x-16">
            {logos.map((item, idx) => (
              <motion.li
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={item.src}
                  alt={item.alt}
                  initial={{ filter: "grayscale(100%)" }}
                  whileHover={{ filter: "grayscale(0%)" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LogoGrid;
