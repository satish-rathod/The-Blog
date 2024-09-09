// routes/userProfileRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  getUserBlogPosts,
} from "../controllers/userProfileController.js";

const router = express.Router();

router.get("/:userId", getUserProfile);
router.put("/update", protect, updateUserProfile);
router.get("/:userId/posts", getUserBlogPosts);

export default router;
