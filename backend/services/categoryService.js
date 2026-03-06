/**
 * Module 1 — AI Auto-Category & Tag Generator
 * Service orchestrator: prompt → AI → business rules → persist → respond
 */

import ProductCategorization from "../models/ProductCategorization.js";
import { callAI, AIClientError } from "./aiClient.js";
import {
  CATEGORY_SYSTEM_PROMPT,
  buildCategoryPrompt,
} from "../prompts/categoryPrompts.js";
import {
  validateCategory,
  enrichTags,
  normalizeFilterKeys,
  inferSustainabilityFromMaterial,
} from "../businessLogic/categoryRules.js";
import { clamp } from "../utils/helpers.js";
import logger from "../utils/logger.js";

/**
 * Full pipeline:
 * 1. Build prompt
 * 2. Call AI
 * 3. Apply business rules
 * 4. Persist to MongoDB
 * 5. Return structured response
 */
export const generateCategorization = async (productData) => {
  // 1. Build prompt
  const userPrompt = buildCategoryPrompt(productData);

  // 2. Call AI
  const raw = await callAI({
    module: "category",
    systemPrompt: CATEGORY_SYSTEM_PROMPT,
    userPrompt,
  });

  logger.info(`Raw AI categorization for "${productData.productName}":`, {
    primaryCategory: raw.primary_category,
    confidence: raw.confidence_score,
  });

  // 3. Business rules
  const primaryCategory = validateCategory(raw.primary_category || "");
  const subCategory = raw.sub_category || "General";

  const seoTags = enrichTags(
    raw.seo_tags || [],
    productData.productName,
    productData.material
  );

  let filters = normalizeFilterKeys(raw.sustainability_filters || {});
  filters = inferSustainabilityFromMaterial(productData.material, filters);

  const confidenceScore = clamp(
    parseFloat(raw.confidence_score || 0.75),
    0,
    1
  );

  // 4. Persist to MongoDB
  const record = await ProductCategorization.create({
    productName: productData.productName,
    productDescription: productData.productDescription,
    material: productData.material || null,
    brand: productData.brand || null,
    primaryCategory,
    subCategory,
    seoTags,
    sustainabilityFilters: filters,
    confidenceScore,
    rawAiResponse: raw,
  });

  logger.info(
    `Saved categorization id=${record._id} for "${productData.productName}"`
  );

  // 5. Return structured response
  return {
    recordId: record._id,
    productName: productData.productName,
    primaryCategory,
    subCategory,
    seoTags,
    sustainabilityFilters: filters,
    confidenceScore,
    createdAt: record.createdAt,
  };
};

/**
 * Retrieve all categorization history.
 */
export const getCategorizations = async (limit = 50, skip = 0) => {
  return ProductCategorization.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .select("-rawAiResponse");
};

/**
 * Retrieve single categorization by ID.
 */
export const getCategorizationById = async (id) => {
  return ProductCategorization.findById(id);
};