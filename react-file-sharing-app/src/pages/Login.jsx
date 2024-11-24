import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/ArNotesLogo.webp";
import Account from "arweave-account";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const walletFile = event.target.walletFile.files[0];
    if (!walletFile) {
      setError("Please select a wallet key file.");
      setLoading(false);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const walletContent = e.target.result;
        localStorage.setItem("walletKey", walletContent);
        setLoading(false);
        navigate("/account");
      };
      reader.readAsText(walletFile);
    } catch (err) {
      console.error("File login failed:", err);
      setError("Failed to login. Please check your wallet key file.");
      setLoading(false);
    }
  };

  const handleArConnectLogin = async () => {
    setError("");
    setLoading(true);

    if (!window.arweaveWallet) {
      setError("ArConnect extension not detected. Please install it to use this feature.");
      setLoading(false);
      return;
    }

    try {
      await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);
      const walletAddress = await window.arweaveWallet.getActiveAddress();

      // Fetch or create profile using ArProfile
      const account = new Account();
      let profile = await account.get(walletAddress);

      // If no profile exists, create a default one
      if (!profile) {
        profile = {
          name: "New User",
          bio: "Welcome to ArNotes!",
          school: "Unknown",
          courses: [],
          preferences: {},
          profilePicture: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await account.update(walletAddress, profile);
      }

      // Store wallet address and navigate to account page
      localStorage.setItem("walletAddress", walletAddress);
      navigate("/account");
    } catch (err) {
      console.error("ArConnect login failed:", err);
      setError("Failed to login with ArConnect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
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
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? "Logging in..." : "Login with Wallet File"}
              </button>
            </form>

            <hr className="my-4" />

            {/* ArConnect Login */}
            <div className="text-center">
              <p>Or login with</p>
              <button onClick={handleArConnectLogin} className="btn btn-success" disabled={loading}>
                {loading ? "Connecting to ArConnect..." : "Login with ArConnect"}
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
