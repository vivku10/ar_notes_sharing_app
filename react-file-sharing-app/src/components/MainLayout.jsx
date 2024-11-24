import React from "react";
import "../styles/MainLayout.css"; // Ensure the path is correct

const MainLayout = ({ children }) => {
  return <div className="main-layout">{children}</div>;
};

export default MainLayout; // Ensure it is a default export
