import { useState } from "react";
import toast from "react-hot-toast";
import CategoryForm from "../components/CategoryModule/CategoryForm";
import CategoryResult from "../components/CategoryModule/CategoryResult";
import CategoryHistory from "../components/CategoryModule/CategoryHistory";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorAlert from "../components/common/ErrorAlert";
import { categoryAPI } from "../api/apiClient";

function CategoryPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data } = await categoryAPI.categorize(formData);
      setResult(data.data);
      setHistoryRefresh((k) => k + 1);
      toast.success(
        `Categorized as "${data.data.primaryCategory}" — ${(data.data.confidenceScore * 100).toFixed(0)}%`
      );
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0]?.message || "Failed to categorize.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl mx-auto">
      <div className="card bg-green-50 border-green-200">
        <h3 className="font-semibold text-green-800 mb-1 text-sm sm:text-base">Module 1</h3>
        <p className="text-xs sm:text-sm text-green-700">
          Enter a product name and description. AI will auto-assign category, sub-category, 
          SEO tags, and sustainability filters — all as structured JSON.
        </p>
      </div>

      <CategoryForm onSubmit={handleSubmit} isLoading={loading} />

      {loading && <LoadingSpinner text="AI is analyzing your product..." />}
      {error && <ErrorAlert message={error} onRetry={() => setError(null)} />}
      {result && <CategoryResult result={result} />}

      <CategoryHistory refreshKey={historyRefresh} />
    </div>
  );
}

export default CategoryPage;