import React, { useState } from "react";

const WalletSetup = () => {
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleWalletUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setStatus({ message: "Please select a wallet key file.", type: "danger" });
      return;
    }

    if (file.type !== "application/json") {
      setStatus({ message: "Invalid file type. Please upload a .json file.", type: "danger" });
      return;
    }

    try {
      const walletKey = await readFileAsText(file);

      // Save to localStorage
      localStorage.setItem("walletKey", walletKey);

      setStatus({ message: "Wallet key successfully loaded into localStorage!", type: "success" });
    } catch (error) {
      console.error("Error loading wallet key:", error);
      setStatus({ message: "Failed to load wallet key. Please try again.", type: "danger" });
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <div className="container mt-4">
      <h2>Setup Wallet</h2>
      <p>Upload your Arweave wallet JSON key file to connect:</p>
      <input
        type="file"
        accept=".json"
        onChange={handleWalletUpload}
        className="form-control mb-3"
      />
      {status.message && (
        <div className={`alert alert-${status.type}`} role="alert">
          {status.message}
        </div>
      )}
    </div>
  );
};

export default WalletSetup;
