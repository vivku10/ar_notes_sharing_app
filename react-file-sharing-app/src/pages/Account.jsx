import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { getWalletAddress } from "../services/authService";

const Account = () => {
  const { walletAddress, setWalletAddress } = useAppContext();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        let address = "";
        if (window.arweaveWallet) {
          // Check if ArConnect is connected
          const connected = await window.arweaveWallet.getPermissions();
          if (connected.includes("ACCESS_ADDRESS")) {
            address = await window.arweaveWallet.getActiveAddress();
          }
        }
        if (!address) {
          // Fallback to wallet address from authService
          address = await getWalletAddress();
        }
        setWalletAddress(address);
      } catch (error) {
        console.error("Error fetching wallet address:", error);
        setWalletAddress("Error loading address");
      }
    };

    fetchWallet();
  }, [setWalletAddress]);

  return (
    <div
      style={{
        backgroundImage: "url('/path-to-your-background.jpg')", // Add your background image path here
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensures full height coverage
        paddingBottom: "100px", // Ensures enough space for footer
      }}
    >
      <div className="container mt-5" style={{ marginTop: "100px" }}>
        <div
          className="shadow-lg rounded p-4 mx-auto"
          style={{
            backgroundColor: "#ffffff", // Solid white background for the container
            color: "#000", // Dark text for contrast
            border: "1px solid #ddd", // Optional border for a defined look
            maxWidth: "800px", // Max width for the content
            width: "100%", // Ensure the container takes full width up to maxWidth
          }}
        >
          <h2 className="text-center">Your Account</h2>
          <div className="mt-3">
            <p
              style={{
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              Wallet Address:
            </p>
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: walletAddress === "Error loading address" ? "red" : "black",
              }}
            >
              {walletAddress || "Fetching..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
