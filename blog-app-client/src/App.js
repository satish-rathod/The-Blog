import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import CreateEditBlogPage from "./pages/CreateEditBlogPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import UserProfilePage from "./pages/UserProfilePage";
import theme from "./styles/theme";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/blog/:blogId" element={<BlogDetailsPage />} />
            <Route path="/create" element={<CreateEditBlogPage />} />
            <Route path="/edit/:blogId" element={<CreateEditBlogPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/user/:userId" element={<UserProfilePage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
