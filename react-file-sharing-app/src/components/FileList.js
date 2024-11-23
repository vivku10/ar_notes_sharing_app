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
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(10); // Number of files per page

  // Fetch the list of files
  useEffect(() => {
    const fetchFiles = async () => {
      const files = await fetchFilesByTag("App-Name", "FileSharingApp");
      setFiles(files);
    };
    fetchFiles();
  }, []);

  // Calculate the files to display on the current page
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  // Logic for navigating pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(files.length / filesPerPage);

  return (
    <div className="file-list-container">
      <div className="file-list-header">
        <h2>Files</h2>
      </div>

      {/* Scrollable area for file list */}
      <div className="file-list-scrollable">
        {files.length === 0 ? (
          <p>No files available.</p>
        ) : (
          <div className="file-grid">
            {currentFiles.map((fileId) => (
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

      {/* Fixed pagination section */}
      <div className="pagination-container">
        <div className="pagination">
          <button
            className={`page-button ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`page-button ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileList;
