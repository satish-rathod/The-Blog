// routes/commentRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  likeComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", protect, createComment);
router.get("/post/:blogPostId", getCommentsByPost);
router.put("/:id", protect, updateComment);
router.delete("/:id", protect, deleteComment);
router.post("/:id/like", protect, likeComment);

export default router;
