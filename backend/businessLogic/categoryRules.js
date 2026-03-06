/**
 * Deterministic business rules applied AFTER AI response.
 * Keeps AI suggestions honest and policy-compliant.
 */

import { PREDEFINED_CATEGORIES } from "../prompts/categoryPrompts.js";

// Pre-compute a lookup map
const VALID_CATEGORIES_MAP = {};
PREDEFINED_CATEGORIES.forEach((c) => {
  VALID_CATEGORIES_MAP[c.toLowerCase()] = c;
});

// Materials that guarantee certain sustainability filters
const MATERIAL_SUSTAINABILITY_MAP = {
  bamboo: ["plasticFree", "biodegradable", "compostable"],
  "organic cotton": ["organic", "biodegradable", "vegan"],
  "recycled paper": ["recycled", "biodegradable"],
  sugarcane: ["compostable", "biodegradable", "plasticFree"],
  cork: ["vegan", "biodegradable", "plasticFree"],
  hemp: ["organic", "biodegradable", "vegan"],
  "stainless steel": ["plasticFree", "zeroWaste"],
  glass: ["plasticFree", "recycled"],
  jute: ["biodegradable", "vegan", "plasticFree"],
  beeswax: ["plasticFree", "biodegradable", "compostable"],
  "soy wax": ["vegan", "biodegradable"],
};

// Map from snake_case (AI output) to camelCase (our DB)
const FILTER_KEY_MAP = {
  plastic_free: "plasticFree",
  compostable: "compostable",
  vegan: "vegan",
  recycled: "recycled",
  biodegradable: "biodegradable",
  organic: "organic",
  fair_trade: "fairTrade",
  zero_waste: "zeroWaste",
  locally_sourced: "locallySourced",
  carbon_neutral: "carbonNeutral",
};

/**
 * Ensure the AI-returned category matches one in the predefined list.
 */
export const validateCategory = (category) => {
  if (!category) return "Home & Living";

  const key = category.trim().toLowerCase();

  // Exact match
  if (VALID_CATEGORIES_MAP[key]) {
    return VALID_CATEGORIES_MAP[key];
  }

  // Substring match
  for (const [validKey, validName] of Object.entries(VALID_CATEGORIES_MAP)) {
    if (key.includes(validKey) || validKey.includes(key)) {
      return validName;
    }
  }

  return "Home & Living"; // safe default
};

/**
 * Add mandatory tags the AI might miss.
 */
export const enrichTags = (seoTags, productName, material) => {
  const normalized = seoTags.map((t) => t.toLowerCase().trim());
  const enriched = [...seoTags];

  const mandatory = ["sustainable", "eco-friendly"];
  for (const tag of mandatory) {
    if (!normalized.includes(tag)) {
      enriched.push(tag);
      normalized.push(tag);
    }
  }

  if (material) {
    const matTag = material.toLowerCase().trim();
    if (!normalized.includes(matTag)) {
      enriched.push(matTag);
    }
  }

  // Cap at 10
  return enriched.slice(0, 10);
};

/**
 * Convert AI's snake_case filter keys to our camelCase format.
 */
export const normalizeFilterKeys = (aiFilters) => {
  const result = {
    plasticFree: false,
    compostable: false,
    vegan: false,
    recycled: false,
    biodegradable: false,
    organic: false,
    fairTrade: false,
    zeroWaste: false,
    locallySourced: false,
    carbonNeutral: false,
  };

  for (const [aiKey, value] of Object.entries(aiFilters)) {
    const camelKey = FILTER_KEY_MAP[aiKey] || aiKey;
    if (camelKey in result) {
      result[camelKey] = Boolean(value);
    }
  }

  return result;
};

/**
 * Override AI filters with deterministic rules when material is known.
 * Only sets filters to True — never downgrades.
 */
export const inferSustainabilityFromMaterial = (material, aiFilters) => {
  if (!material) return aiFilters;

  const result = { ...aiFilters };
  const matLower = material.toLowerCase().trim();

  for (const [matKey, impliedFilters] of Object.entries(
    MATERIAL_SUSTAINABILITY_MAP
  )) {
    if (matLower.includes(matKey)) {
      for (const f of impliedFilters) {
        result[f] = true;
      }
    }
  }

  return result;
};