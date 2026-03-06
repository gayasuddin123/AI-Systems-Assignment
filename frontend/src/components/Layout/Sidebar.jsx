import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineTag,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineChatAlt2,
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

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <FaLeaf className="text-primary-600 text-2xl mr-3" />
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">
            Sustainable AI
          </h1>
          <p className="text-xs text-gray-500">Platform v1.0</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label, planned }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>{label}</span>
            {planned && (
              <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                Planned
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-primary-50 rounded-lg p-3">
          <p className="text-xs text-primary-700 font-medium">
            🌿 Building a greener future
          </p>
          <p className="text-xs text-primary-600 mt-1">
            AI-powered sustainability
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;