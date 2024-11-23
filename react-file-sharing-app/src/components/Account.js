import React, { useState, useEffect } from "react";
import { getWalletAddress, logout } from "../services/authService";

function Account() {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const address = await getWalletAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error("Error fetching wallet address:", error);
        setWalletAddress("Error loading address");
      }
    };

    fetchWalletAddress();
  }, []); // Empty array to call this only once when component mounts

  return (
    <div>
      <h2>Account</h2>
      <p>Wallet Address: {walletAddress}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Account;
