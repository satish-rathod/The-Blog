// routes/categoryRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.post("/", protect, admin, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
