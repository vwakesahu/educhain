/* eslint-disable no-console */

"use client";

import { useEffect, useState } from "react";
import { WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "@/configs/ethersRPC";
import axios from "axios";
import { chainConfig } from "@/configs/chain";

const clientId = process.env.WEB3AUTHCLIENTID; // get from https://dashboard.web3auth.io

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter();
web3auth.configureAdapter(openloginAdapter);

function App() {
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
        await web3auth.init();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
          // const bal = await getBalanceNo(web3auth.provider);
          // console.log(Number(bal));
          // const acc = await getAccount(web3auth.provider);
          // console.log(acc);
          // if (Number(bal) < 0.01) {
          //   console.log("Sending 0.001 ETH to the account");
          //   await axios.post(
          //     "https://educhain-community-faucet.vercel.app/api/send",
          //     {
          //       recipientAddress: acc,
          //       tokenAddress: "0x",
          //     }
          //   );
          // }
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

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

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a
          target="_blank"
          href="https://web3auth.io/docs/sdk/pnp/web/no-modal"
          rel="noreferrer"
        >
          Web3Auth{" "}
        </a>
        & NextJS Quick Start
      </h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-no-modal-sdk/quick-starts/nextjs-no-modal-quick-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWeb3Auth%2Fweb3auth-pnp-examples%2Ftree%2Fmain%2Fweb-modal-sdk%2Fquick-starts%2Fnextjs-modal-quick-start&project-name=w3a-nextjs-modal&repository-name=w3a-nextjs-modal">
          <img src="https://vercel.com/button" alt="Deploy with Vercel" />
        </a>
      </footer>
    </div>
    // <div>
    //   {/* <section>
    //     <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
    //       <div class="flex flex-col w-full mb-12 text-center">
    //         <div class="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto mb-5 text-blue-600 rounded-full bg-gray-50">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             class="w-10 h-10 icon icon-tabler icon-tabler-aperture"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //             stroke-width="1.5"
    //             stroke="currentColor"
    //             fill="none"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //           >
    //             <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    //             <circle cx="12" cy="12" r="9"></circle>
    //             <line x1="3.6" y1="15" x2="14.15" y2="15"></line>
    //             <line
    //               x1="3.6"
    //               y1="15"
    //               x2="14.15"
    //               y2="15"
    //               transform="rotate(72 12 12)"
    //             ></line>
    //             <line
    //               x1="3.6"
    //               y1="15"
    //               x2="14.15"
    //               y2="15"
    //               transform="rotate(144 12 12)"
    //             ></line>
    //             <line
    //               x1="3.6"
    //               y1="15"
    //               x2="14.15"
    //               y2="15"
    //               transform="rotate(216 12 12)"
    //             ></line>
    //             <line
    //               x1="3.6"
    //               y1="15"
    //               x2="14.15"
    //               y2="15"
    //               transform="rotate(288 12 12)"
    //             ></line>
    //           </svg>
    //         </div>
    //         <h1 class="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
    //           Long headline to turn <br class="hidden lg:block" />
    //           your visitors into users
    //         </h1>

    //         <p class="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
    //           Free and Premium themes, UI Kit's, templates and landing pages
    //           built with Tailwind CSS, HTML &amp; Next.js.
    //         </p>

    //         <a
    //           class="mx-auto mt-8 text-sm font-semibold text-blue-600 hover:text-neutral-600"
    //           title="read more"
    //         >
    //           Read more about the offer »{" "}
    //         </a>
    //       </div>
    //     </div>
    //   </section> */}
    // </div>
  );
}

export default App;
