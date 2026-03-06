/**
 * Module 2 — AI B2B Proposal Generator
 * Service orchestrator for creating comprehensive sustainable B2B proposals.
 */

import B2BProposal from "../models/B2BProposal.js";
import { callAI } from "./aiClient.js";
import {
  PROPOSAL_SYSTEM_PROMPT,
  buildProposalPrompt,
} from "../prompts/proposalPrompts.js";
import {
  validateProposalBudget,
  normalizeBudgetAllocation,
} from "../businessLogic/proposalRules.js";
import logger from "../utils/logger.js";

/**
 * Full pipeline:
 * 1. Build prompt
 * 2. Call AI
 * 3. Apply budget validation business rules
 * 4. Persist to MongoDB
 * 5. Return structured response
 */
export const generateProposal = async (proposalData) => {
  // 1. Build prompt
  const userPrompt = buildProposalPrompt(proposalData);

  // 2. Call AI
  const raw = await callAI({
    module: "proposal",
    systemPrompt: PROPOSAL_SYSTEM_PROMPT,
    userPrompt,
  });

  logger.info(
    `Raw AI proposal for client="${proposalData.clientName}" budget=${proposalData.totalBudget}`
  );

  // 3. Business-rule validation
  const rawMix = raw.product_mix || [];
  const rawCost = raw.cost_breakdown || {};

  const { correctedMix, correctedCost } = validateProposalBudget(
    rawMix,
    rawCost,
    proposalData.totalBudget
  );

  const budgetAllocation = normalizeBudgetAllocation(
    raw.budget_allocation || {}
  );

  const impactSummary =
    raw.impact_summary ||
    "This proposal supports your sustainability transition.";

  // 4. Persist to MongoDB
  const record = await B2BProposal.create({
    clientName: proposalData.clientName,
    clientIndustry: proposalData.clientIndustry,
    totalBudget: proposalData.totalBudget,
    currency: proposalData.currency || "USD",
    sustainabilityPriorities: proposalData.sustainabilityPriorities || [],
    productPreferences: proposalData.productPreferences || [],
    notes: proposalData.notes || null,
    productMix: correctedMix,
    budgetAllocation,
    costBreakdown: correctedCost,
    impactSummary,
    rawAiResponse: raw,
  });

  logger.info(
    `Saved proposal id=${record._id} for client="${proposalData.clientName}"`
  );

  // 5. Return structured response
  return {
    recordId: record._id,
    clientName: proposalData.clientName,
    clientIndustry: proposalData.clientIndustry,
    totalBudget: proposalData.totalBudget,
    currency: proposalData.currency || "USD",
    productMix: correctedMix,
    budgetAllocation,
    costBreakdown: correctedCost,
    impactSummary,
    createdAt: record.createdAt,
  };
};

/**
 * Retrieve all proposals.
 */
export const getProposals = async (limit = 50, skip = 0) => {
  return B2BProposal.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .select("-rawAiResponse");
};

/**
 * Retrieve single proposal by ID.
 */
export const getProposalById = async (id) => {
  return B2BProposal.findById(id);
};