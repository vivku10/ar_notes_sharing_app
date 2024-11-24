import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <div className="container">
        <p className="mb-1">&copy; {new Date().getFullYear()} ArNotes. All Rights Reserved.</p>
        <p className="mb-0">
          Made with <span style={{ color: "red" }}>❤️</span> by Our Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;

