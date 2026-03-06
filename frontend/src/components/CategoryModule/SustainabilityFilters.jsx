import {
  HiOutlineCheck,
  HiOutlineX,
} from "react-icons/hi";

const filterLabels = {
  plasticFree: { label: "Plastic-Free", emoji: "🚫" },
  compostable: { label: "Compostable", emoji: "🌱" },
  vegan: { label: "Vegan", emoji: "🌿" },
  recycled: { label: "Recycled", emoji: "♻️" },
  biodegradable: { label: "Biodegradable", emoji: "🍃" },
  organic: { label: "Organic", emoji: "🌾" },
  fairTrade: { label: "Fair Trade", emoji: "🤝" },
  zeroWaste: { label: "Zero Waste", emoji: "✨" },
  locallySourced: { label: "Locally Sourced", emoji: "📍" },
  carbonNeutral: { label: "Carbon Neutral", emoji: "🌍" },
};

function SustainabilityFilters({ filters }) {
  if (!filters) return null;

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-4">
        Sustainability Filters
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.entries(filterLabels).map(([key, { label, emoji }]) => {
          const isActive = filters[key];
          return (
            <div
              key={key}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                isActive
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span className="text-base">{emoji}</span>
              <span className="text-xs font-medium flex-1">{label}</span>
              {isActive ? (
                <HiOutlineCheck className="w-4 h-4 text-green-600" />
              ) : (
                <HiOutlineX className="w-4 h-4 text-gray-300" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SustainabilityFilters;