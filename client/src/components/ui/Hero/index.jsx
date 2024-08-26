import React from "react";
import { motion } from "framer-motion";

const Hero = ({ setSelectedTab, loggedIn, login }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
    <section>
      <motion.div
        className="custom-screen py-28 text-gray-600"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl"
            variants={itemVariants}
          >
            We make transactions confidential and easy.
          </motion.h1>
          <motion.p className="max-w-xl mx-auto" variants={itemVariants}>
            We ensure that every transaction is both secure and discreet,
            allowing you to manage your finances with complete privacy.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-x-3 font-medium text-sm"
            variants={itemVariants}
          >
            {loggedIn ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTab("deposit")}
                  className="py-2.5 px-4 text-center rounded-lg duration-150 text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 cursor-pointer"
                >
                  Deposit
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTab("withdraw")}
                  className="py-2.5 px-4 text-center rounded-lg duration-150 text-gray-700 border hover:bg-gray-50 cursor-pointer"
                >
                  Withdraw
                </motion.div>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={"fdsvkjb"}
                onClick={login}
                className="py-2.5 px-4 text-center rounded-lg duration-150 text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 cursor-pointer"
              >
                Connect Wallet
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
