import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Lock } from "lucide-react";

const Deposit = () => {
  const [activeTab, setActiveTab] = useState("deposit");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <main className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-md mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={childVariants}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Secure & Confidential Transactions
          </motion.h2>
          <motion.p variants={childVariants} className="text-gray-600 mb-8">
            Manage your finances with complete privacy and ease.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="inline-flex bg-white rounded-full p-1 border mb-8"
          >
            <AnimatePresence mode="wait">
              {["deposit", "onramp"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    activeTab === tab
                      ? "bg-gray-800 text-white"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={childVariants}
            className="bg-white rounded-lg border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {activeTab === "deposit" ? "Deposit Funds" : "On Ramp"}
              </h3>
              <Lock className="text-gray-400" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={`Amount to ${activeTab}`}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
                  />
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {activeTab === "onramp" && (
                  <Input
                    type="text"
                    placeholder="Wallet address"
                    className="w-full py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
                  />
                )}
                <Button
                  className="w-full rounded-md py-2 font-medium text-sm text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-900 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeTab === "deposit" ? "Deposit Now" : "On Ramp Now"}
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Deposit;
