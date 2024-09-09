import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "./SearchBar";

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Blog App
        </Typography>
        <SearchBar />
        <Button color="inherit" component={Link} to="/create">
          Create Post
        </Button>
        <Switch
          checked={darkMode}
          onChange={() => dispatch(toggleTheme())}
          color="default"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
