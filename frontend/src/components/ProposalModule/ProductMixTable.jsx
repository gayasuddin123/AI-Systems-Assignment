function ProductMixTable({ products, currency = "USD" }) {
  if (!products?.length) return null;

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(val);

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
        Recommended Product Mix ({products.length} items)
      </h3>

      {/* ── Mobile Card View ── */}
      <div className="sm:hidden space-y-3">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-medium text-gray-800 text-sm flex-1">
                {product.productName}
              </p>
              <p className="font-semibold text-gray-900 text-sm flex-shrink-0">
                {formatCurrency(product.lineTotal)}
              </p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-green text-xs">{product.category}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {formatCurrency(product.unitPrice)} × {product.quantity}
              </span>
              <div className="flex gap-1">
                {product.sustainabilityTags?.slice(0, 2).map((tag, i) => (
                  <span key={i} className="badge-blue text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop Table View ── */}
      <div className="hidden sm:block table-responsive">
        <table className="w-full text-sm min-w-[650px]">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Product</th>
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Category</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">Unit Price</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">Qty</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">Line Total</th>
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Tags</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-3 font-medium text-gray-800">{product.productName}</td>
                <td className="py-3 px-3">
                  <span className="badge-green">{product.category}</span>
                </td>
                <td className="py-3 px-3 text-right text-gray-600">{formatCurrency(product.unitPrice)}</td>
                <td className="py-3 px-3 text-right text-gray-600">{product.quantity}</td>
                <td className="py-3 px-3 text-right font-semibold text-gray-800">{formatCurrency(product.lineTotal)}</td>
                <td className="py-3 px-3">
                  <div className="flex flex-wrap gap-1">
                    {product.sustainabilityTags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="badge-blue text-xs">{tag}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductMixTable;