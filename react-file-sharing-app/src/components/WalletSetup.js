import React, { useState } from "react";

function WalletSetup() {
  const [status, setStatus] = useState("");

  const handleWalletUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setStatus("Please select a wallet key file.");
      return;
    }

    try {
      // Read the wallet file as text
      const walletKey = await readFileAsText(file);

      // Parse and save to localStorage
      localStorage.setItem("walletKey", walletKey);

      setStatus("Wallet key successfully loaded into localStorage!");
    } catch (error) {
      console.error("Error loading wallet key:", error);
      setStatus("Failed to load wallet key. Please try again.");
    }
  };

  // Utility function to read the wallet file as text
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <h2>Setup Wallet</h2>
      <p>Upload your Arweave wallet JSON key file to connect:</p>
      <input type="file" accept=".json" onChange={handleWalletUpload} />
      {status && <p>{status}</p>}
    </div>
  );
}

export default WalletSetup;
