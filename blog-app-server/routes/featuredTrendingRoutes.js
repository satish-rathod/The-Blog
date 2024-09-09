// routes/featuredTrendingRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  setFeaturedPost,
  getFeaturedPosts,
} from "../controllers/featuredPostsController.js";
import { getTrendingPosts } from "../controllers/blogPostController.js";

const router = express.Router();

router.put("/featured/:id", protect, admin, setFeaturedPost);
router.get("/featured", getFeaturedPosts);
router.get("/trending", getTrendingPosts);

export default router;
