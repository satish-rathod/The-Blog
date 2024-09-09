// src/components/BlogCard.js
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        component={Link}
        to={`/blog/${post.id}`}
        sx={{ flexGrow: 1 }}
      >
        <CardMedia
          component="img"
          height="140"
          image={post.image || "https://source.unsplash.com/random"}
          alt={post.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.excerpt}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            By {post.author} | {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
