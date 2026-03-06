import ProductMixTable from "./ProductMixTable";
import BudgetChart from "./BudgetChart";
import CostBreakdown from "./CostBreakdown";
import JsonViewer from "../common/JsonViewer";

function ProposalResult({ result }) {
  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card border-l-4 border-l-blue-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Proposal Generated
          </h3>
          <span className="badge-green">
            ID: {result.recordId?.slice(-8)}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Client: <strong>{result.clientName}</strong> | Industry:{" "}
          <strong>{result.clientIndustry}</strong> | Budget:{" "}
          <strong>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: result.currency,
            }).format(result.totalBudget)}
          </strong>
        </p>
      </div>

      {/* Impact Summary */}
      <div className="card bg-gradient-to-r from-primary-50 to-green-50 border-primary-200">
        <h3 className="font-semibold text-primary-800 mb-2">
          🌿 Impact Positioning
        </h3>
        <p className="text-primary-700 leading-relaxed">
          {result.impactSummary}
        </p>
      </div>

      {/* Product Mix */}
      <ProductMixTable
        products={result.productMix}
        currency={result.currency}
      />

      {/* Charts & Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetChart allocation={result.budgetAllocation} />
        <CostBreakdown
          costs={result.costBreakdown}
          currency={result.currency}
        />
      </div>

      {/* JSON */}
      <JsonViewer data={result} title="Structured JSON Output" />
    </div>
  );
}

export default ProposalResult;