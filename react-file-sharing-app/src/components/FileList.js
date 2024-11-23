import React, { useState, useEffect } from "react";
import { fetchFilesByTag } from "../services/arweaveService";

// Function to get the file type icon based on content type
const getFileIcon = (contentType) => {
  if (contentType.includes("image")) return "https://hdubhoguimn4uryqitkagvwgar5od76ffkwtjq2tqqkgekp3c3yq.arweave.net/OOgTuNRDG8pHEETUA1bGBHrh_8UqrTTDU4QUYin7FvE"; // Replace with actual image icon path
  if (contentType.includes("pdf")) return "https://hdubhoguimn4uryqitkagvwgar5od76ffkwtjq2tqqkgekp3c3yq.arweave.net/OOgTuNRDG8pHEETUA1bGBHrh_8UqrTTDU4QUYin7FvE"; // Replace with actual PDF icon path
  if (contentType.includes("text")) return "https://hdubhoguimn4uryqitkagvwgar5od76ffkwtjq2tqqkgekp3c3yq.arweave.net/OOgTuNRDG8pHEETUA1bGBHrh_8UqrTTDU4QUYin7FvE"; // Replace with actual text file icon path
  return "default-icon.png"; // Default icon for other file types
};

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await fetchFilesByTag("App-Name", "FileSharingApp");
      setFiles(files);
    };
    fetchFiles();
  }, []);

  return (
    <div className="file-list-container">
      <h2>Files</h2>
      {files.length === 0 ? (
        <p>No files available.</p>
      ) : (
        <div className="file-grid">
          {files.map((fileId) => (
            <div key={fileId} className="file-item">
              {/* Replace with logic to get file details, like content type */}
              <img
                src={getFileIcon("image/jpeg")} // Replace with the actual file type logic
                alt="file icon"
                className="file-icon"
              />
              <div className="file-info">
                <a
                  href={`https://arweave.net/${fileId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file-link"
                >
                  <strong>File: {fileId}</strong>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileList;
