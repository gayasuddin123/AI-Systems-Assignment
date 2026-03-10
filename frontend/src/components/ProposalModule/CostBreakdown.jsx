function CostBreakdown({ costs, currency = "USD" }) {
  if (!costs) return null;

  const fmt = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(val);

  const rows = [
    { label: "Subtotal", value: costs.subtotal, bold: false },
    { label: "Est. Shipping", value: costs.estimatedShipping, bold: false },
    { label: "Est. Tax", value: costs.estimatedTax, bold: false },
    { label: "Total Estimated", value: costs.totalEstimated, bold: true },
    { label: "Remaining Budget", value: costs.remainingBudget, bold: true, green: true },
  ];

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
        Cost Breakdown
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {rows.map(({ label, value, bold, green }, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center py-1.5 sm:py-2 ${
              bold ? "border-t-2 border-gray-200 pt-2 sm:pt-3" : ""
            }`}
          >
            <span
              className={`text-sm ${
                bold ? "font-semibold text-gray-800" : "text-gray-600"
              }`}
            >
              {label}
            </span>
            <span
              className={`font-mono text-sm ${
                bold
                  ? green
                    ? "sm:text-lg font-bold text-green-600"
                    : "sm:text-lg font-bold text-gray-900"
                  : "text-gray-700"
              }`}
            >
              {fmt(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CostBreakdown;