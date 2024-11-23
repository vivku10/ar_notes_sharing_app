import React, { useState } from "react";
import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

function FileSearch() {
  const [tag, setTag] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!tag) {
      alert("Please enter a tag to search.");
      return;
    }

    try {
      const query = {
        op: "equals",
        expr1: "App-Name",
        expr2: tag,
      };
      const response = await arweave.arql(query);
      setResults(response);
    } catch (error) {
      console.error("Error searching for files:", error);
    }
  };

  return (
    <div>
      <h2>Search Files</h2>
      <input
        type="text"
        placeholder="Enter Tag (e.g., FileSharingApp)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {results.length > 0 && (
        <ul>
          {results.map((id) => (
            <li key={id}>
              <a href={`https://arweave.net/${id}`} target="_blank" rel="noopener noreferrer">
                {id}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileSearch;
