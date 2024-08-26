import { CHAIN_NAMESPACES } from "@web3auth/base";

export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xa045c",
  rpcTarget: "https://open-campus-codex-sepolia.drpc.org",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Open Campus",
  blockExplorerUrl: "https://opencampus-codex.blockscout.com/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};
