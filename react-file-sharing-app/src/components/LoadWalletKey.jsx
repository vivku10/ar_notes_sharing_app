import React, { useState, useRef } from "react";

const LoadWalletKey = () => {
  const [walletKeyStatus, setWalletKeyStatus] = useState(""); // State for status message
  const fileInputRef = useRef(null);

  const handleLoadWalletKey = (event) => {
    event.preventDefault();
    const file = event.target.files[0]; // Get the selected file

    if (!file) {
      setWalletKeyStatus("No file selected. Please try again.");
      return;
    }

    if (file.type !== "application/json") {
      setWalletKeyStatus("Invalid file type. Please upload a .json file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const walletKey = JSON.parse(reader.result); // Parse the wallet key file
        localStorage.setItem("walletKey", JSON.stringify(walletKey)); // Save to localStorage
        setWalletKeyStatus("Wallet key loaded successfully!"); // Success feedback
      } catch (error) {
        setWalletKeyStatus("Invalid wallet key file. Please try again."); // Error feedback
      }
    };
    reader.readAsText(file); // Read the file as text
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Open file input dialog
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-primary"
        onClick={handleButtonClick} // Trigger file input dialog
      >
        <span role="img" aria-label="wallet">💼</span> Load Wallet Key
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        accept=".json" // Restrict to .json files
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleLoadWalletKey}
      />

      {/* Status message */}
      {walletKeyStatus && (
        <div
          className={`alert ${
            walletKeyStatus.includes("successfully") ? "alert-success" : "alert-danger"
          } mt-3`}
          role="alert"
        >
          {walletKeyStatus}
        </div>
      )}
    </div>
  );
};

export default LoadWalletKey;
