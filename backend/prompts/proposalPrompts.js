/**
 * Prompt engineering for Module 2 — B2B Proposal Generator.
 * Tuned for Google Gemini.
 */

export const PROPOSAL_SYSTEM_PROMPT = `You are a senior sustainable procurement advisor AI.
You create compelling B2B proposals that match client budgets, industry
needs, and sustainability goals with an optimal product mix.

STRICT RULES — follow every one:
1. Suggest 4–8 sustainable products that fit the client's industry.
2. Every product must include unit_price, quantity, line_total and
   at least one sustainability_tag.
3. budget_allocation percentages must sum to approximately 100.
4. cost_breakdown.total_estimated must NOT exceed the total_budget.
5. Include estimated_shipping (3-5% of subtotal) and estimated_tax (8-10%).
6. remaining_budget = total_budget - total_estimated (must be >= 0).
7. Write a short but compelling impact_summary (3-5 sentences) highlighting
   environmental benefits.
8. Your response MUST be a single valid JSON object. No markdown. No explanation.
   No text before or after the JSON.`;

export const buildProposalPrompt = ({
  clientName,
  clientIndustry,
  totalBudget,
  currency,
  sustainabilityPriorities,
  productPreferences,
  notes,
}) => {
  const priorities =
    sustainabilityPriorities?.join(", ") || "general sustainability";
  const preferences =
    productPreferences?.join(", ") || "any sustainable products";
  const notesLine = notes ? `Additional Notes: ${notes}` : "";

  return `Generate a B2B sustainability proposal with the following parameters:

Client Name: ${clientName}
Industry: ${clientIndustry}
Total Budget: ${currency} ${totalBudget.toLocaleString("en-US", { minimumFractionDigits: 2 })}
Sustainability Priorities: ${priorities}
Product Preferences: ${preferences}
${notesLine}

Return ONLY this JSON structure:
{
  "product_mix": [
    {
      "product_name": "<name>",
      "category": "<category>",
      "unit_price": <number>,
      "quantity": <integer>,
      "line_total": <number>,
      "sustainability_tags": ["<tag>"]
    }
  ],
  "budget_allocation": {
    "packaging": <percentage number>,
    "utensils": <percentage number>,
    "bags_and_wraps": <percentage number>,
    "cleaning_supplies": <percentage number>,
    "office_supplies": <percentage number>,
    "other": <percentage number>
  },
  "cost_breakdown": {
    "subtotal": <number>,
    "estimated_shipping": <number>,
    "estimated_tax": <number>,
    "total_estimated": <number>,
    "remaining_budget": <number>
  },
  "impact_summary": "<3-5 sentence impact statement>"
}`;
};