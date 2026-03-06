import { useState } from "react";
import toast from "react-hot-toast";
import ProposalForm from "../components/ProposalModule/ProposalForm";
import ProposalResult from "../components/ProposalModule/ProposalResult";
import ProposalHistory from "../components/ProposalModule/ProposalHistory";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorAlert from "../components/common/ErrorAlert";
import { proposalAPI } from "../api/apiClient";

function ProposalPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data } = await proposalAPI.create(formData);
      setResult(data.data);
      setHistoryRefresh((k) => k + 1);
      toast.success(
        `Proposal generated for ${data.data.clientName} with ${data.data.productMix?.length} products`
      );
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to generate proposal."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Description */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-1">Module 2</h3>
        <p className="text-sm text-blue-700">
          Provide client details, budget, and sustainability priorities. AI will
          generate a complete proposal with product mix, budget allocation,
          cost breakdown, and an impact positioning statement.
        </p>
      </div>

      {/* Form */}
      <ProposalForm onSubmit={handleSubmit} isLoading={loading} />

      {/* Loading */}
      {loading && (
        <LoadingSpinner text="AI is building your proposal... This may take 10-15 seconds." />
      )}

      {/* Error */}
      {error && <ErrorAlert message={error} onRetry={() => setError(null)} />}

      {/* Result */}
      {result && <ProposalResult result={result} />}

      {/* History */}
      <ProposalHistory refreshKey={historyRefresh} />
    </div>
  );
}

export default ProposalPage;