import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import Account from "./components/Account";
import FileSearch from "./components/FileSearch";
import FilePreview from "./components/FilePreview";
import FileEncryptUpload from "./components/FileEncryptUpload";
import FileDelete from "./components/FileDelete";
import LoadWalletKey from "./components/LoadWalletKey";
import './App.css';  // Custom styles

const App = () => {
  const [walletKeyStatus, setWalletKeyStatus] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("FileUpload");
  const [files, setFiles] = useState([]);

  const addFile = (fileData) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, fileData];
      console.log("Files after adding:", updatedFiles); // Debugging line
      return updatedFiles;
    });
  };

  const deleteFile = (transactionId) => {
    console.log("Attempting to delete file with Transaction ID:", transactionId);
    // Filter out the file to delete
    setFiles((prevFiles) => prevFiles.filter((file) => file.transactionId !== transactionId));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>Note Sharing App</h1>
        </div>
        <div className="header-right">
          <LoadWalletKey setWalletKeyStatus={setWalletKeyStatus} />
        </div>
      </header>

      <div className="app-navigation">
        <div className="navigation-buttons">
          <button onClick={() => setSelectedComponent("FileUpload")}>File Upload</button>
          <button onClick={() => setSelectedComponent("FileList")}>File List</button>
          <button onClick={() => setSelectedComponent("Account")}>Account</button>
          <button onClick={() => setSelectedComponent("FileSearch")}>File Search</button>
          <button onClick={() => setSelectedComponent("FilePreview")}>File Preview</button>
          <button onClick={() => setSelectedComponent("FileEncryptUpload")}>Encrypt & Upload</button>
          <button onClick={() => setSelectedComponent("FileDelete")}>Delete File</button>
        </div>
      </div>

      <div className="app-content">
        {/* Display the selected component */}
        {selectedComponent === "FileUpload" && <FileUpload walletKeyStatus={walletKeyStatus} addFile={addFile} />}
        {selectedComponent === "FileList" && <FileList files={files} />}
        {selectedComponent === "Account" && <Account />}
        {selectedComponent === "FileSearch" && <FileSearch />}
        {selectedComponent === "FilePreview" && <FilePreview />}
        {selectedComponent === "FileEncryptUpload" && <FileEncryptUpload />}
        {selectedComponent === "FileDelete" && <FileDelete files={files} deleteFile={deleteFile} />}
      </div>
    </div>
  );
};

export default App;
