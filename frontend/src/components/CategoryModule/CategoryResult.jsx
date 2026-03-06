import SustainabilityFilters from "./SustainabilityFilters";
import JsonViewer from "../common/JsonViewer";

function CategoryResult({ result }) {
  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card border-l-4 border-l-primary-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Categorization Result
          </h3>
          <span className="badge-green">
            Confidence: {(result.confidenceScore * 100).toFixed(0)}%
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Product: <strong>{result.productName}</strong>
        </p>
      </div>

      {/* Category Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h4 className="text-sm font-medium text-gray-500 mb-1">
            Primary Category
          </h4>
          <p className="text-xl font-bold text-primary-700">
            {result.primaryCategory}
          </p>
        </div>
        <div className="card">
          <h4 className="text-sm font-medium text-gray-500 mb-1">
            Sub-Category
          </h4>
          <p className="text-xl font-bold text-earth-600">
            {result.subCategory}
          </p>
        </div>
      </div>

      {/* SEO Tags */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-3">
          SEO Tags ({result.seoTags?.length || 0})
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.seoTags?.map((tag, i) => (
            <span key={i} className="badge-blue">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Sustainability Filters */}
      <SustainabilityFilters filters={result.sustainabilityFilters} />

      {/* JSON Output */}
      <JsonViewer data={result} title="Structured JSON Output" />
    </div>
  );
}

export default CategoryResult;