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
      <div className="card text-center py-8">
        <p className="text-gray-400">No categorizations yet. Try one above!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Categorizations</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
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
                  <span className={`font-medium ${
                    item.confidenceScore >= 0.8 ? "text-green-600" :
                    item.confidenceScore >= 0.6 ? "text-amber-600" : "text-red-600"
                  }`}>
                    {(item.confidenceScore * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="py-2.5 px-3 text-gray-500">
                  {item.seoTags?.length || 0} tags
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

export default CategoryHistory;