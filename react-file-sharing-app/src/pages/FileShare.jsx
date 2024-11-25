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
          <h2 className="text-center">Generate Shareable Link</h2>
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
          <button
            onClick={handleGenerateLink}
            className="btn btn-primary w-100"
          >
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
      </div>
    </div>
  );
};

export default FileShare;
