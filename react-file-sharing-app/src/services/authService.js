import Arweave from "arweave";

// Initialize Arweave instance
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

// Function to get wallet address
export const getWalletAddress = async () => {
  const walletKey = JSON.parse(localStorage.getItem("walletKey"));
  if (!walletKey) {
    throw new Error("Wallet not loaded.");
  }

  // Use the Arweave instance to get the address from the wallet key
  const address = await arweave.wallets.jwkToAddress(walletKey);
  return address;
};

// Function to log out
export const logout = () => {
  localStorage.removeItem("walletKey");
  window.location.reload(); // Optionally reload to reset state
};
