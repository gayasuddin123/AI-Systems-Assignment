import { useState } from "react";
import {
  HiOutlineSparkles,
  HiOutlineBeaker,
  HiOutlineSearch,
} from "react-icons/hi";

const INDUSTRY_OPTIONS = [
  "Hospitality", "Retail", "Healthcare", "Education",
  "Corporate Office", "Food & Beverage", "Events & Conferences",
  "Government", "Non-Profit", "Other",
];

const PRIORITY_OPTIONS = [
  "plastic-free", "compostable", "carbon-neutral", "recycled",
  "vegan", "zero-waste", "locally-sourced", "organic",
];

// ── Keep your existing 20 SAMPLES array exactly as is ──
const SAMPLES = [
  {
    label: "🏨 Hotel Chain — Plastic-Free Switch",
    tag: "Hospitality",
    data: { clientName: "GreenStay Hotels", clientIndustry: "Hospitality", totalBudget: "5000", currency: "USD", sustainabilityPriorities: ["plastic-free", "compostable"], productPreferences: "packaging, utensils, toiletries", notes: "200-room hotel chain transitioning away from single-use plastics in guest rooms and restaurant." },
  },
  {
    label: "🏢 Corporate Office — Zero-Waste",
    tag: "Corporate",
    data: { clientName: "TechForward Inc.", clientIndustry: "Corporate Office", totalBudget: "3000", currency: "USD", sustainabilityPriorities: ["zero-waste", "recycled"], productPreferences: "office supplies, cleaning supplies, bags", notes: "500-person tech office launching zero-waste initiative." },
  },
  {
    label: "🍕 Restaurant Group — Eco Packaging",
    tag: "Food & Beverage",
    data: { clientName: "FreshBite Restaurants", clientIndustry: "Food & Beverage", totalBudget: "8000", currency: "USD", sustainabilityPriorities: ["compostable", "plastic-free", "locally-sourced"], productPreferences: "packaging, utensils, bags", notes: "Chain of 12 fast-casual restaurants. 5000 takeout orders per week." },
  },
  {
    label: "🏥 Hospital — Green Healthcare",
    tag: "Healthcare",
    data: { clientName: "CityHealth Medical Center", clientIndustry: "Healthcare", totalBudget: "12000", currency: "USD", sustainabilityPriorities: ["plastic-free", "recycled", "carbon-neutral"], productPreferences: "cleaning supplies, packaging, office supplies", notes: "300-bed hospital seeking to reduce environmental footprint." },
  },
  {
    label: "🎓 University — Campus Sustainability",
    tag: "Education",
    data: { clientName: "Green Valley University", clientIndustry: "Education", totalBudget: "6500", currency: "USD", sustainabilityPriorities: ["zero-waste", "vegan", "organic"], productPreferences: "utensils, packaging, cleaning supplies, office supplies", notes: "Large campus with 15,000 students." },
  },
  {
    label: "☕ Coffee Chain — Compostable Cups",
    tag: "Food & Beverage",
    data: { clientName: "BeanGreen Coffee Co.", clientIndustry: "Food & Beverage", totalBudget: "15000", currency: "USD", sustainabilityPriorities: ["compostable", "plastic-free", "carbon-neutral"], productPreferences: "packaging, utensils", notes: "Regional coffee chain with 25 locations. 50,000+ cups per week." },
  },
  {
    label: "🏋️ Gym & Fitness — Eco Supplies",
    tag: "Health",
    data: { clientName: "PureFit Wellness Group", clientIndustry: "Healthcare", totalBudget: "4500", currency: "USD", sustainabilityPriorities: ["plastic-free", "vegan", "recycled"], productPreferences: "cleaning supplies, toiletries, packaging", notes: "Chain of 8 fitness centers." },
  },
  {
    label: "🏛️ Government — Green Procurement",
    tag: "Government",
    data: { clientName: "City of Portland Sustainability", clientIndustry: "Government", totalBudget: "20000", currency: "USD", sustainabilityPriorities: ["recycled", "carbon-neutral", "locally-sourced"], productPreferences: "office supplies, cleaning supplies, bags, packaging", notes: "12 buildings with 2000+ employees." },
  },
  {
    label: "🎪 Event Company — Sustainable Events",
    tag: "Events",
    data: { clientName: "GreenGatherings Events Co.", clientIndustry: "Events & Conferences", totalBudget: "7500", currency: "USD", sustainabilityPriorities: ["compostable", "zero-waste", "plastic-free"], productPreferences: "utensils, packaging, bags", notes: "200+ events per year. Average 300 people per event." },
  },
  {
    label: "🛒 Retail — Eco Packaging Overhaul",
    tag: "Retail",
    data: { clientName: "NatureMart Organic Stores", clientIndustry: "Retail", totalBudget: "10000", currency: "USD", sustainabilityPriorities: ["plastic-free", "recycled", "compostable"], productPreferences: "packaging, bags", notes: "Chain of 6 organic grocery stores. 100,000+ plastic bags monthly." },
  },
  {
    label: "🏖️ Beach Resort — Ocean-Friendly",
    tag: "Hospitality",
    data: { clientName: "CoralBay Beach Resort", clientIndustry: "Hospitality", totalBudget: "9000", currency: "USD", sustainabilityPriorities: ["plastic-free", "vegan", "carbon-neutral"], productPreferences: "toiletries, packaging, utensils, cleaning supplies", notes: "150-room beachfront resort committed to ocean conservation." },
  },
  {
    label: "✈️ Airline — In-Flight Sustainability",
    tag: "Hospitality",
    data: { clientName: "SkyGreen Airlines", clientIndustry: "Hospitality", totalBudget: "25000", currency: "USD", sustainabilityPriorities: ["compostable", "recycled", "carbon-neutral"], productPreferences: "utensils, packaging", notes: "Regional airline serving 50,000 passengers monthly." },
  },
  {
    label: "🏫 School District — Cafeteria",
    tag: "Education",
    data: { clientName: "Maplewood School District", clientIndustry: "Education", totalBudget: "4000", currency: "USD", sustainabilityPriorities: ["compostable", "plastic-free"], productPreferences: "utensils, packaging", notes: "8 schools and 6,000 students." },
  },
  {
    label: "💊 Pharmacy — Sustainable Retail",
    tag: "Healthcare",
    data: { clientName: "GreenCross Pharmacies", clientIndustry: "Healthcare", totalBudget: "5500", currency: "USD", sustainabilityPriorities: ["recycled", "plastic-free", "vegan"], productPreferences: "bags, packaging, office supplies", notes: "Chain of 15 pharmacies." },
  },
  {
    label: "🌍 NGO — Relief Supply Kits",
    tag: "Non-Profit",
    data: { clientName: "EarthAid International", clientIndustry: "Non-Profit", totalBudget: "3500", currency: "USD", sustainabilityPriorities: ["zero-waste", "organic", "locally-sourced"], productPreferences: "toiletries, bags, utensils", notes: "500 sustainable hygiene kits for disaster relief." },
  },
  {
    label: "🧘 Yoga Studio — Mindful Products",
    tag: "Health",
    data: { clientName: "Lotus Flow Studios", clientIndustry: "Healthcare", totalBudget: "3000", currency: "USD", sustainabilityPriorities: ["vegan", "organic", "plastic-free"], productPreferences: "cleaning supplies, toiletries, bags", notes: "Chain of 5 yoga studios." },
  },
  {
    label: "🏗️ Construction — Green Supplies",
    tag: "Corporate",
    data: { clientName: "BuildRight Sustainable", clientIndustry: "Corporate Office", totalBudget: "6000", currency: "USD", sustainabilityPriorities: ["recycled", "zero-waste", "locally-sourced"], productPreferences: "office supplies, cleaning supplies, bags, packaging", notes: "Construction company with LEED certification." },
  },
  {
    label: "🎭 Theater — Green Productions",
    tag: "Events",
    data: { clientName: "Evergreen Arts Center", clientIndustry: "Events & Conferences", totalBudget: "2500", currency: "USD", sustainabilityPriorities: ["compostable", "recycled", "plastic-free"], productPreferences: "packaging, utensils, office supplies", notes: "400-seat theater. 150+ shows per year." },
  },
  {
    label: "🐾 Vet Clinic — Pet-Safe Eco",
    tag: "Healthcare",
    data: { clientName: "PawPrint Veterinary Group", clientIndustry: "Healthcare", totalBudget: "3800", currency: "USD", sustainabilityPriorities: ["vegan", "plastic-free", "organic"], productPreferences: "cleaning supplies, packaging, office supplies", notes: "4 vet clinics. All products must be animal-safe." },
  },
  {
    label: "⛵ Marina — Ocean-Safe Ops",
    tag: "Hospitality",
    data: { clientName: "BlueTide Marina & Yacht Club", clientIndustry: "Hospitality", totalBudget: "7000", currency: "USD", sustainabilityPriorities: ["plastic-free", "carbon-neutral", "locally-sourced"], productPreferences: "cleaning supplies, utensils, packaging, bags", notes: "200 boat slips, waterfront restaurant, and ship store." },
  },
];

