import React, { useState } from "react";

function FilePreview() {
  const [transactionId, setTransactionId] = useState("");
  const [fileContent, setFileContent] = useState(null); // Change to null for any file type
  const [error, setError] = useState("");  // To handle error messages

  const handlePreview = async () => {
    if (!transactionId) {
      alert("Please enter a valid Transaction ID.");
      return;
    }

    try {
      // Fetch the file from Arweave using the transaction ID
      const response = await fetch(`https://arweave.net/${transactionId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch file content.");
      }

      const contentType = response.headers.get("Content-Type");

      // If the content is a text file (e.g., JSON, text, etc.)
      if (contentType.startsWith("text/")) {
        const content = await response.text();
        setFileContent(<pre>{content}</pre>);  // Display the text content in a readable format
      }
      // If the content is an image
      else if (contentType.startsWith("image/")) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setFileContent(<img src={imageUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: "500px" }} />);
      }
      // If the content is a PDF
      else if (contentType === "application/pdf") {
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);
        setFileContent(<iframe src={pdfUrl} width="100%" height="500px" title="PDF Preview"></iframe>);
      } else {
        setError("Unsupported file type.");
        setFileContent(null);
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
      setError("Error loading file content.");
      setFileContent(null);
    }
  };

  return (
    <div>
      <h2>Preview File</h2>
      <input
        type="text"
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />
      <button onClick={handlePreview}>Preview</button>
      {fileContent && <div>{fileContent}</div>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default FilePreview;
