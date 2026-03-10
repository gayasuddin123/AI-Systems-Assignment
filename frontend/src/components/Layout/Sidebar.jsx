import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineTag,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineChatAlt2,
  HiOutlineX,
} from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";

const navItems = [
  { to: "/", icon: HiOutlineHome, label: "Dashboard" },
  { to: "/categorize", icon: HiOutlineTag, label: "Auto-Category" },
  { to: "/proposals", icon: HiOutlineDocumentText, label: "B2B Proposals" },
  {
    to: "/impact",
    icon: HiOutlineChartBar,
    label: "Impact Reports",
    planned: true,
  },
  {
    to: "/whatsapp",
    icon: HiOutlineChatAlt2,
    label: "WhatsApp Bot",
    planned: true,
  },
];

function Sidebar({ isOpen, onClose }) {
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center">
          <FaLeaf className="text-primary-600 text-xl sm:text-2xl mr-2 sm:mr-3" />
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              Sustainable AI
            </h1>
            <p className="text-xs text-gray-500">Platform v1.0</p>
          </div>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close sidebar"
        >
          <HiOutlineX className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 sm:py-4 px-2 sm:px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, planned }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="truncate">{label}</span>
            {planned && (
              <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0">
                Planned
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-gray-200 flex-shrink-0">
        <div className="bg-primary-50 rounded-lg p-2.5 sm:p-3">
          <p className="text-xs text-primary-700 font-medium">
            🌿 Building a greener future
          </p>
          <p className="text-xs text-primary-600 mt-1">
            AI-powered sustainability
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar (always visible on lg+) ── */}
      <aside className="hidden lg:flex lg:w-64 bg-white border-r border-gray-200 flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* ── Mobile/Tablet Sidebar (drawer overlay) ── */}
      {isOpen && (
        <>
          {/* Dark backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden sidebar-overlay"
            onClick={onClose}
          />
          {/* Slide-in drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden sidebar-slide">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}

export default Sidebar;