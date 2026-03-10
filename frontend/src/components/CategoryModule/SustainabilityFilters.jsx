import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";

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
      <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
        Sustainability Filters
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {Object.entries(filterLabels).map(([key, { label, emoji }]) => {
          const isActive = filters[key];
          return (
            <div
              key={key}
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-colors ${
                isActive
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span className="text-sm sm:text-base">{emoji}</span>
              <span className="text-xs font-medium flex-1 truncate">
                {label}
              </span>
              {isActive ? (
                <HiOutlineCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
              ) : (
                <HiOutlineX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SustainabilityFilters;