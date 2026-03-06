/**
 * Prompt engineering for Module 1 — Category & Tag Generator.
 * Tuned for Google Gemini.
 */

export const PREDEFINED_CATEGORIES = [
  "Personal Care",
  "Kitchen & Dining",
  "Packaging & Wrapping",
  "Cleaning Supplies",
  "Office & Stationery",
  "Bags & Totes",
  "Home & Living",
  "Fashion & Accessories",
  "Health & Wellness",
  "Baby & Kids",
  "Pet Supplies",
  "Garden & Outdoor",
  "Food & Beverages",
  "Travel & On-the-Go",
];

export const SUSTAINABILITY_FILTER_OPTIONS = [
  "plastic_free",
  "compostable",
  "vegan",
  "recycled",
  "biodegradable",
  "organic",
  "fair_trade",
  "zero_waste",
  "locally_sourced",
  "carbon_neutral",
];

export const CATEGORY_SYSTEM_PROMPT = `You are an expert sustainable product cataloging AI.
You categorize eco-friendly products accurately, generate high-quality
SEO tags, and identify applicable sustainability certifications and filters.

STRICT RULES — follow every one:
1. The primary_category MUST be exactly one of the predefined categories provided.
2. The sub_category should be a specific niche within that primary category.
3. Generate between 5 and 10 SEO-optimized tags relevant to the product.
4. Evaluate each sustainability filter honestly — only mark true if the
   product description strongly supports it.
5. Provide a confidence_score between 0.0 and 1.0 for your categorization.
6. Your response MUST be a single valid JSON object. No markdown. No explanation.
   No text before or after the JSON.`;

export const buildCategoryPrompt = ({
  productName,
  productDescription,
  material,
  brand,
  additionalAttributes,
}) => {
  const materialLine = material ? `Material(s): ${material}` : "";
  const brandLine = brand ? `Brand: ${brand}` : "";
  const extraLine = additionalAttributes
    ? `Additional attributes: ${JSON.stringify(additionalAttributes)}`
    : "";

  const categoryList = PREDEFINED_CATEGORIES.map((c) => `  - ${c}`).join("\n");
  const filterList = SUSTAINABILITY_FILTER_OPTIONS.map(
    (f) => `  - ${f}`
  ).join("\n");

  return `Categorize the following sustainable product.

Product Name: ${productName}
Description: ${productDescription}
${materialLine}
${brandLine}
${extraLine}

PREDEFINED CATEGORIES (you MUST pick exactly one):
${categoryList}

SUSTAINABILITY FILTERS to evaluate (set each to true or false):
${filterList}

Return ONLY this JSON structure:
{
  "primary_category": "<from list above>",
  "sub_category": "<specific sub-category>",
  "seo_tags": ["tag1", "tag2", "...up to 10 tags"],
  "sustainability_filters": {
    "plastic_free": true or false,
    "compostable": true or false,
    "vegan": true or false,
    "recycled": true or false,
    "biodegradable": true or false,
    "organic": true or false,
    "fair_trade": true or false,
    "zero_waste": true or false,
    "locally_sourced": true or false,
    "carbon_neutral": true or false
  },
  "confidence_score": 0.0 to 1.0
}`;
};