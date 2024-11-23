import React, { useState, useEffect } from "react";
import { getWalletAddress, logout } from "../services/authService";

function Account() {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const fetchWalletAddress = async () => {
      const address = await getWalletAddress();
      setWalletAddress(address);
    };
    fetchWalletAddress();
  }, []);

  return (
    <div>
      <h2>Account</h2>
      <p>Wallet Address: {walletAddress}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Account;
