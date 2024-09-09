// src/components/CategoryList.js
import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            component={Link}
            to={`/category/${category.slug}`}
            key={category.id}
          >
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryList;
