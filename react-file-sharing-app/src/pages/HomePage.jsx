import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage text-center text-white">
      <h1 className="display-4">Welcome to ArNotes</h1>
      <p className="lead">
        A decentralized way to manage and share your notes securely.
      </p>
      <div className="mt-4">
        <Link to="/file-upload" className="btn btn-primary btn-lg me-3">
          Get Started
        </Link>
        <Link to="/file-list" className="btn btn-outline-light btn-lg">
          Explore Notes
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
