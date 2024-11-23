import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
        padding: "10px 0",
        marginTop: "20px",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Arweave File Sharing Service |{" "}
        <Link href="https://arweave.org" color="inherit" target="_blank">
          Learn More About Arweave
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
