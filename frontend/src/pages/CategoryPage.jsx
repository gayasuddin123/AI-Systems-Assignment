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
        `Categorized as "${data.data.primaryCategory}" with ${(
          data.data.confidenceScore * 100
        ).toFixed(0)}% confidence`
      );
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to categorize product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Description */}
      <div className="card bg-green-50 border-green-200">
        <h3 className="font-semibold text-green-800 mb-1">Module 1</h3>
        <p className="text-sm text-green-700">
          Enter a product name and description. AI will auto-assign a primary
          category, suggest a sub-category, generate 5-10 SEO tags, and
          evaluate sustainability filters — all returned as structured JSON.
        </p>
      </div>

      {/* Form */}
      <CategoryForm onSubmit={handleSubmit} isLoading={loading} />

      {/* Loading */}
      {loading && (
        <LoadingSpinner text="AI is analyzing your product... This may take a few seconds." />
      )}

      {/* Error */}
      {error && <ErrorAlert message={error} onRetry={() => setError(null)} />}

      {/* Result */}
      {result && <CategoryResult result={result} />}

      {/* History */}
      <CategoryHistory refreshKey={historyRefresh} />
    </div>
  );
}

export default CategoryPage;