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
        `Proposal for ${data.data.clientName} — ${data.data.productMix?.length} products`
      );
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0]?.message || "Failed to generate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-6xl mx-auto">
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-1 text-sm sm:text-base">Module 2</h3>
        <p className="text-xs sm:text-sm text-blue-700">
          Provide client details, budget, and sustainability priorities. AI generates a complete proposal 
          with product mix, budget allocation, cost breakdown, and impact statement.
        </p>
      </div>

      <ProposalForm onSubmit={handleSubmit} isLoading={loading} />

      {loading && <LoadingSpinner text="AI is building your proposal... 10-15 seconds." />}
      {error && <ErrorAlert message={error} onRetry={() => setError(null)} />}
      {result && <ProposalResult result={result} />}

      <ProposalHistory refreshKey={historyRefresh} />
    </div>
  );
}

export default ProposalPage;