// routes/blogPostRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  likeBlogPost,
  searchBlogPosts,
} from "../controllers/blogPostController.js";

const router = express.Router();

router.post("/", protect, createBlogPost);
router.get("/", getAllBlogPosts);
router.get("/search", searchBlogPosts);
router.get("/:id", getBlogPostById);
router.put("/:id", protect, updateBlogPost);
router.delete("/:id", protect, deleteBlogPost);
router.post("/:id/like", protect, likeBlogPost);

export default router;
