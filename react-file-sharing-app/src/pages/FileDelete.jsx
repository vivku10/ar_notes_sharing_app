import React, { useState } from "react";

const FileDelete = ({ files, deleteFile }) => {
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleInputChange = (event) => {
    setTransactionId(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (!transactionId) {
      setStatus({ message: "Please provide a valid transaction ID.", type: "danger" });
      return;
    }

    if (!files || files.length === 0) {
      setStatus({ message: "No files available to delete.", type: "warning" });
      return;
    }

    const fileToDelete = files.find((file) => file.transactionId === transactionId);
    if (!fileToDelete) {
      setStatus({ message: "File not found.", type: "danger" });
      return;
    }

    deleteFile(transactionId);
    setTransactionId("");
    setStatus({
      message: `File with Transaction ID: ${transactionId} deleted successfully.`,
      type: "success",
    });
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
          <h2 className="text-center">Soft Delete File</h2>
          <form onSubmit={handleDelete} className="mb-3">
            <div className="mb-3">
              <input
                type="text"
                value={transactionId}
                onChange={handleInputChange}
                placeholder="Enter Transaction ID"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">
              Delete
            </button>
          </form>
          {status.message && (
            <div className={`alert alert-${status.type} mt-3`} role="alert">
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDelete;
