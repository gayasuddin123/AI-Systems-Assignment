import express from "express";
import {
  createProposal,
  listProposals,
  getById,
} from "../controllers/proposalController.js";
import { validateProposalRequest } from "../middleware/validator.js";

const router = express.Router();

router.post("/", validateProposalRequest, createProposal);
router.get("/", listProposals);
router.get("/:id", getById);

export default router;