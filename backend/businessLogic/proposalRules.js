/**
 * Deterministic business rules for B2B proposals.
 */

/**
 * Ensures line_totals are mathematically correct and
 * total doesn't exceed budget. Adjusts quantities downward if needed.
 */
export const validateProposalBudget = (productMix, costBreakdown, totalBudget) => {
  const correctedMix = [];
  let runningSubtotal = 0;

  for (const item of productMix) {
    let unitPrice = Math.round(parseFloat(item.unit_price || 0) * 100) / 100;
    let quantity = parseInt(item.quantity || 1);
    let correctLine = Math.round(unitPrice * quantity * 100) / 100;

    // Leave room for tax + shipping (85% for products)
    const maxBudgetForProducts = totalBudget * 0.85;

    while (
      correctLine + runningSubtotal > maxBudgetForProducts &&
      quantity > 1
    ) {
      quantity -= 1;
      correctLine = Math.round(unitPrice * quantity * 100) / 100;
    }

    correctedMix.push({
      productName: item.product_name || "Sustainable Product",
      category: item.category || "General",
      unitPrice,
      quantity,
      lineTotal: correctLine,
      sustainabilityTags: item.sustainability_tags || ["sustainable"],
    });

    runningSubtotal += correctLine;
  }

  // Recalculate cost breakdown
  const subtotal = Math.round(runningSubtotal * 100) / 100;
  const estimatedShipping = Math.round(subtotal * 0.04 * 100) / 100;
  const estimatedTax = Math.round(subtotal * 0.09 * 100) / 100;
  const totalEstimated =
    Math.round((subtotal + estimatedShipping + estimatedTax) * 100) / 100;
  const remainingBudget = Math.max(
    Math.round((totalBudget - totalEstimated) * 100) / 100,
    0
  );

  const correctedCost = {
    subtotal,
    estimatedShipping,
    estimatedTax,
    totalEstimated,
    remainingBudget,
  };

  return { correctedMix, correctedCost };
};

/**
 * Normalize budget allocation from AI (snake_case → camelCase).
 */
export const normalizeBudgetAllocation = (raw) => {
  return {
    packaging: parseFloat(raw?.packaging || 0),
    utensils: parseFloat(raw?.utensils || 0),
    bagsAndWraps: parseFloat(raw?.bags_and_wraps || 0),
    cleaningSupplies: parseFloat(raw?.cleaning_supplies || 0),
    officeSupplies: parseFloat(raw?.office_supplies || 0),
    other: parseFloat(raw?.other || 0),
  };
};