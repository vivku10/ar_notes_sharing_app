import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import Account from "./components/Account";
import FileShare from "./components/FileShare";
import FileSearch from "./components/FileSearch";
import FilePreview from "./components/FilePreview";
import FileEncryptUpload from "./components/FileEncryptUpload";
import FileDelete from "./components/FileDelete";
import LoadWalletKey from "./components/LoadWalletKey";
import Footer from "./components/Footer";  // Importing Footer component
import './App.css';  // Custom styles

const App = () => {
  const [walletKeyStatus, setWalletKeyStatus] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("FileUpload");

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>ArNotes</h1>
        </div>
        <div className="header-right">
          <LoadWalletKey setWalletKeyStatus={setWalletKeyStatus} />
        </div>
      </header>

      <div className="app-navigation">
        <div className="navigation-buttons">
          <button onClick={() => setSelectedComponent("Account")}>Account</button>
          <button onClick={() => setSelectedComponent("FileUpload")}>File Upload</button>
          <button onClick={() => setSelectedComponent("FileEncryptUpload")}>Encrypt & Upload</button>
          <button onClick={() => setSelectedComponent("FileList")}>File List</button>
          <button onClick={() => setSelectedComponent("FileSearch")}>File Search</button>
          <button onClick={() => setSelectedComponent("FilePreview")}>File Preview</button>
          <button onClick={() => setSelectedComponent("FileShare")}>File Share</button>
          <button onClick={() => setSelectedComponent('deleteFile')}>Delete File</button>
        </div>
      </div>

      <div className="app-content">
        {/* Display the selected component */}
        {selectedComponent === "Account" && <Account />}
        {selectedComponent === "FileUpload" && <FileUpload walletKeyStatus={walletKeyStatus} />}
        {selectedComponent === "FileEncryptUpload" && <FileEncryptUpload />}
        {selectedComponent === "FileList" && <FileList />}
        {selectedComponent === "FileSearch" && <FileSearch />}
        {selectedComponent === "FilePreview" && <FilePreview />}
        {selectedComponent === "FileShare" && <FileShare />}
        {selectedComponent === "deleteFile" && <FileDelete />}
      </div>

      <Footer /> {/* Footer component at the bottom */}
    </div>
  );
};

export default App;
