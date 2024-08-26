import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="py-20 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          variants={itemVariants}
        >
          Withdraw funds securely.
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mb-10"
          variants={itemVariants}
        >
          We ensure that every withdrawal is both secure and discreet,
          <br />
          allowing you to manage your finances with complete privacy.
        </motion.p>
        <motion.div variants={itemVariants}>
          <InputFieldsWithIcons
            amount={amount}
            setAmount={setAmount}
            address={address}
            setAddress={setAddress}
          />
          <Button
            className="w-full mt-4 px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
            onClick={() => {
              /* Handle withdrawal */
            }}
          >
            Withdraw
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Withdraw;

import { DollarSign, Wallet } from "lucide-react";

const InputFieldsWithIcons = ({ amount, setAmount, address, setAddress }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Amount to withdraw"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent"
        />
        <DollarSign
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Withdrawal address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent"
        />
        <Wallet
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>
    </div>
  );
};
