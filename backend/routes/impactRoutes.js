import express from "express";
import { generateReport } from "../controllers/impactController.js";

const router = express.Router();

router.post("/generate", generateReport);
router.get("/:id", generateReport);

export default router;