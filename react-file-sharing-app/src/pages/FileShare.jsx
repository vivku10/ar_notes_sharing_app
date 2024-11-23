import React, { useState } from "react";

const FileShare = () => {
  const [transactionId, setTransactionId] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [error, setError] = useState("");

  const handleGenerateLink = () => {
    if (!transactionId.trim()) {
      setError("Please enter a valid Transaction ID.");
      setShareLink("");
      return;
    }
    setError("");
    const link = `https://arweave.net/${transactionId.trim()}`;
    setShareLink(link);
  };

  return (
    <div className="container mt-4">
      <h2>Generate Shareable Link</h2>
      <div className="mb-3">
        <label htmlFor="transactionIdInput" className="form-label">
          Enter Transaction ID
        </label>
        <input
          type="text"
          id="transactionIdInput"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={handleGenerateLink} className="btn btn-primary mb-3">
        Generate Link
      </button>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      {shareLink && (
        <div className="alert alert-success mt-3" role="alert">
          <p>Shareable Link:</p>
          <a href={shareLink} target="_blank" rel="noopener noreferrer">
            {shareLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default FileShare;
