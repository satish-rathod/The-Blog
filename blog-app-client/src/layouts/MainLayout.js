// src/layouts/MainLayout.js
import React from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;
