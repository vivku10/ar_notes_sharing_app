import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/ArNotesLogo.webp"; // Replace with your logo path

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear any previous errors

    const walletFile = event.target.walletFile.files[0];
    if (!walletFile) {
      setError("Please select a wallet key file.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const walletContent = e.target.result;

        // Save wallet key to localStorage (Simulating login)
        localStorage.setItem("walletKey", walletContent);

        // Navigate to the account page after successful login
        navigate("/account");
      };
      reader.readAsText(walletFile);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Failed to login. Please check your wallet key file.");
    }
  };

  const handleArConnectLogin = async () => {
    setError(""); // Clear any previous errors
    if (!window.arweaveWallet) {
      setError("ArConnect extension not detected. Please install it to use this feature.");
      return;
    }

    try {
      // Request permissions from ArConnect
      await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);

      // Fetch wallet address (this step simulates a successful login)
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      console.log("Logged in with ArConnect, Wallet Address:", walletAddress);

      // Navigate to account page
      navigate("/account");
    } catch (err) {
      console.error("ArConnect login failed:", err);
      setError("Failed to login with ArConnect. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      {/* Logo Section */}
      <div className="text-center mb-4">
        <img src={logo} alt="ArNotes Logo" style={{ width: "150px" }} />
        <h1 className="mt-3">Welcome to ArNotes</h1>
        <p className="text-muted">Login to access your account and manage your notes</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center">Login</h3>
            <hr />

            {/* Wallet File Login */}
            <form onSubmit={handleFileLogin}>
              <div className="form-group mb-3">
                <label htmlFor="walletFile" className="form-label">Upload Wallet Key File</label>
                <input
                  type="file"
                  id="walletFile"
                  name="walletFile"
                  accept=".json"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login with Wallet File
              </button>
            </form>

            <hr className="my-4" />

            {/* ArConnect Login */}
            <div className="text-center">
              <p>Or login with</p>
              <button onClick={handleArConnectLogin} className="btn btn-success">
                Login with ArConnect
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
