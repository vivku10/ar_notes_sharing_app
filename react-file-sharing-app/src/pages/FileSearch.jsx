import React, { useState } from "react";
import Arweave from "arweave";
import Spinner from "react-bootstrap/Spinner";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const FileSearch = () => {
  const [tag, setTag] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!tag.trim()) {
      setError("Please enter a tag to search.");
      return;
    }

    setError("");
    setResults([]);
    setLoading(true);

    try {
      const query = {
        op: "equals",
        expr1: "App-Name",
        expr2: tag.trim(),
      };
      const response = await arweave.arql(query);
      setResults(response || []);
    } catch (err) {
      console.error("Error searching for files:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
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
            maxWidth: "800px", // Max width for the content
            width: "100%", // Ensure the container takes full width up to maxWidth
          }}
        >
          <h2 className="text-center">Search Files</h2>
          <div className="mb-3">
            <label htmlFor="searchInput" className="form-label">
              Enter Tag to Search
            </label>
            <input
              type="text"
              id="searchInput"
              placeholder="Enter Tag (e.g., FileSharingApp)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="form-control"
            />
          </div>
          <button onClick={handleSearch} className="btn btn-primary mb-3 w-100">
            Search
          </button>
          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" variant="primary" />
              <p>Searching...</p>
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {results.length === 0 && !loading && !error && (
            <div className="alert alert-info" role="alert">
              No results found. Try a different tag.
            </div>
          )}
          {results.length > 0 && (
            <ul className="list-group mt-3">
              {results.map((id) => (
                <li key={id} className="list-group-item">
                  <a
                    href={`https://arweave.net/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {id}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileSearch;
