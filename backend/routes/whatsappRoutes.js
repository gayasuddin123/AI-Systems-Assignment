import express from "express";
import { webhook, getLogs } from "../controllers/whatsappController.js";

const router = express.Router();

router.post("/webhook", webhook);
router.get("/logs", getLogs);

export default router;