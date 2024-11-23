import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { getWalletAddress } from "../services/authService";

const Account = () => {
  const { walletAddress, setWalletAddress } = useAppContext();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        let address = "";
        if (window.arweaveWallet) {
          // Check if ArConnect is connected
          const connected = await window.arweaveWallet.getPermissions();
          if (connected.includes("ACCESS_ADDRESS")) {
            address = await window.arweaveWallet.getActiveAddress();
          }
        }
        if (!address) {
          // Fallback to wallet address from authService
          address = await getWalletAddress();
        }
        setWalletAddress(address);
      } catch (error) {
        console.error("Error fetching wallet address:", error);
        setWalletAddress("Error loading address");
      }
    };

    fetchWallet();
  }, [setWalletAddress]);

  return (
    <div className="container mt-4">
      <h2>Your Account</h2>
      <p>Wallet Address: {walletAddress || "Fetching..."}</p>
    </div>
  );
};

export default Account;
