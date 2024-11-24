import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const FilePreview = () => {
  const [transactionId, setTransactionId] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    if (!transactionId) {
      setError("Please enter a valid Transaction ID.");
      return;
    }

    setError("");
    setFileContent(null);
    setLoading(true);

    try {
      const response = await fetch(`https://arweave.net/${transactionId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch file content.");
      }

      const contentType = response.headers.get("Content-Type");

      if (contentType.startsWith("text/")) {
        const content = await response.text();
        setFileContent(
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {content}
          </pre>
        );
      } else if (contentType.startsWith("image/")) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setFileContent(
          <img
            src={imageUrl}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        );
      } else if (contentType === "application/pdf") {
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);
        setFileContent(
          <iframe
            src={pdfUrl}
            width="100%"
            height="400px"
            title="PDF Preview"
          ></iframe>
        );
      } else {
        setError("Unsupported file type.");
        setFileContent(null);
      }
    } catch (err) {
      console.error("Error fetching file content:", err);
      setError("Error loading file content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Preview File</h2>
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
      <button onClick={handlePreview} className="btn btn-primary mb-3">
        Preview
      </button>
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" />
          <p>Loading file...</p>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {fileContent && <div className="preview-container mt-3">{fileContent}</div>}
    </div>
  );
};

export default FilePreview;
