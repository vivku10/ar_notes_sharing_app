// src/components/LoadWalletKey.js
import React, { useState, useRef } from "react";

const LoadWalletKey = () => {
  const [walletKeyStatus, setWalletKeyStatus] = useState(""); // State to manage the status message
  const fileInputRef = useRef(null);

  // Handle wallet key file load
  const handleLoadWalletKey = (event) => {
    event.preventDefault();
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const walletKey = JSON.parse(reader.result);
          localStorage.setItem("walletKey", JSON.stringify(walletKey)); // Store wallet key in localStorage
          setWalletKeyStatus("Wallet key loaded successfully!"); // Success message
        } catch (error) {
          setWalletKeyStatus("Invalid wallet key file. Please try again."); // Error message
        }
      };
      reader.readAsText(file); // Read file as text
    }
  };

  // Trigger file input dialog when button is clicked
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input dialog
  };

  return (
    <div>
      {/* The button to load the wallet key */}
      <button
        className="wallet-button"
        onClick={handleButtonClick} // Open file dialog when clicked
      >
        <span role="img" aria-label="wallet">💼</span> Load Wallet Key
      </button>

      {/* Hidden file input element */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input field
        onChange={handleLoadWalletKey}
      />

      {/* Status message display */}
      {walletKeyStatus && (
        <div className={`status-message ${walletKeyStatus.includes("successfully") ? "success" : "error"}`}>
          {walletKeyStatus}
        </div>
      )}
    </div>
  );
};

export default LoadWalletKey;
