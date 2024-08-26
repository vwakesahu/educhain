import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, DollarSign, Clock, Droplet } from "lucide-react";
import { FaEthereum } from "react-icons/fa";

const formFields = [
  { id: "address1", label: "Address 1", type: "text", icon: FaEthereum },
  { id: "amount1", label: "Amount 1", type: "text", icon: DollarSign },
  { id: "address2", label: "Address 2", type: "text", icon: FaEthereum },
  { id: "amount2", label: "Amount 2", type: "text", icon: DollarSign },
  { id: "address3", label: "Address 3", type: "text", icon: FaEthereum },
  { id: "amount3", label: "Amount 3", type: "text", icon: DollarSign },
  { id: "locktime", label: "Lock Time", type: "date", icon: Clock },
  { id: "dilute", label: "Dilute", type: "date", icon: Clock },
];

const Pay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-8"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-gray-800"
      >
        We make transactions confidential and easy.
      </motion.h1>
      <motion.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center text-gray-600 mb-12"
      >
        We ensure that every transaction is both secure and discreet, allowing
        you to manage your finances with complete privacy.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map(({ id, label, type, icon: Icon }, index) => (
          <motion.div
            key={id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="space-y-2"
          >
            <Label htmlFor={id} className="text-sm font-medium text-gray-700">
              {label}
            </Label>
            <div className="relative">
              <Icon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type={type}
                id={id}
                placeholder={label}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8 flex justify-end space-x-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          variant="outline"
          className="px-6 py-2 rounded-md border-gray-800 text-white hover:bg-gray-700 transition-colors bg-gray-800 text-white hover:text-white"
        >
          Withdraw
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Pay;
