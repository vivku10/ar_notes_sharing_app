import React, { useState } from "react";
import Arweave from "arweave";
import crypto from "crypto-js";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

function FileEncryptUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    try {
      // Encrypt file
      const fileData = await readFileAsText(file);
      const encryptedData = crypto.AES.encrypt(fileData, "encryption-key").toString();

      // Create and upload Arweave transaction
      const transaction = await arweave.createTransaction(
        { data: encryptedData },
        JSON.parse(localStorage.getItem("walletKey"))
      );
      transaction.addTag("Content-Type", "text/plain");
      transaction.addTag("Encrypted", "true");

      await arweave.transactions.sign(transaction, JSON.parse(localStorage.getItem("walletKey")));
      const response = await arweave.transactions.post(transaction);

      if (response.status === 200) {
        setStatus("File uploaded successfully with encryption! Transaction ID: " + transaction.id);
      } else {
        setStatus("Failed to upload file. Status code: " + response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("Error uploading file: " + error.message);
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
    <div>
      <h2>Encrypt and Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default FileEncryptUpload;
