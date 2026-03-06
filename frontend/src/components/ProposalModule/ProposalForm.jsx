import { useState } from "react";
import { HiOutlineSparkles, HiOutlineBeaker, HiOutlineSearch } from "react-icons/hi";

const INDUSTRY_OPTIONS = [
  "Hospitality",
  "Retail",
  "Healthcare",
  "Education",
  "Corporate Office",
  "Food & Beverage",
  "Events & Conferences",
  "Government",
  "Non-Profit",
  "Other",
];

const PRIORITY_OPTIONS = [
  "plastic-free",
  "compostable",
  "carbon-neutral",
  "recycled",
  "vegan",
  "zero-waste",
  "locally-sourced",
  "organic",
];

// ── 20 Sample Proposals ──────────────────────────
const SAMPLES = [
  {
    label: "🏨 Hotel Chain — Plastic-Free Switch",
    tag: "Hospitality",
    data: {
      clientName: "GreenStay Hotels",
      clientIndustry: "Hospitality",
      totalBudget: "5000",
      currency: "USD",
      sustainabilityPriorities: ["plastic-free", "compostable"],
      productPreferences: "packaging, utensils, toiletries",
      notes:
        "200-room hotel chain transitioning away from single-use plastics in guest rooms and restaurant. Need compostable alternatives for amenities and dining.",
    },
  },
  {
    label: "🏢 Corporate Office — Zero-Waste Program",
    tag: "Corporate",
    data: {
      clientName: "TechForward Inc.",
      clientIndustry: "Corporate Office",
      totalBudget: "3000",
      currency: "USD",
      sustainabilityPriorities: ["zero-waste", "recycled"],
      productPreferences: "office supplies, cleaning supplies, bags",
      notes:
        "500-person tech office launching zero-waste initiative. Need recycled paper products, eco-friendly cleaning supplies, and reusable alternatives for the break room.",
    },
  },
  {
    label: "🍕 Restaurant Group — Eco Packaging",
    tag: "Food & Beverage",
    data: {
      clientName: "FreshBite Restaurants",
      clientIndustry: "Food & Beverage",
      totalBudget: "8000",
      currency: "USD",
      sustainabilityPriorities: ["compostable", "plastic-free", "locally-sourced"],
      productPreferences: "packaging, utensils, bags",
      notes:
        "Chain of 12 fast-casual restaurants. Need takeout containers, compostable cutlery, paper bags, and sustainable straws. Approximately 5000 takeout orders per week across all locations.",
    },
  },
  {
    label: "🏥 Hospital — Green Healthcare",
    tag: "Healthcare",
    data: {
      clientName: "CityHealth Medical Center",
      clientIndustry: "Healthcare",
      totalBudget: "12000",
      currency: "USD",
      sustainabilityPriorities: ["plastic-free", "recycled", "carbon-neutral"],
      productPreferences: "cleaning supplies, packaging, office supplies",
      notes:
        "300-bed hospital seeking to reduce environmental footprint. Priority areas: cafeteria disposables, cleaning products, office paper, and patient amenity kits. Must meet healthcare safety standards.",
    },
  },
  {
    label: "🎓 University — Campus Sustainability",
    tag: "Education",
    data: {
      clientName: "Green Valley University",
      clientIndustry: "Education",
      totalBudget: "6500",
      currency: "USD",
      sustainabilityPriorities: ["zero-waste", "vegan", "organic"],
      productPreferences: "utensils, packaging, cleaning supplies, office supplies",
      notes:
        "Large campus with 15,000 students. Need products for 3 dining halls, campus bookstore, and administrative offices. Student government has mandated transition to fully sustainable products.",
    },
  },
  {
    label: "☕ Coffee Chain — Compostable Cups",
    tag: "Food & Beverage",
    data: {
      clientName: "BeanGreen Coffee Co.",
      clientIndustry: "Food & Beverage",
      totalBudget: "15000",
      currency: "USD",
      sustainabilityPriorities: ["compostable", "plastic-free", "carbon-neutral"],
      productPreferences: "packaging, utensils",
      notes:
        "Regional coffee chain with 25 locations. Need compostable hot cups, lids, sleeves, stirrers, napkins, and pastry bags. Currently using 50,000+ disposable cups per week across all stores. Want to completely eliminate petroleum-based products.",
    },
  },
  {
    label: "🏋️ Gym & Fitness Centers — Eco Supplies",
    tag: "Health & Wellness",
    data: {
      clientName: "PureFit Wellness Group",
      clientIndustry: "Healthcare",
      totalBudget: "4500",
      currency: "USD",
      sustainabilityPriorities: ["plastic-free", "vegan", "recycled"],
      productPreferences: "cleaning supplies, toiletries, packaging",
      notes:
        "Chain of 8 fitness centers. Need eco-friendly cleaning products for equipment, sustainable toiletries for locker rooms (shampoo, body wash, lotion dispensers), recycled paper towels, and compostable cups for smoothie bar.",
    },
  },
  {
    label: "🏛️ Government Office — Green Procurement",
    tag: "Government",
    data: {
      clientName: "City of Portland Sustainability Office",
      clientIndustry: "Government",
      totalBudget: "20000",
      currency: "USD",
      sustainabilityPriorities: ["recycled", "carbon-neutral", "locally-sourced"],
      productPreferences: "office supplies, cleaning supplies, bags, packaging",
      notes:
        "Municipal government offices across 12 buildings with 2000+ employees. Mandated by city council to source 80% sustainable products. Need bulk office supplies (paper, pens, folders), green cleaning products, reusable bags for community events, and compostable catering supplies for public meetings.",
    },
  },
  {
    label: "🎪 Event Company — Sustainable Events",
    tag: "Events",
    data: {
      clientName: "GreenGatherings Events Co.",
      clientIndustry: "Events & Conferences",
      totalBudget: "7500",
      currency: "USD",
      sustainabilityPriorities: ["compostable", "zero-waste", "plastic-free"],
      productPreferences: "utensils, packaging, bags",
      notes:
        "Event management company hosting 200+ events per year including corporate conferences, weddings, and festivals. Need compostable plates, cups, cutlery, napkins, and trash bags. Also need sustainable badge holders, lanyards, and tote bags for conference attendees. Average event size is 300 people.",
    },
  },
  {
    label: "🛒 Retail Store — Eco Packaging Overhaul",
    tag: "Retail",
    data: {
      clientName: "NatureMart Organic Stores",
      clientIndustry: "Retail",
      totalBudget: "10000",
      currency: "USD",
      sustainabilityPriorities: ["plastic-free", "recycled", "compostable"],
      productPreferences: "packaging, bags",
      notes:
        "Chain of 6 organic grocery stores. Transitioning all checkout bags to compostable options, replacing produce bags with reusable mesh bags, need compostable deli containers, recycled paper shopping bags with soy ink printing, and sustainable gift wrap for seasonal promotions. Currently using 100,000+ plastic bags monthly.",
    },
  },
  {
    label: "🏖️ Beach Resort — Ocean-Friendly",
    tag: "Hospitality",
    data: {
      clientName: "CoralBay Beach Resort",
      clientIndustry: "Hospitality",
      totalBudget: "9000",
      currency: "USD",
      sustainabilityPriorities: ["plastic-free", "vegan", "carbon-neutral"],
      productPreferences: "toiletries, packaging, utensils, cleaning supplies",
      notes:
        "150-room beachfront resort committed to ocean conservation. Need reef-safe sunscreen amenities, plastic-free toiletry bottles, bamboo straws for beach bar, compostable food containers for pool-side dining, biodegradable cleaning products safe for marine discharge, and reusable water bottles for guest welcome kits.",
    },
  },
  {
    label: "✈️ Airline — In-Flight Sustainability",
    tag: "Hospitality",
    data: {
      clientName: "SkyGreen Airlines",
      clientIndustry: "Hospitality",
      totalBudget: "25000",
      currency: "USD",
      sustainabilityPriorities: ["compostable", "recycled", "carbon-neutral"],
      productPreferences: "utensils, packaging",
      notes:
        "Regional airline serving 50,000 passengers monthly. Need lightweight compostable meal trays, bamboo cutlery sets, recycled paper napkins, compostable hot drink cups, and sustainable snack packaging. Weight is critical — every gram affects fuel consumption. Also need sustainable amenity kits for business class including bamboo toothbrush, organic lip balm, and recycled eye mask.",
    },
  },
  {
    label: "🏫 School District — Cafeteria Green-Up",
    tag: "Education",
    data: {
      clientName: "Maplewood School District",
      clientIndustry: "Education",
      totalBudget: "4000",
      currency: "USD",
      sustainabilityPriorities: ["compostable", "plastic-free"],
      productPreferences: "utensils, packaging",
      notes:
        "School district with 8 schools and 6,000 students. Need compostable lunch trays, utensils, milk carton alternatives, napkins, and trash bags for cafeterias. Products must be safe for children — no sharp edges, appropriate sizes. Budget-conscious district looking for best value. Also want educational materials about composting for students.",
    },
  },
  {
    label: "💊 Pharmacy Chain — Sustainable Retail",
    tag: "Healthcare",
    data: {
      clientName: "GreenCross Pharmacies",
      clientIndustry: "Healthcare",
      totalBudget: "5500",
      currency: "USD",
      sustainabilityPriorities: ["recycled", "plastic-free", "vegan"],
      productPreferences: "bags, packaging, office supplies",
      notes:
        "Chain of 15 pharmacies transitioning to sustainable operations. Need recycled paper prescription bags, compostable checkout bags, sustainable receipt paper (BPA-free thermal paper), recycled paper for printing, eco-friendly store cleaning products, and bamboo pens for counter use. Want to promote green image to health-conscious customers.",
    },
  },
  {
    label: "🌍 NGO — Relief Supply Kits",
    tag: "Non-Profit",
    data: {
      clientName: "EarthAid International",
      clientIndustry: "Non-Profit",
      totalBudget: "3500",
      currency: "USD",
      sustainabilityPriorities: ["zero-waste", "organic", "locally-sourced"],
      productPreferences: "toiletries, bags, utensils",
      notes:
        "International humanitarian NGO assembling 500 sustainable hygiene kits for disaster relief. Each kit needs: bamboo toothbrush, organic soap bar, reusable cotton towel, stainless steel water cup, hemp drawstring bag. All items must be durable, culturally neutral, and biodegradable. Need bulk pricing with kitting/assembly service if possible.",
    },
  },
  {
    label: "🧘 Yoga Studio Chain — Mindful Products",
    tag: "Health & Wellness",
    data: {
      clientName: "Lotus Flow Studios",
      clientIndustry: "Healthcare",
      totalBudget: "3000",
      currency: "USD",
      sustainabilityPriorities: ["vegan", "organic", "plastic-free"],
      productPreferences: "cleaning supplies, toiletries, bags",
      notes:
        "Chain of 5 yoga studios. Need natural yoga mat cleaner spray (essential oil based), organic cotton towels, vegan body wash and shampoo for showers, reusable water bottles for retail sale, and organic cotton tote bags branded with studio logo. Everything must align with wellness and mindfulness brand positioning.",
    },
  },
  {
    label: "🏗️ Construction Firm — Green Site Supplies",
    tag: "Corporate",
    data: {
      clientName: "BuildRight Sustainable Construction",
      clientIndustry: "Corporate Office",
      totalBudget: "6000",
      currency: "USD",
      sustainabilityPriorities: ["recycled", "zero-waste", "locally-sourced"],
      productPreferences: "office supplies, cleaning supplies, bags, packaging",
      notes:
        "Construction company with LEED certification requirements. Need recycled paper for plan printing, eco-friendly hand cleaning wipes for job sites, biodegradable trash bags for construction waste, reusable water jugs to replace single-use bottles, and recycled content safety vests. Must be durable enough for construction site conditions.",
    },
  },
  {
    label: "🎭 Theater & Arts Center — Green Productions",
    tag: "Events",
    data: {
      clientName: "Evergreen Performing Arts Center",
      clientIndustry: "Events & Conferences",
      totalBudget: "2500",
      currency: "USD",
      sustainabilityPriorities: ["compostable", "recycled", "plastic-free"],
      productPreferences: "packaging, utensils, office supplies",
      notes:
        "400-seat community theater with concession stand and box office. Need compostable cups and snack containers for concessions, recycled paper for programs and tickets, eco-friendly cleaning products for venue, and sustainable office supplies for administration. Host 150+ shows and events per year.",
    },
  },
  {
    label: "🐾 Veterinary Clinic — Pet-Safe Eco Products",
    tag: "Healthcare",
    data: {
      clientName: "PawPrint Veterinary Group",
      clientIndustry: "Healthcare",
      totalBudget: "3800",
      currency: "USD",
      sustainabilityPriorities: ["vegan", "plastic-free", "organic"],
      productPreferences: "cleaning supplies, packaging, office supplies",
      notes:
        "Group of 4 veterinary clinics. Need pet-safe, non-toxic cleaning products for exam rooms and kennels, biodegradable waste bags for clinic use, recycled paper for medical records printing, compostable food bowls for boarding animals, and eco-friendly hand soap for staff. All cleaning products must be animal-safe with no harsh chemical residue.",
    },
  },
  {
    label: "⛵ Marina & Yacht Club — Ocean-Safe Operations",
    tag: "Hospitality",
    data: {
      clientName: "BlueTide Marina & Yacht Club",
      clientIndustry: "Hospitality",
      totalBudget: "7000",
      currency: "USD",
      sustainabilityPriorities: ["plastic-free", "carbon-neutral", "locally-sourced"],
      productPreferences: "cleaning supplies, utensils, packaging, bags",
      notes:
        "Full-service marina with 200 boat slips, a waterfront restaurant, and a ship store. Need biodegradable boat cleaning products safe for marine ecosystems, compostable food service items for the restaurant, reusable provisioning bags for boaters, stainless steel water bottles for the ship store, and recycled paper products for the office. Strong commitment to protecting local waterways.",
    },
  },
];

