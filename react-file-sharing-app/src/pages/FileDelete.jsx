import React, { useState } from "react";

const FileDelete = ({ files, deleteFile }) => {
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleInputChange = (event) => {
    setTransactionId(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (!transactionId) {
      setStatus({ message: "Please provide a valid transaction ID.", type: "danger" });
      return;
    }

    if (!files || files.length === 0) {
      setStatus({ message: "No files available to delete.", type: "warning" });
      return;
    }

    const fileToDelete = files.find((file) => file.transactionId === transactionId);
    if (!fileToDelete) {
      setStatus({ message: "File not found.", type: "danger" });
      return;
    }

    deleteFile(transactionId);
    setTransactionId("");
    setStatus({
      message: `File with Transaction ID: ${transactionId} deleted successfully.`,
      type: "success",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Soft Delete</h2>
      <form onSubmit={handleDelete} className="form-inline">
        <div className="form-group mb-3">
          <input
            type="text"
            value={transactionId}
            onChange={handleInputChange}
            placeholder="Enter Transaction ID"
            className="form-control mr-2"
          />
          <button type="submit" className="btn btn-danger">
            Delete
          </button>
        </div>
      </form>
      {status.message && (
        <div className={`alert alert-${status.type} mt-3`} role="alert">
          {status.message}
        </div>
      )}
    </div>
  );
};

export default FileDelete;
