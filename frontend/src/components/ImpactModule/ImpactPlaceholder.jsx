import { HiOutlineChartBar } from "react-icons/hi";

function ImpactPlaceholder() {
  return (
    <div className="card text-center py-16">
      <HiOutlineChartBar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        Impact Reporting Module
      </h3>
      <p className="text-gray-400 max-w-md mx-auto mb-6">
        This module will generate environmental impact reports per order —
        plastic saved, carbon avoided, and local sourcing metrics.
      </p>

      <div className="max-w-lg mx-auto text-left">
        <h4 className="font-medium text-gray-700 mb-3">Planned Features:</h4>
        <ul className="space-y-2 text-sm text-gray-500">
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-0.5">●</span>
            Estimated plastic saved (kg) with bottle equivalents
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-0.5">●</span>
            Carbon avoided (kg CO₂) with tree-equivalent comparisons
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-0.5">●</span>
            Local sourcing impact summary
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-0.5">●</span>
            Human-readable AI-generated impact statement per order
          </li>
        </ul>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
        <p className="text-xs text-gray-500 font-mono">
          Planned API: POST /api/v1/impact/generate
        </p>
      </div>
    </div>
  );
}

export default ImpactPlaceholder;