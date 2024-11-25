import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import logo from "../assets/images/ArNotesLogo.webp"; // Adjust path if necessary

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

    // Fetch or create profile using ArProfile
// -      const account = new Account();
// -      let profile = await account.get(walletAddress);
// -
// -      // If no profile exists, create a default one
// -      if (!profile) {
// -        profile = {
// -          name: "New User",
// -          bio: "Welcome to ArNotes!",
// -          school: "Unknown",
// -          courses: [],
// -          preferences: {},
// -          profilePicture: "",
// -          createdAt: new Date().toISOString(),
// -          updatedAt: new Date().toISOString(),
// -        };
// -
// -        await account.update(walletAddress, profile);
// -      }
    try {
      await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);
      const walletAddress = await window.arweaveWallet.getActiveAddress();
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
      {/* Main container for the whole page */}
      {/* Container for the login options */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* First Card: Login with Wallet File */}
          <div
            className="card shadow p-4 mb-4"
            style={{
              backgroundColor: "#ffffff", // Solid white background for the container
              color: "#000", // Dark text for contrast
              border: "1px solid #ddd", // Optional border for a defined look
            }}
          >
            <h3 className="text-center">Login with Wallet File</h3>
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
              <button type="submit" className="btn btn-primary btn-block w-100" disabled={loading}>
                {loading ? "Logging in..." : "Login with Wallet File"}
              </button>
            </form>
          </div>

          {/* Second Card: Login with ArConnect */}
          <div
            className="card shadow p-4"
            style={{
              backgroundColor: "#ffffff", // Solid white background for the container
              color: "#000", // Dark text for contrast
              border: "1px solid #ddd", // Optional border for a defined look
            }}
          >
            <h3 className="text-center">Or Login with ArConnect</h3>
            <div className="text-center">
              <button
                onClick={handleArConnectLogin}
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Connecting to ArConnect..." : "Login with ArConnect"}
              </button>
            </div>
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
  );
};

export default Login;
