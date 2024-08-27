import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CoinsIcon, DollarSign, Lock } from "lucide-react";
import { Contract, ethers } from "ethers";
import {
  tokenLockAndMintABI,
  tokenLockAndMintContractAddress,
  UsdcABI,
  USDCContractAddress,
} from "@/components/contracts/contractInfo";
import RPC from "@/configs/ethersRPC";
import { toast } from "sonner";

const Deposit = ({ provider }) => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [dummyLoading, setDummyLoading] = useState(false);
  const [error, setError] = useState(null);
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [errDeposit, setErrDeposit] = useState(null);

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

  const addDummyTokens = async () => {
    setDummyLoading(true);
    setError(null);
    try {
      if (!provider) {
        throw new Error("Provider not initialized");
      }
      console.log(provider);
      const ethersP = new ethers.providers.Web3Provider(provider);
      const signer = await ethersP.getSigner();

      const usdcContract = new Contract(USDCContractAddress, UsdcABI, signer);
      // const address = await signer.getAddress();
      // console.log(address);

      // const tx = await contract.balanceOf(address);
      // console.log(tx.toString());

      const address = await signer.getAddress();
      console.log(address);

      const tx = await usdcContract.transferFromOwner(
        tokenLockAndMintContractAddress,
        { gasLimit: 2000000 }
      );
      tx.wait();
      toast.success("USDC added successfully");

      console.log(tx);

      console.log("Dummy tokens added successfully");
      // You might want to update some state or UI here to reflect the new balance
    } catch (err) {
      console.error("Error adding dummy tokens:", err);
      setError(err.message);
    } finally {
      setDummyLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (activeTab === "deposit") {
      handleDeposit();
    }
  };

  const handleDeposit = async () => {
    setDepositLoading(true);
    setErrDeposit(null);
    try {
      if (!provider) {
        throw new Error("Provider not initialized");
      }
      if (!depositAmount || isNaN(depositAmount)) {
        throw new Error("Please enter a valid deposit amount");
      }

      const ethersP = new ethers.providers.Web3Provider(provider);
      const signer = await ethersP.getSigner();

      const tokenLockContract = new Contract(
        tokenLockAndMintContractAddress,
        tokenLockAndMintABI,
        signer
      );
      console.log(depositAmount);
      // First, approve the tokenLockAndMint contract to spend USDC
      const depositTx = await tokenLockContract.lockTokens(
        ethers.utils.parseUnits(depositAmount, 18), // Assuming USDC has 6 decimal places
        { gasLimit: 2000000 }
      );
      await depositTx.wait();
      console.log(depositTx);
      toast.success(`Successfully deposited ${depositAmount} USDC`);
      setDepositAmount(""); // Clear the input after successful deposit
    } catch (err) {
      console.error("Error during deposit:", err);
      setErrDeposit(err.message);
      toast.error("Deposit failed. Please try again.");
    } finally {
      setDepositLoading(false);
    }
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
              <Button
                onClick={addDummyTokens}
                disabled={dummyLoading}
                className="flex items-center space-x-2 text-white"
              >
                <CoinsIcon className={dummyLoading ? "animate-spin" : ""} />
                <span>{dummyLoading ? "Adding..." : "Mint USDC"}</span>
              </Button>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 mb-4"
                >
                  {error}
                </motion.div>
              )}
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
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
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
                  onClick={handleSubmit}
                  disabled={depositLoading}
                >
                  {depositLoading ? (
                    <span className="flex items-center justify-center">
                      <CoinsIcon className="animate-spin mr-2" size={16} />
                      Processing...
                    </span>
                  ) : activeTab === "deposit" ? (
                    "Deposit Now"
                  ) : (
                    "On Ramp Now"
                  )}
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
