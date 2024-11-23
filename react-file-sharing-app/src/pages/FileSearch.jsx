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
    <div className="container mt-4">
      <h2>Search Files</h2>
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
      <button onClick={handleSearch} className="btn btn-primary mb-3">
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
        <ul className="list-group">
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
  );
};

export default FileSearch;
