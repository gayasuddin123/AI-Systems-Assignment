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
      <div className="card text-center py-8">
        <p className="text-gray-400">No proposals yet. Create one above!</p>
      </div>
    );
  }

  const fmt = (val, cur) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur || "USD",
    }).format(val);

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Proposals</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
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
                <td className="py-2.5 px-3 font-medium text-gray-800">
                  {item.clientName}
                </td>
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