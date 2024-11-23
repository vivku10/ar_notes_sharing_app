import React, { useState, useEffect } from "react";
import { fetchFilesByTag } from "../services/arweaveService";

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
    <div>
      <h2>Files</h2>
      <ul>
        {files.map((fileId) => (
          <li key={fileId}>
            <a href={`https://arweave.net/${fileId}`} target="_blank" rel="noopener noreferrer">
              {fileId}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
