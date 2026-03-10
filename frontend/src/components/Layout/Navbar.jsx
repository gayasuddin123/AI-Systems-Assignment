import { useLocation } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const pageTitles = {
  "/": "Dashboard",
  "/categorize": "Auto-Category & Tags",
  "/proposals": "B2B Proposals",
  "/impact": "Impact Reporting",
  "/whatsapp": "WhatsApp Bot",
};

function Navbar({ onMenuClick }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Sustainable AI";

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 md:px-6 flex-shrink-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Hamburger menu — visible on mobile/tablet */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Open menu"
        >
          <HiOutlineMenuAlt2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </button>

        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Date — hidden on small mobile */}
        <span className="hidden sm:block text-xs md:text-sm text-gray-500 truncate">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-primary-700 font-semibold text-xs sm:text-sm">
            AI
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;