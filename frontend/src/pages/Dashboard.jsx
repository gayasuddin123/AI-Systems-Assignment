import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { healthAPI } from "../api/apiClient";
import {
  HiOutlineTag,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineChatAlt2,
  HiOutlineStatusOnline,
} from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";

const modules = [
  {
    title: "Auto-Category & Tags",
    description:
      "AI-powered product categorization with SEO tags and sustainability filters.",
    icon: HiOutlineTag,
    path: "/categorize",
    color: "bg-green-500",
    active: true,
  },
  {
    title: "B2B Proposal Generator",
    description:
      "Generate complete B2B sustainability proposals with product mix and budgets.",
    icon: HiOutlineDocumentText,
    path: "/proposals",
    color: "bg-blue-500",
    active: true,
  },
  {
    title: "Impact Reporting",
    description:
      "Environmental impact reports — plastic saved, carbon avoided, local sourcing.",
    icon: HiOutlineChartBar,
    path: "/impact",
    color: "bg-amber-500",
    active: false,
  },
  {
    title: "WhatsApp Support Bot",
    description:
      "AI customer support via WhatsApp with order tracking and smart escalation.",
    icon: HiOutlineChatAlt2,
    path: "/whatsapp",
    color: "bg-purple-500",
    active: false,
  },
];

function Dashboard() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    healthAPI
      .check()
      .then(({ data }) => setHealth(data))
      .catch(() => setHealth({ status: "error" }));
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="card bg-gradient-to-br from-primary-600 to-green-700 text-white border-none">
        <div className="flex items-center gap-4 mb-4">
          <FaLeaf className="text-4xl text-green-200" />
          <div>
            <h1 className="text-2xl font-bold">Sustainable AI Platform</h1>
            <p className="text-green-100 mt-1">
              AI-powered modules for sustainable business operations
            </p>
          </div>
        </div>

        {/* Health Status */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-green-500/30">
          <HiOutlineStatusOnline
            className={`w-5 h-5 ${
              health?.status === "healthy"
                ? "text-green-300"
                : "text-red-300"
            }`}
          />
          <span className="text-sm text-green-100">
            System:{" "}
            <strong className="text-white">
              {health?.status || "Checking..."}
            </strong>
          </span>
          {health?.environment && (
            <span className="text-xs bg-green-500/30 px-2 py-0.5 rounded-full ml-2">
              {health.environment}
            </span>
          )}
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <Link
            key={mod.path}
            to={mod.path}
            className="card hover:shadow-md transition-shadow duration-200 group"
          >
            <div className="flex items-start gap-4">
              <div
                className={`${mod.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
              >
                <mod.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary-700 transition-colors">
                    {mod.title}
                  </h3>
                  {mod.active ? (
                    <span className="badge-green text-xs">Active</span>
                  ) : (
                    <span className="badge-amber text-xs">Planned</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{mod.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Architecture Summary */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4">
          Technical Architecture
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Backend", tech: "Node.js + Express" },
            { label: "Database", tech: "MongoDB + Mongoose" },
            { label: "AI Engine", tech: "OpenAI GPT-4o" },
            { label: "Frontend", tech: "React + Tailwind" },
          ].map(({ label, tech }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {label}
              </p>
              <p className="text-sm font-medium text-gray-700 mt-1">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;