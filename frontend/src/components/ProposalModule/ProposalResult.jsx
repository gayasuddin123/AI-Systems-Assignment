import ProductMixTable from "./ProductMixTable";
import BudgetChart from "./BudgetChart";
import CostBreakdown from "./CostBreakdown";
import JsonViewer from "../common/JsonViewer";

function ProposalResult({ result }) {
  if (!result) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card border-l-4 border-l-blue-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            Proposal Generated
          </h3>
          <span className="badge-green self-start sm:self-auto">
            ID: {result.recordId?.slice(-8)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500">
          <span>
            Client: <strong>{result.clientName}</strong>
          </span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>
            Industry: <strong>{result.clientIndustry}</strong>
          </span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>
            Budget:{" "}
            <strong>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: result.currency,
              }).format(result.totalBudget)}
            </strong>
          </span>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="card bg-gradient-to-r from-primary-50 to-green-50 border-primary-200">
        <h3 className="font-semibold text-primary-800 mb-2 text-sm sm:text-base">
          🌿 Impact Positioning
        </h3>
        <p className="text-primary-700 leading-relaxed text-sm sm:text-base">
          {result.impactSummary}
        </p>
      </div>

      {/* Product Mix */}
      <ProductMixTable products={result.productMix} currency={result.currency} />

      {/* Charts & Costs — stack on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <BudgetChart allocation={result.budgetAllocation} />
        <CostBreakdown costs={result.costBreakdown} currency={result.currency} />
      </div>

      <JsonViewer data={result} title="Structured JSON Output" />
    </div>
  );
}

export default ProposalResult;