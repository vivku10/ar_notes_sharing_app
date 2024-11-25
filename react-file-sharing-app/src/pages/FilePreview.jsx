import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const FilePreview = () => {
  const [transactionId, setTransactionId] = useState("");
  const [noteData, setNoteData] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    if (!transactionId) {
      setError("Please enter a valid Transaction ID.");
      return;
    }

    setError("");
    setNoteData(null);
    setFileContent(null);
    setLoading(true);

    try {
      const response = await fetch(`https://arweave.net/${transactionId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch transaction content.");
      }

      const contentType = response.headers.get("Content-Type");

      // If the transaction is a JSON (assumed to be a note)
      if (contentType === "application/json") {
        const jsonData = await response.json();
        setNoteData(jsonData);

        // Check if the note has an attachment
        if (jsonData.attachment) {
          const attachmentResponse = await fetch(
            `https://arweave.net/${jsonData.attachment.transactionId}`
          );

          if (attachmentResponse.ok) {
            const attachmentType = attachmentResponse.headers.get("Content-Type");
            await handleFilePreview(attachmentResponse, attachmentType);
          }
        }
      } else {
        // Otherwise, fallback to file preview
        await handleFilePreview(response, contentType);
      }
    } catch (err) {
      console.error("Error fetching transaction content:", err);
      setError("Error loading transaction content.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilePreview = async (response, contentType) => {
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
            maxWidth: "800px", // Max width for the content to resemble the file upload box
            width: "100%", // Ensure the container takes full width up to maxWidth
          }}
        >
          <h2 className="text-center">Preview Note or File</h2>
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
          <button onClick={handlePreview} className="btn btn-primary mb-3 w-100">
            Preview
          </button>
          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" variant="primary" />
              <p>Loading content...</p>
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {noteData && (
            <div className="note-preview mt-3">
              <h3>{noteData.title}</h3>
              <p><strong>Tags:</strong> {noteData.tags.join(", ")}</p>
              <p><strong>Category:</strong> {noteData.category}</p>
              <p><strong>Content:</strong></p>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {noteData.content}
              </pre>
            </div>
          )}
          {fileContent && <div className="file-preview mt-3">{fileContent}</div>}
          {!noteData && !fileContent && !loading && !error && (
            <p className="text-muted">Enter a Transaction ID to preview content.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
