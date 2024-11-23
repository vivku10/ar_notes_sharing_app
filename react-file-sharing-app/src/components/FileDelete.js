import React, { useState } from "react";

function FileDelete({ files, deleteFile }) {
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState("");

  const handleInputChange = (event) => {
    setTransactionId(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (!transactionId) {
      setStatus("Please provide a valid transaction ID.");
      return;
    }

    // Ensure files is not undefined or null
    if (!files || files.length === 0) {
      setStatus("No files available to delete.");
      return;
    }

    // Check if the file exists in the list
    const fileToDelete = files.find((file) => file.transactionId === transactionId);
    if (!fileToDelete) {
      setStatus("File not found.");
      return;
    }

    // Call the deleteFile function from App.js to remove the file
    deleteFile(transactionId);
    setStatus(`File with Transaction ID: ${transactionId} deleted successfully.`);
  };

  return (
    <div>
      <h2>Soft Delete (Work In Progress...)</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          value={transactionId}
          onChange={handleInputChange}
          placeholder="Enter Transaction ID"
        />
        <button type="submit">Delete</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default FileDelete;
