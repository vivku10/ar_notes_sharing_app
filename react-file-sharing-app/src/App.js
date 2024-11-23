import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import Account from "./components/Account";
import FileShare from "./components/FileShare";
import FileSearch from "./components/FileSearch";
import FilePreview from "./components/FilePreview";
import FileEncryptUpload from "./components/FileEncryptUpload";
import Footer from "./components/Footer";
import "./App.css"; // Include custom styling

function App() {
  const [selectedComponent, setSelectedComponent] = useState("FileUpload");
  const [isWalletKeyModalOpen, setIsWalletKeyModalOpen] = useState(false);

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  const handleLoadWalletKey = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const walletKey = JSON.parse(reader.result);
          localStorage.setItem("walletKey", JSON.stringify(walletKey));
          alert("Wallet key loaded successfully!");
        } catch (error) {
          alert("Invalid wallet key file.");
        }
      };
      reader.readAsText(file);
    }
    setIsWalletKeyModalOpen(false);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>Note Sharing App</h1>
          <div className="header-buttons">
            <button onClick={() => handleComponentSelect("FileUpload")}>File Upload</button>
            <button onClick={() => handleComponentSelect("FileList")}>File List</button>
            <button onClick={() => handleComponentSelect("Account")}>Account</button>
            <button onClick={() => handleComponentSelect("FileShare")}>File Share</button>
            <button onClick={() => handleComponentSelect("FileSearch")}>Search Files</button>
            <button onClick={() => handleComponentSelect("FilePreview")}>Preview File</button>
            <button onClick={() => handleComponentSelect("FileEncryptUpload")}>Encrypted Upload</button>

            {/* Load Wallet Key Button */}
            <button
              className="load-wallet-btn"
              onClick={() => setIsWalletKeyModalOpen(true)}
            >
              <i className="fa fa-wallet"></i>
              <span>Load Wallet Key</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="content-section">
          {selectedComponent === "FileUpload" && <FileUpload />}
          {selectedComponent === "FileList" && <FileList />}
          {selectedComponent === "Account" && <Account />}
          {selectedComponent === "FileShare" && <FileShare />}
          {selectedComponent === "FileSearch" && <FileSearch />}
          {selectedComponent === "FilePreview" && <FilePreview />}
          {selectedComponent === "FileEncryptUpload" && <FileEncryptUpload />}
        </section>
      </main>

      {/* Modal for File Uploading Wallet Key */}
      {isWalletKeyModalOpen && (
        <div className="wallet-modal">
          <div className="wallet-modal-content">
            <h3>Select Wallet Key File</h3>
            <input
              type="file"
              accept=".json"
              onChange={handleLoadWalletKey}
            />
            <button onClick={() => setIsWalletKeyModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
