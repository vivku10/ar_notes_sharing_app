import React, { useState } from "react";

function FileShare() {
  const [transactionId, setTransactionId] = useState("");
  const [shareLink, setShareLink] = useState("");

  const handleGenerateLink = () => {
    if (!transactionId) {
      alert("Please enter a valid Transaction ID.");
      return;
    }
    const link = `https://arweave.net/${transactionId}`;
    setShareLink(link);
  };

  return (
    <div>
      <h2>Generate Shareable Link</h2>
      <input
        type="text"
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />
      <button onClick={handleGenerateLink}>Generate Link</button>
      {shareLink && (
        <div>
          <p>Shareable Link:</p>
          <a href={shareLink} target="_blank" rel="noopener noreferrer">
            {shareLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default FileShare;
