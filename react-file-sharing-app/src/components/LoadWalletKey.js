// src/components/LoadWalletKey.js
import React, { useState } from "react";

const LoadWalletKey = ({ setWalletKeyStatus }) => {
  const [isWalletKeyModalOpen, setIsWalletKeyModalOpen] = useState(false);

  // Handle loading the wallet key file and saving it to localStorage
  const handleLoadWalletKey = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const walletKey = JSON.parse(reader.result);
          localStorage.setItem("walletKey", JSON.stringify(walletKey)); // Store the key in localStorage
          setWalletKeyStatus("Wallet key loaded successfully!");
        } catch (error) {
          setWalletKeyStatus("Invalid wallet key file.");
        }
      };
      reader.readAsText(file);
    }
    setIsWalletKeyModalOpen(false); // Close the modal after the key is uploaded
  };

  return (
    <div>
      <button
        className="wallet-button"
        onClick={() => setIsWalletKeyModalOpen(true)}
      >
        <span role="img" aria-label="wallet">💼</span> Load Wallet Key
      </button>

      {isWalletKeyModalOpen && (
        <div className="modal">
          <input type="file" onChange={handleLoadWalletKey} />
        </div>
      )}
    </div>
  );
};

export default LoadWalletKey;
