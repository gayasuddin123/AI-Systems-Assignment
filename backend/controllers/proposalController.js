import {
  generateProposal,
  getProposals,
  getProposalById,
} from "../services/proposalService.js";
import { AIClientError } from "../services/aiClient.js";
import logger from "../utils/logger.js";

/**
 * POST /api/v1/proposals/
 */
export const createProposal = async (req, res, next) => {
  try {
    const result = await generateProposal(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof AIClientError) {
      logger.error(`AI error during proposal generation: ${error.message}`);
      return res.status(502).json({
        success: false,
        error: `AI service error: ${error.message}`,
      });
    }
    next(error);
  }
};

/**
 * GET /api/v1/proposals/
 */
export const listProposals = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;
    const records = await getProposals(limit, skip);

    res.json({
      success: true,
      data: records,
      pagination: { limit, skip },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/proposals/:id
 */
export const getById = async (req, res, next) => {
  try {
    const record = await getProposalById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        error: "Proposal not found.",
      });
    }

    res.json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};