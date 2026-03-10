import { useState, useEffect } from "react";
import { categoryAPI } from "../../api/apiClient";
import LoadingSpinner from "../common/LoadingSpinner";

function CategoryHistory({ refreshKey }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const { data } = await categoryAPI.getHistory(20);
        setHistory(data.data || []);
      } catch {
        /* handled by interceptor */
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [refreshKey]);

  if (loading) return <LoadingSpinner size="sm" text="Loading history..." />;

  if (!history.length) {
    return (
      <div className="card text-center py-6 sm:py-8">
        <p className="text-gray-400 text-sm">No categorizations yet. Try one above!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
        Recent Categorizations
      </h3>

      {/* ── Mobile Card View ── */}
      <div className="sm:hidden space-y-3">
        {history.map((item) => (
          <div
            key={item._id}
            className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-medium text-gray-800 text-sm truncate flex-1">
                {item.productName}
              </p>
              <span
                className={`text-xs font-semibold flex-shrink-0 ${
                  item.confidenceScore >= 0.8
                    ? "text-green-600"
                    : item.confidenceScore >= 0.6
                    ? "text-amber-600"
                    : "text-red-600"
                }`}
              >
                {(item.confidenceScore * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="badge-green text-xs">{item.primaryCategory}</span>
              <span className="text-xs text-gray-400">›</span>
              <span className="text-xs text-gray-500">{item.subCategory}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">
                {item.seoTags?.length || 0} tags
              </span>
              <span className="text-xs text-gray-400">
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
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Product</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Category</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Sub-Category</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Confidence</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Tags</th>
              <th className="text-left py-2 px-3 text-gray-500 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2.5 px-3 font-medium text-gray-800 max-w-[200px] truncate">
                  {item.productName}
                </td>
                <td className="py-2.5 px-3">
                  <span className="badge-green">{item.primaryCategory}</span>
                </td>
                <td className="py-2.5 px-3 text-gray-600">{item.subCategory}</td>
                <td className="py-2.5 px-3">
                  <span
                    className={`font-medium ${
                      item.confidenceScore >= 0.8
                        ? "text-green-600"
                        : item.confidenceScore >= 0.6
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {(item.confidenceScore * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="py-2.5 px-3 text-gray-500">{item.seoTags?.length || 0} tags</td>
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

export default CategoryHistory;