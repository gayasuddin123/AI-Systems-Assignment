import express from "express";
import {
  categorizeProduct,
  categorizeProductsBatch,
  getHistory,
  getById,
} from "../controllers/categoryController.js";
import { validateCategoryRequest } from "../middleware/validator.js";

const router = express.Router();

router.post("/", validateCategoryRequest, categorizeProduct);
router.post("/batch", categorizeProductsBatch);
router.get("/history", getHistory);
router.get("/:id", getById);

export default router;