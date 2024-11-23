import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import Account from "./components/Account";
import WalletSetup from "./components/WalletSetup";

function App() {
  return (
    <Router>
      <div>
        <h1>File Sharing Service</h1>
        <WalletSetup />
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/upload">Upload File</Link>
            </li>
            <li>
              <Link to="/files">View Files</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </nav>

        {/* Routes for Components */}
        <Routes>
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/files" element={<FileList />} />
          <Route path="/account" element={<Account />} />
          {/* Default Route */}
          <Route path="/" element={<h2>Welcome to the File Sharing Service</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
