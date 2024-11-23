// src/components/FileUpload.js
import React, { useState } from "react";
import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const FileUpload = ({ walletKeyStatus }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    // Check if a file is selected
    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    // Load wallet key from localStorage
    const walletKey = JSON.parse(localStorage.getItem("walletKey"));
    if (!walletKey) {
      setStatus("Please load your wallet key first.");
      return;
    }

    try {
      // Read file as ArrayBuffer
      const fileData = await readFileAsArrayBuffer(file);

      // Create transaction
      const transaction = await arweave.createTransaction(
        { data: new Uint8Array(fileData) },
        walletKey
      );

      // Add tags
      transaction.addTag("Content-Type", file.type || "application/octet-stream");
      transaction.addTag("App-Name", "FileSharingApp");

      // Sign transaction
      await arweave.transactions.sign(transaction, walletKey);

      // Submit transaction
      const response = await arweave.transactions.post(transaction);

      if (response.status === 200) {
        setStatus("File uploaded successfully! Transaction ID: " + transaction.id);
      } else {
        setStatus("Failed to upload file. Status code: " + response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("Error uploading file: " + error.message);
    }
  };

  // Utility function to read file as ArrayBuffer
  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default FileUpload;
