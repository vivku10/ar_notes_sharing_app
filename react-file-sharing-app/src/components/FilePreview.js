import React, { useState } from "react";

function FilePreview() {
  const [transactionId, setTransactionId] = useState("");
  const [fileContent, setFileContent] = useState("");

  const handlePreview = async () => {
    if (!transactionId) {
      alert("Please enter a valid Transaction ID.");
      return;
    }

    try {
      const response = await fetch(`https://arweave.net/${transactionId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch file content.");
      }
      const content = await response.text();
      setFileContent(content);
    } catch (error) {
      console.error("Error fetching file content:", error);
      setFileContent("Error loading file content.");
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
      {fileContent && (
        <div>
          <h3>File Content:</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
}

export default FilePreview;
