import SustainabilityFilters from "./SustainabilityFilters";
import JsonViewer from "../common/JsonViewer";

function CategoryResult({ result }) {
  if (!result) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card border-l-4 border-l-primary-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            Categorization Result
          </h3>
          <span className="badge-green self-start sm:self-auto">
            Confidence: {(result.confidenceScore * 100).toFixed(0)}%
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Product: <strong>{result.productName}</strong>
        </p>
      </div>

      {/* Category Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="card">
          <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
            Primary Category
          </h4>
          <p className="text-lg sm:text-xl font-bold text-primary-700">
            {result.primaryCategory}
          </p>
        </div>
        <div className="card">
          <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
            Sub-Category
          </h4>
          <p className="text-lg sm:text-xl font-bold text-earth-600">
            {result.subCategory}
          </p>
        </div>
      </div>

      {/* SEO Tags */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
          SEO Tags ({result.seoTags?.length || 0})
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {result.seoTags?.map((tag, i) => (
            <span key={i} className="badge-blue">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <SustainabilityFilters filters={result.sustainabilityFilters} />

      <JsonViewer data={result} title="Structured JSON Output" />
    </div>
  );
}

export default CategoryResult;