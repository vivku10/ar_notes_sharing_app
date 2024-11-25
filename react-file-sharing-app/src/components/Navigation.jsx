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

  const handleArConnectLogin = async () => {
    if (!window.arweaveWallet) {
      alert("ArConnect extension not detected. Please install it to use this feature.");
      return;
    }

    try {
      await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);
      const address = await window.arweaveWallet.getActiveAddress();
      setWalletAddress(address); // Set the wallet address globally
      localStorage.setItem("walletAddress", address); // Persist wallet address
      alert("Logged in successfully with ArConnect!");
    } catch (err) {
      console.error("ArConnect login failed:", err);
      alert("Failed to login with ArConnect. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("walletKey"); // Clear wallet key from localStorage
    localStorage.removeItem("walletAddress"); // Clear wallet address
    setWalletAddress(""); // Clear wallet address in context
    alert("Logged out successfully.");
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
              <Link to="/notes-upload" className="nav-link">
                Upload
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/notes-list" className="nav-link">
                List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-preview" className="nav-link">
                Preview
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-search" className="nav-link">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-encrypt-upload" className="nav-link">
                Encrypt
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-share" className="nav-link">
                Share
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/file-delete" className="nav-link">
                Delete
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
                      <button className="dropdown-item" onClick={handleArConnectLogin}>
                        Login with ArConnect
                      </button>
                    </li>
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
