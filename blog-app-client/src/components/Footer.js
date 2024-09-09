// src/components/Footer.js
import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Your Blog Name. All rights reserved.
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 1 }}
        >
          <Link color="inherit" href="#">
            Privacy Policy
          </Link>
          {" | "}
          <Link color="inherit" href="#">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
