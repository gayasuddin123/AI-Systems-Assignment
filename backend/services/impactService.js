/**
 * Module 3 — AI Impact Reporting Generator
 * STATUS: Architecture outline — not yet fully implemented.
 *
 * ┌───────────────────────────────────────────────────────────────┐
 * │                     ARCHITECTURE OVERVIEW                     │
 * ├───────────────────────────────────────────────────────────────┤
 * │                                                               │
 * │  Input:  Order ID or list of products with quantities         │
 * │                                                               │
 * │  Pipeline:                                                    │
 * │    1. Fetch order products from MongoDB (orders collection)   │
 * │    2. For each product, look up pre-defined impact factors:   │
 * │       - plastic_weight_saved_grams (per unit)                 │
 * │       - carbon_avoided_kg (per unit)                          │
 * │       - is_locally_sourced (bool)                             │
 * │    3. Aggregate impact metrics across all items:              │
 * │       - total_plastic_saved_kg                                │
 * │       - total_carbon_avoided_kg                               │
 * │       - local_sourcing_percentage                             │
 * │    4. Pass aggregated data to AI for human-readable summary   │
 * │    5. Store ImpactReport document linked to order             │
 * │    6. Return structured JSON                                  │
 * │                                                               │
 * │  Business Logic (deterministic — NOT AI):                     │
 * │    - Plastic saved = Σ(unit_plastic_weight × qty) / 1000     │
 * │    - Carbon avoided = Σ(unit_carbon_factor × qty)             │
 * │    - Local sourcing = count(local items) / total × 100        │
 * │                                                               │
 * │  AI Role (generative — human-readable only):                  │
 * │    - Takes the numeric aggregates                             │
 * │    - Produces a 3–5 sentence impact statement                 │
 * │    - Adds relatable comparisons ("equivalent to X trees")     │
 * │                                                               │
 * │  Error Handling:                                              │
 * │    - Order not found → 404                                    │
 * │    - Missing impact factors → use defaults + warning          │
 * │    - AI failure → return numeric data without narrative       │
 * │                                                               │
 * └───────────────────────────────────────────────────────────────┘
 */

// ── Impact factor defaults ────────────────────
const DEFAULT_PLASTIC_WEIGHT_GRAMS = 15.0;
const DEFAULT_CARBON_FACTOR_KG = 0.5;

export const calculatePlasticSaved = (products) => {
  const totalGrams = products.reduce(
    (sum, p) =>
      sum +
      (p.plasticWeightGrams || DEFAULT_PLASTIC_WEIGHT_GRAMS) *
        (p.quantity || 1),
    0
  );
  return Math.round((totalGrams / 1000) * 1000) / 1000;
};

export const calculateCarbonAvoided = (products) => {
  return (
    Math.round(
      products.reduce(
        (sum, p) =>
          sum +
          (p.carbonFactorKg || DEFAULT_CARBON_FACTOR_KG) * (p.quantity || 1),
        0
      ) * 1000
    ) / 1000
  );
};

export const calculateLocalSourcingPct = (products) => {
  if (!products.length) return 0;
  const localCount = products.filter((p) => p.isLocallySourced).length;
  return Math.round((localCount / products.length) * 100 * 10) / 10;
};

export const generateImpactReport = async (orderId) => {
  throw new Error(
    "Module 3 is architecture-outlined, not yet implemented."
  );
};