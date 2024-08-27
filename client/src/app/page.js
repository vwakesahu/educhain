"use client";
import Navbar from "@/components/ui/Navbar";
import Home from "@/modules/home";
import { useEffect, useState } from "react";
import { chainConfig } from "@/configs/chain";
import { WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "@/configs/ethersRPC";
import Deposit from "@/modules/deposit";
import { Button } from "@/components/ui/button";
import Withdraw from "@/modules/withdraw";
import Pay from "@/modules/pay";

const clientId = process.env.WEB3AUTHCLIENTID; // get from https://dashboard.web3auth.io

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter();
// web3auth.configureAdapter(openloginAdapter);

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("home");
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const getAccount = async (provider) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const address = await RPC.getAccounts(provider);
    uiConsole(address);
    return address[0];
  };

  const getBalanceNo = async (provider) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    uiConsole(balance);
    return balance;
  };

  useEffect(() => {
    const init = async () => {
      try {
        if (!web3auth.isInitialized) {
          web3auth.configureAdapter(openloginAdapter);
          await web3auth.init();
          setProvider(web3auth.provider);

          if (web3auth.connected) {
            setLoggedIn(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  // useEffect(() => {
  //   setLoggedIn(web3auth.connected);
  // }, [web3auth.connected]);

  const login = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = await web3auth.getUserInfo();
    // IMP END - Get User Information
    uiConsole(user);
  };

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  // IMP START - Blockchain Calls
  // Check the RPC file for the implementation
  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const address = await RPC.getAccounts(provider);
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    uiConsole(balance);
    return balance;
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    uiConsole(signedMessage);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    uiConsole("Sending Transaction...");
    const transactionReceipt = await RPC.sendTransaction(provider);
    uiConsole(transactionReceipt);
  };
  // IMP END - Blockchain Calls

  function uiConsole(...args) {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  console.log(loggedIn);

  if (!loggedIn) {
    return (
      <div>
        <div className="px-6 border-b">
          <Navbar
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            logout={logout}
            loggedIn={loggedIn}
          />
        </div>
        <Home
          setSelectedTab={setSelectedTab}
          loggedIn={loggedIn}
          login={login}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="px-6 border-b">
        <Navbar
          provider={provider}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          logout={logout}
          loggedIn={loggedIn}
        />
      </div>
      {selectedTab === "home" && (
        <Home
          setSelectedTab={setSelectedTab}
          loggedIn={loggedIn}
          login={login}
        />
      )}
      {selectedTab === "deposit" && <Deposit provider={provider} />}
      {selectedTab === "withdraw" && (
        <Withdraw
          setSelectedTab={setSelectedTab}
          loggedIn={loggedIn}
          login={login}
        />
      )}
      {selectedTab === "pay" && (
        <Pay
          setSelectedTab={setSelectedTab}
          loggedIn={loggedIn}
          login={login}
        />
      )}
    </div>
  );
}
