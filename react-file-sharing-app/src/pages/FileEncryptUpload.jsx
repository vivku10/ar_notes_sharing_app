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
    <div
      style={{
        backgroundImage: "url('/path-to-your-background.jpg')", // Add your background image path here
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensures full height coverage
        paddingBottom: "100px", // Ensures enough space for footer
      }}
    >
      <div className="container mt-5" style={{ marginTop: "100px" }}>
        {/* Adjusted margin to add space from navigation */}
        <div
          className="shadow-lg rounded p-4 mx-auto"
          style={{
            backgroundColor: "#ffffff", // Solid white background for the container
            color: "#000", // Dark text for contrast
            border: "1px solid #ddd", // Optional border for a defined look
            maxWidth: "800px", // Max width for the content
            width: "100%", // Ensure the container takes full width up to maxWidth
          }}
        >
          <h2 className="text-center">Encrypt and Upload File</h2>
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
              className="btn btn-primary w-100"
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
      </div>
    </div>
  );
};

export default FileEncryptUpload;
