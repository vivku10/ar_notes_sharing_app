import React, { useState } from "react";
import { login, getWalletAddress } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    const walletFile = event.target.walletFile.files[0];
    if (!walletFile) {
      setError("Please select a wallet file.");
      return;
    }

    try {
      // Read the wallet file
      const reader = new FileReader();
      reader.onload = async (e) => {
        const walletContent = e.target.result;
        await login(walletContent); // Authenticate user
        const address = await getWalletAddress(); // Get user's wallet address
        setWalletAddress(address); // Display wallet address
        navigate("/account"); // Redirect to the account page after login
      };
      reader.readAsText(walletFile);
    } catch (err) {
      setError("Failed to login. Please check your wallet file.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="walletFile">Upload Wallet File:</label>
        <input type="file" id="walletFile" name="walletFile" accept=".json" />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {walletAddress && (
        <p>
          <strong>Logged in as:</strong> {walletAddress}
        </p>
      )}
    </div>
  );
}

export default Login;
