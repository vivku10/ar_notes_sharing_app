import React, { useState, useEffect } from "react";
import { fetchFilesByTag } from "../services/arweaveService";
import Spinner from "react-bootstrap/Spinner";

// Function to get the file type icon based on content type
const getFileIcon = (contentType) => {
  if (contentType.includes("image")) return "https://hdubhoguimn4uryqitkagvwgar5od76ffkwtjq2tqqkgekp3c3yq.arweave.net/OOgTuNRDG8pHEETUA1bGBHrh_8UqrTTDU4QUYin7FvE";
  if (contentType.includes("pdf")) return "https://hdubhoguimn4uryqitkagvwgar5od76ffkwtjq2tqqkgekp3c3yq.arweave.net/OOgTuNRDG8pHEETUA1bGBHrh_8UqrTTDU4QUYin7FvE";
  if (contentType.includes("text")) return "https://hdubhoguimn4uryqitkagvwgar5od76ffkwtjq2tqqkgekp3c3yq.arweave.net/OOgTuNRDG8pHEETUA1bGBHrh_8UqrTTDU4QUYin7FvE";
  return "default-icon.png"; // Default icon
};

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await fetchFilesByTag("App-Name", "NotesSharingApp");
        setFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(files.length / filesPerPage);

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
          <h2 className="text-center">Files</h2>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Loading files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="alert alert-warning" role="alert">
              No files available.
            </div>
          ) : (
            <div>
              {/* File Grid */}
              <div className="row">
                {currentFiles.map((fileId) => (
                  <div key={fileId} className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                      <img
                        src={getFileIcon("image/jpeg")} // Replace with dynamic content type
                        alt="file icon"
                        className="card-img-top p-3"
                      />
                      <div className="card-body text-center">
                        <a
                          href={`https://arweave.net/${fileId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="stretched-link"
                        >
                          <strong>{fileId}</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <nav>
                <ul className="pagination justify-content-center mt-4">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileList;
