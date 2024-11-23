import React, { useState } from "react";
import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const FileUpload = ({ addFile }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      setStatus({ message: "Please select a file to upload.", type: "danger" });
      return;
    }

    try {
      const walletKey = JSON.parse(localStorage.getItem("walletKey"));
      if (!walletKey) {
        setStatus({ message: "Wallet key not found. Please log in.", type: "danger" });
        return;
      }

      const fileData = await readFileAsArrayBuffer(file);

      const transaction = await arweave.createTransaction(
        { data: new Uint8Array(fileData) },
        walletKey
      );

      transaction.addTag("Content-Type", file.type || "application/octet-stream");
      transaction.addTag("App-Name", "FileSharingApp");

      await arweave.transactions.sign(transaction, walletKey);
      const response = await arweave.transactions.post(transaction);

      if (response.status === 200) {
        setStatus({
          message: `File uploaded successfully! Transaction ID: ${transaction.id}`,
          type: "success",
        });

        addFile({
          transactionId: transaction.id,
          fileName: file.name,
          fileType: file.type,
        });
      } else {
        setStatus({
          message: `Failed to upload file. Status code: ${response.status}`,
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus({ message: `Error uploading file: ${error.message}`, type: "danger" });
    }
  };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="container mt-4">
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Select File
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
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

export default FileUpload;
