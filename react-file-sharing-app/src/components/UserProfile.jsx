import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Account from "arweave-account";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const walletAddress = localStorage.getItem("walletAddress");
        if (!walletAddress) throw new Error("Wallet address not found.");

        const account = new Account();
        const userProfile = await account.get(walletAddress);

        if (!userProfile) {
          throw new Error("Profile not found. Please log in again.");
        }

        setProfile(userProfile);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
            src={profile.profilePicture || "default-avatar.png"}
            alt="Avatar"
            className="img-thumbnail mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h2>{profile.name}</h2>
          <p className="text-muted">{profile.bio}</p>
          <p><strong>School:</strong> {profile.school}</p>
          <p><strong>Courses:</strong> {profile.courses.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