const initialFormState = {
  clientName: "",
  clientIndustry: "",
  totalBudget: "",
  currency: "USD",
  sustainabilityPriorities: [],
  productPreferences: "",
  notes: "",
};

function ProposalForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState(initialFormState);
  const [showSamples, setShowSamples] = useState(false);
  const [sampleSearch, setSampleSearch] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  // Filter samples by search
  const filteredSamples = SAMPLES.filter(
    (s) =>
      s.label.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.tag.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.data.clientName.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.data.clientIndustry.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.data.notes?.toLowerCase().includes(sampleSearch.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Proposal Parameters
        </h3>

        {/* Sample Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSamples(!showSamples)}
            className="btn-secondary text-sm py-1.5 flex items-center gap-2"
          >
            <HiOutlineBeaker className="w-4 h-4" />
            Load Sample ({SAMPLES.length})
          </button>

          {showSamples && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => {
                  setShowSamples(false);
                  setSampleSearch("");
                }}
              />
              <div className="absolute right-0 mt-2 w-[420px] bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
                {/* Header with search */}
                <div className="p-3 bg-gray-50 border-b border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Choose a sample proposal ({filteredSamples.length} of{" "}
                    {SAMPLES.length})
                  </p>
                  <div className="relative">
                    <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name, industry, keyword..."
                      value={sampleSearch}
                      onChange={(e) => setSampleSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg 
                                 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 outline-none"
                    />
                  </div>
                </div>

                {/* Sample list */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredSamples.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">
                      No samples match your search.
                    </div>
                  ) : (
                    filteredSamples.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => loadSample(sample)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 
                                   transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-800 text-sm">
                            {sample.label}
                          </p>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                            {sample.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">
                            💰 $
                            {parseInt(sample.data.totalBudget).toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {sample.data.clientIndustry}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {sample.data.sustainabilityPriorities?.length || 0}{" "}
                            priorities
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {sample.data.notes?.substring(0, 120)}...
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Client Name & Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientName" className="label">
              Client Name <span className="text-red-500">*</span>
            </label>
            <input
              id="clientName"
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              placeholder="e.g. GreenStay Hotels"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="clientIndustry" className="label">
              Industry <span className="text-red-500">*</span>
            </label>
            <select
              id="clientIndustry"
              name="clientIndustry"
              value={form.clientIndustry}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select industry...</option>
              {INDUSTRY_OPTIONS.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="totalBudget" className="label">
              Total Budget <span className="text-red-500">*</span>
            </label>
            <input
              id="totalBudget"
              name="totalBudget"
              type="number"
              step="0.01"
              min="1"
              max="10000000"
              value={form.totalBudget}
              onChange={handleChange}
              placeholder="e.g. 5000"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="currency" className="label">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="input-field"
            >
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
          <div className="flex flex-wrap gap-2">
            {PRIORITY_OPTIONS.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => togglePriority(priority)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
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
          <label htmlFor="productPreferences" className="label">
            Product Preferences (comma-separated)
          </label>
          <input
            id="productPreferences"
            name="productPreferences"
            value={form.productPreferences}
            onChange={handleChange}
            placeholder="e.g. packaging, utensils, bags"
            className="input-field"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="label">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any specific requirements or context..."
            className="input-field min-h-[80px] resize-y"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={
            isLoading ||
            !form.clientName ||
            !form.totalBudget ||
            !form.clientIndustry
          }
          className="btn-primary flex items-center gap-2"
        >
          <HiOutlineSparkles className="w-5 h-5" />
          {isLoading ? "Generating..." : "Generate Proposal"}
        </button>
        <button
          type="button"
          onClick={() => setForm(initialFormState)}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default ProposalForm;