const initialFormState = {
  clientName: "", clientIndustry: "", totalBudget: "", currency: "USD",
  sustainabilityPriorities: [], productPreferences: "", notes: "",
};

function ProposalForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState(initialFormState);
  const [showSamples, setShowSamples] = useState(false);
  const [sampleSearch, setSampleSearch] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const togglePriority = (priority) => {
    setForm((prev) => ({
      ...prev,
      sustainabilityPriorities: prev.sustainabilityPriorities.includes(priority)
        ? prev.sustainabilityPriorities.filter((p) => p !== priority)
        : [...prev.sustainabilityPriorities, priority],
    }));
  };

  const loadSample = (sample) => {
    setForm(sample.data);
    setShowSamples(false);
    setSampleSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      totalBudget: parseFloat(form.totalBudget),
      productPreferences: form.productPreferences
        ? form.productPreferences.split(",").map((p) => p.trim())
        : [],
    });
  };

  const filteredSamples = SAMPLES.filter(
    (s) =>
      s.label.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.tag.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.data.clientName.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.data.clientIndustry.toLowerCase().includes(sampleSearch.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Proposal Parameters
        </h3>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSamples(!showSamples)}
            className="btn-secondary text-sm py-1.5 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <HiOutlineBeaker className="w-4 h-4" />
            Load Sample ({SAMPLES.length})
          </button>

          {showSamples && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => { setShowSamples(false); setSampleSearch(""); }}
              />
              <div className="fixed inset-x-3 top-24 sm:absolute sm:inset-x-auto sm:top-auto sm:right-0 sm:mt-2 sm:w-[420px] bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden max-h-[70vh] sm:max-h-[80vh] flex flex-col">
                <div className="p-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Choose a sample ({filteredSamples.length}/{SAMPLES.length})
                  </p>
                  <div className="relative">
                    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name, industry..."
                      value={sampleSearch}
                      onChange={(e) => setSampleSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-200 outline-none"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="overflow-y-auto flex-1">
                  {filteredSamples.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">No samples found.</div>
                  ) : (
                    filteredSamples.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => loadSample(sample)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 active:bg-blue-100"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-gray-800 text-sm truncate">{sample.label}</p>
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full flex-shrink-0">{sample.tag}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>💰 ${parseInt(sample.data.totalBudget).toLocaleString()}</span>
                          <span className="text-gray-300">•</span>
                          <span>{sample.data.clientIndustry}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Client Name & Industry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="clientName" className="label">Client Name <span className="text-red-500">*</span></label>
            <input id="clientName" name="clientName" value={form.clientName} onChange={handleChange} placeholder="e.g. GreenStay Hotels" className="input-field" required />
          </div>
          <div>
            <label htmlFor="clientIndustry" className="label">Industry <span className="text-red-500">*</span></label>
            <select id="clientIndustry" name="clientIndustry" value={form.clientIndustry} onChange={handleChange} className="input-field" required>
              <option value="">Select industry...</option>
              {INDUSTRY_OPTIONS.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
            </select>
          </div>
        </div>

        {/* Budget & Currency */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="col-span-2 sm:col-span-2">
            <label htmlFor="totalBudget" className="label">Total Budget <span className="text-red-500">*</span></label>
            <input id="totalBudget" name="totalBudget" type="number" step="0.01" min="1" max="10000000" value={form.totalBudget} onChange={handleChange} placeholder="e.g. 5000" className="input-field" required />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="currency" className="label">Currency</label>
            <select id="currency" name="currency" value={form.currency} onChange={handleChange} className="input-field">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        {/* Sustainability Priorities */}
        <div>
          <label className="label">Sustainability Priorities</label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {PRIORITY_OPTIONS.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => togglePriority(priority)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
                  form.sustainabilityPriorities.includes(priority)
                    ? "bg-primary-100 border-primary-300 text-primary-700"
                    : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        {/* Product Preferences */}
        <div>
          <label htmlFor="productPreferences" className="label">Product Preferences (comma-separated)</label>
          <input id="productPreferences" name="productPreferences" value={form.productPreferences} onChange={handleChange} placeholder="e.g. packaging, utensils, bags" className="input-field" />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="label">Additional Notes</label>
          <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Any specific requirements or context..." className="input-field min-h-[70px] sm:min-h-[80px] resize-y" />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <button
          type="submit"
          disabled={isLoading || !form.clientName || !form.totalBudget || !form.clientIndustry}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <HiOutlineSparkles className="w-5 h-5" />
          {isLoading ? "Generating..." : "Generate Proposal"}
        </button>
        <button type="button" onClick={() => setForm(initialFormState)} className="btn-secondary">
          Clear
        </button>
      </div>
    </form>
  );
}

export default ProposalForm;