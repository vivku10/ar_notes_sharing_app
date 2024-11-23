import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../styles/Navigation.css";

const Navigation = () => {
  const { walletAddress, setWalletAddress } = useAppContext();
  const fileInputRef = useRef(null);

  const handleWalletUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("No file selected. Please upload a valid wallet key.");
      return;
    }

    if (file.type !== "application/json") {
      alert("Invalid file type. Please upload a .json file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const walletKey = JSON.parse(reader.result); // Parse the wallet key file
        localStorage.setItem("walletKey", JSON.stringify(walletKey)); // Save to localStorage
        setWalletAddress("example-wallet-address"); // Mock wallet address
        alert("Wallet key loaded successfully!");
      } catch (error) {
        alert("Invalid wallet key file. Please try again.");
      }
    };
    reader.readAsText(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("walletKey"); // Clear wallet key from localStorage
    setWalletAddress(""); // Clear wallet address
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo or Brand Name */}
        <Link to="/" className="navbar-brand">
          ArNotes
        </Link>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/file-upload" className="nav-link">
                File Upload
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-list" className="nav-link">
                File List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-preview" className="nav-link">
                File Preview
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-search" className="nav-link">
                File Search
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-encrypt-upload" className="nav-link">
                Encrypt & Upload
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-share" className="nav-link">
                File Share
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-delete" className="nav-link">
                Delete File
              </Link>
            </li>
          </ul>

          {/* Account Dropdown */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle d-flex align-items-center"
                id="accountDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="me-2">{walletAddress ? "Account" : "Login"}</span>
                <i className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                {!walletAddress && (
                  <>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Login (Upload Wallet Key)
                      </button>
                      <input
                        type="file"
                        accept=".json"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleWalletUpload}
                      />
                    </li>
                  </>
                )}
                {walletAddress && (
                  <>
                    <li>
                      <Link to="/account" className="dropdown-item">
                        Account
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
