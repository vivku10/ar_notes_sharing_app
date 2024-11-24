import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Account from "arweave-account";

const UserProfile = ({ walletAddress }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const account = new Account();
        const userProfile = await account.get(walletAddress);
        setProfile(userProfile);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) {
      fetchProfile();
    } else {
      setError("Wallet address not provided.");
      setLoading(false);
    }
  }, [walletAddress]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <img
            src={profile.profile.avatarURL}
            alt="Avatar"
            className="img-thumbnail mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h2>{profile.profile.name}</h2>
          <p className="text-muted">{profile.profile.bio}</p>
          {/* Add additional profile fields if necessary */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
