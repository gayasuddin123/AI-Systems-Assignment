import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "Dashboard",
  "/categorize": "AI Auto-Category & Tag Generator",
  "/proposals": "AI B2B Proposal Generator",
  "/impact": "AI Impact Reporting",
  "/whatsapp": "AI WhatsApp Support Bot",
};

function Navbar() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Sustainable AI Platform";

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
          <span className="text-primary-700 font-semibold text-sm">AI</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;