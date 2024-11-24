import React, { useState } from "react";
import Arweave from "arweave";
import crypto from "crypto-js";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const FileEncryptUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ message: "", type: "" });
  const encryptionKey = "encryption-key"; // Replace with a dynamic or secure key if needed

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus({ message: "Please select a file to upload.", type: "danger" });
      return;
    }

    try {
      // Encrypt file
      const fileData = await readFileAsText(file);
      const encryptedData = crypto.AES.encrypt(fileData, encryptionKey).toString();

      // Create and upload Arweave transaction
      const walletKey = JSON.parse(localStorage.getItem("walletKey"));
      const transaction = await arweave.createTransaction(
        { data: encryptedData },
        walletKey
      );
      transaction.addTag("Content-Type", "text/plain");
      transaction.addTag("Encrypted", "true");

      await arweave.transactions.sign(transaction, walletKey);
      const response = await arweave.transactions.post(transaction);

      if (response.status === 200) {
        setStatus({
          message: `File uploaded successfully with encryption! Transaction ID: ${transaction.id}`,
          type: "success",
        });
      } else {
        setStatus({
          message: `Failed to upload file. Status code: ${response.status}`,
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus({
        message: `Error uploading file: ${error.message}`,
        type: "danger",
      });
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
      <h2>Encrypt and Upload File</h2>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="fileInput">Select File</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button
          type="button"
          onClick={handleUpload}
          className="btn btn-primary"
        >
          Upload
        </button>
      </form>
      {status.message && (
        <div className={`alert alert-${status.type} mt-3`} role="alert">
          {status.message}
        </div>
      )}
    </div>
  );
};

export default FileEncryptUpload;
