import { HiOutlineChartBar } from "react-icons/hi";

function ImpactPlaceholder() {
  return (
    <div className="card text-center py-10 sm:py-16">
      <HiOutlineChartBar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
      <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
        Impact Reporting Module
      </h3>
      <p className="text-gray-400 max-w-md mx-auto mb-4 sm:mb-6 text-sm sm:text-base px-4">
        This module will generate environmental impact reports per order — plastic saved, carbon avoided, and local sourcing metrics.
      </p>

      <div className="max-w-lg mx-auto text-left px-4">
        <h4 className="font-medium text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">Planned Features:</h4>
        <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
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
            AI-generated human-readable impact statement
          </li>
        </ul>
      </div>

      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg max-w-md mx-auto mx-4 sm:mx-auto">
        <p className="text-xs text-gray-500 font-mono break-all">
          POST /api/v1/impact/generate
        </p>
      </div>
    </div>
  );
}

export default ImpactPlaceholder;