import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import ProposalPage from "./pages/ProposalPage";
import ImpactPage from "./pages/ImpactPage";
import WhatsAppPage from "./pages/WhatsAppPage";

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categorize" element={<CategoryPage />} />
            <Route path="/proposals" element={<ProposalPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/whatsapp" element={<WhatsAppPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;