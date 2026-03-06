function ProductMixTable({ products, currency = "USD" }) {
  if (!products?.length) return null;

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(val);

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-4">
        Recommended Product Mix ({products.length} items)
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-3 text-gray-500 font-medium">
                Product
              </th>
              <th className="text-left py-3 px-3 text-gray-500 font-medium">
                Category
              </th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">
                Unit Price
              </th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">
                Qty
              </th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">
                Line Total
              </th>
              <th className="text-left py-3 px-3 text-gray-500 font-medium">
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-3 font-medium text-gray-800">
                  {product.productName}
                </td>
                <td className="py-3 px-3">
                  <span className="badge-green">{product.category}</span>
                </td>
                <td className="py-3 px-3 text-right text-gray-600">
                  {formatCurrency(product.unitPrice)}
                </td>
                <td className="py-3 px-3 text-right text-gray-600">
                  {product.quantity}
                </td>
                <td className="py-3 px-3 text-right font-semibold text-gray-800">
                  {formatCurrency(product.lineTotal)}
                </td>
                <td className="py-3 px-3">
                  <div className="flex flex-wrap gap-1">
                    {product.sustainabilityTags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="badge-blue text-xs">
                        {tag}
                      </span>
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