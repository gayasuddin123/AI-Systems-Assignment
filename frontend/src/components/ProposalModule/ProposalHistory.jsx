import { useState, useEffect } from "react";
import { proposalAPI } from "../../api/apiClient";
import LoadingSpinner from "../common/LoadingSpinner";

function ProposalHistory({ refreshKey }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const { data } = await proposalAPI.list(20);
        setHistory(data.data || []);
      } catch {
        /* handled by interceptor */
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [refreshKey]);

  if (loading) return <LoadingSpinner size="sm" text="Loading proposals..." />;

  if (!history.length) {
    return (
      <div className="card text-center py-6 sm:py-8">
        <p className="text-gray-400 text-sm">No proposals yet. Create one above!</p>
      </div>
    );
  }

  const fmt = (val, cur) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: cur || "USD" }).format(val);

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
        Recent Proposals
      </h3>

      {/* ── Mobile Card View ── */}
      <div className="sm:hidden space-y-3">
        {history.map((item) => (
          <div key={item._id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-medium text-gray-800 text-sm flex-1 truncate">
                {item.clientName}
              </p>
              <span className="badge-blue text-xs flex-shrink-0">
                {item.clientIndustry}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Budget: {fmt(item.totalBudget, item.currency)}</span>
              <span>{item.productMix?.length || 0} products</span>
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs">
              <span className="text-gray-500">
                Est: {fmt(item.costBreakdown?.totalEstimated || 0, item.currency)}
              </span>
              <span className="text-gray-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop Table View ── */}
      <div className="hidden sm:block table-responsive">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Client</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Industry</th>
              <th className="text-right py-2 px-3 text-gray-500 font-medium">Budget</th>
              <th className="text-right py-2 px-3 text-gray-500 font-medium">Estimated</th>
              <th className="text-center py-2 px-3 text-gray-500 font-medium">Products</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2.5 px-3 font-medium text-gray-800">{item.clientName}</td>
                <td className="py-2.5 px-3">
                  <span className="badge-blue">{item.clientIndustry}</span>
                </td>
                <td className="py-2.5 px-3 text-right text-gray-600">
                  {fmt(item.totalBudget, item.currency)}
                </td>
                <td className="py-2.5 px-3 text-right font-medium text-gray-800">
                  {fmt(item.costBreakdown?.totalEstimated || 0, item.currency)}
                </td>
                <td className="py-2.5 px-3 text-center text-gray-500">
                  {item.productMix?.length || 0}
                </td>
                <td className="py-2.5 px-3 text-gray-400 text-xs">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProposalHistory;