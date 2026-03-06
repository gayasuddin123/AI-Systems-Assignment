import { useState } from "react";
import { HiOutlineSparkles, HiOutlineBeaker, HiOutlineSearch } from "react-icons/hi";

// ── 20 Sample Products ────────────────────────
const SAMPLES = [
  {
    label: "🪥 Bamboo Toothbrush",
    category: "Personal Care",
    data: {
      productName: "Bamboo Toothbrush",
      productDescription:
        "Eco-friendly toothbrush made from sustainably harvested bamboo with charcoal-infused BPA-free nylon-4 bristles. Fully biodegradable handle with plastic-free recyclable kraft paper packaging. Perfect for a zero-waste bathroom routine.",
      material: "bamboo, nylon-4",
      brand: "EcoSmile",
    },
  },
  {
    label: "🛍️ Reusable Jute Tote Bag",
    category: "Bags & Totes",
    data: {
      productName: "Organic Jute Market Tote",
      productDescription:
        "Large capacity reusable shopping tote handwoven from 100% organic jute fibers. Features reinforced cotton handles, internal pocket, and water-resistant lining made from recycled PET bottles. Replaces 500+ single-use plastic bags over its lifetime. Fair trade certified, handmade by artisan cooperatives in Bangladesh.",
      material: "organic jute, recycled PET, cotton",
      brand: "GreenCarry",
    },
  },
  {
    label: "🧴 Solid Shampoo Bar",
    category: "Personal Care",
    data: {
      productName: "Solid Shampoo Bar - Lavender & Oat",
      productDescription:
        "Zero-waste solid shampoo bar made with organic coconut oil, shea butter, lavender essential oil, and colloidal oatmeal. Vegan formula free from sulfates, parabens, and synthetic fragrances. Each bar replaces 2-3 plastic shampoo bottles. Comes in compostable cardboard packaging with soy-based ink printing.",
      material: "organic coconut oil, shea butter, essential oils",
      brand: "BarNaturals",
    },
  },
  {
    label: "🍽️ Sugarcane Bagasse Plates",
    category: "Kitchen & Dining",
    data: {
      productName: "Sugarcane Bagasse Dinner Plates 10-inch (50 pack)",
      productDescription:
        "Heavy-duty disposable dinner plates made from sugarcane bagasse, a byproduct of sugar production. Microwave-safe, oil-resistant, and holds hot and cold foods without leaking. Fully compostable in 60-90 days in commercial composting. PFAS-free and plastic-free. Ideal for parties, catering, and food service businesses looking to eliminate styrofoam.",
      material: "sugarcane bagasse",
      brand: "LeafyPlates",
    },
  },
  {
    label: "🧹 Coconut Coir Scrub Brush",
    category: "Cleaning Supplies",
    data: {
      productName: "Natural Coconut Coir Kitchen Scrub Brush",
      productDescription:
        "Durable kitchen cleaning brush with stiff coconut coir bristles and a sustainably sourced beechwood handle. Naturally antibacterial, perfect for scrubbing pots, pans, and vegetables. Fully biodegradable and compostable at end of life. Replaces plastic dish brushes. Comes with two replaceable heads. Packaged in recycled cardboard.",
      material: "coconut coir, beechwood",
      brand: "CleanEarth",
    },
  },
  {
    label: "🌿 Beeswax Food Wraps",
    category: "Kitchen & Dining",
    data: {
      productName: "Organic Beeswax Food Wraps - Variety Pack (3 sizes)",
      productDescription:
        "Reusable food wraps made from organic cotton infused with sustainably sourced beeswax, jojoba oil, and tree resin. Naturally antibacterial and self-adhesive — sticks to bowls, plates, and itself. Replaces plastic cling wrap entirely. Lasts 6-12 months with proper care. Washable in cool water. Pack includes small, medium, and large sizes in botanical print designs.",
      material: "organic cotton, beeswax, jojoba oil, tree resin",
      brand: "WrapNatural",
    },
  },
  {
    label: "📓 Recycled Paper Notebook",
    category: "Office & Stationery",
    data: {
      productName: "100% Recycled Paper Spiral Notebook - A5",
      productDescription:
        "Professional A5 notebook made entirely from 100% post-consumer recycled paper. Features 200 lined pages, recycled cardboard cover with water-based ink printing, and a spiral binding made from recycled steel wire. Acid-free pages suitable for fountain pens. FSC certified. Carbon-neutral manufacturing process with verified offsets.",
      material: "recycled paper, recycled cardboard, recycled steel wire",
      brand: "ReWrite",
    },
  },
  {
    label: "🧽 Plant-Based Kitchen Sponges",
    category: "Cleaning Supplies",
    data: {
      productName: "Biodegradable Cellulose Kitchen Sponges (4-pack)",
      productDescription:
        "Natural kitchen sponges made from plant-based cellulose derived from wood pulp and cotton fibers. Dual-sided with a walnut shell scrubbing layer for tough stains. Zero synthetic materials — fully biodegradable and compostable. Absorbs 20x its weight in water. Each sponge lasts 4-6 weeks. Plastic-free packaging with compostable sleeve.",
      material: "cellulose, wood pulp, cotton, walnut shell",
      brand: "SpongeCo",
    },
  },
  {
    label: "🕯️ Soy Wax Candle",
    category: "Home & Living",
    data: {
      productName: "Hand-Poured Soy Wax Candle - Eucalyptus & Mint (8oz)",
      productDescription:
        "Clean-burning candle made from 100% natural soy wax with a pure cotton wick and scented with therapeutic-grade eucalyptus and peppermint essential oils. No paraffin, synthetic fragrances, or dyes. Burns for approximately 45 hours. Poured into a reusable amber glass jar with a bamboo lid. Vegan and cruelty-free. Handmade in small batches.",
      material: "soy wax, cotton wick, essential oils, glass",
      brand: "GlowGreen",
    },
  },
  {
    label: "🧻 Bamboo Toilet Paper",
    category: "Personal Care",
    data: {
      productName: "Bamboo Toilet Paper - 24 Roll Box",
      productDescription:
        "Ultra-soft 3-ply toilet paper made from 100% FSC-certified bamboo fiber. Bamboo grows 30x faster than trees making it a highly renewable resource. No chlorine bleaching, no BPA, no inks or dyes. Strong yet septic-safe and rapidly biodegradable. Plastic-free packaging — delivered in a recyclable cardboard box with individually paper-wrapped rolls. Carbon-neutral shipping.",
      material: "bamboo fiber",
      brand: "BamBath",
    },
  },
  {
    label: "🥤 Stainless Steel Water Bottle",
    category: "Travel & On-the-Go",
    data: {
      productName: "Insulated Stainless Steel Water Bottle - 750ml",
      productDescription:
        "Double-wall vacuum insulated water bottle made from food-grade 18/8 stainless steel. Keeps drinks cold 24 hours or hot 12 hours. BPA-free, toxin-free, and plastic-free — including the lid which uses silicone seals. Powder-coated exterior in ocean blue finish using non-toxic paint. Wide mouth for easy cleaning and ice cubes. Replaces 1400+ single-use plastic bottles over its lifetime.",
      material: "18/8 stainless steel, silicone, non-toxic powder coat",
      brand: "HydroEarth",
    },
  },
  {
    label: "🧥 Organic Cotton T-Shirt",
    category: "Fashion & Accessories",
    data: {
      productName: "Unisex Organic Cotton Essential T-Shirt",
      productDescription:
        "Classic fit unisex t-shirt made from 100% GOTS-certified organic cotton grown without pesticides or synthetic fertilizers. Dyed using low-impact reactive dyes with wastewater treatment. Fair trade certified manufacturing facility in Portugal. Pre-shrunk, 180 GSM medium weight fabric. Available in 8 earth-tone colors. Plastic-free packaging with compostable garment bag.",
      material: "100% GOTS certified organic cotton",
      brand: "EarthThreads",
    },
  },
  {
    label: "🌱 Compostable Trash Bags",
    category: "Home & Living",
    data: {
      productName: "Certified Compostable Trash Bags 13-Gallon (50 count)",
      productDescription:
        "Kitchen trash bags made from plant-based PLA (polylactic acid) derived from corn starch. BPI certified compostable in commercial composting facilities — breaks down in 90-180 days. Leak-proof with reinforced bottom seam and drawstring closure. Holds up to 30 lbs. No conventional plastics, polyethylene, or microplastics. Roll packaged in recycled cardboard box.",
      material: "PLA (corn starch based), plant-based polymers",
      brand: "BioBag",
    },
  },
  {
    label: "🐕 Hemp Dog Collar",
    category: "Pet Supplies",
    data: {
      productName: "Adjustable Hemp Dog Collar - Medium",
      productDescription:
        "Durable and naturally odor-resistant dog collar made from organic hemp fiber webbing with a recycled aluminum D-ring and buckle. Hemp is naturally antibacterial and gets softer with each wash without weakening. Hypoallergenic — perfect for dogs with sensitive skin. Adjustable from 14-20 inches. Handmade with reinforced double stitching. Comes in natural, sage green, and rust colors. Packaged in a compostable cotton drawstring bag.",
      material: "organic hemp, recycled aluminum",
      brand: "PawPlanet",
    },
  },
  {
    label: "🧸 Organic Cotton Baby Blanket",
    category: "Baby & Kids",
    data: {
      productName: "Organic Muslin Baby Swaddle Blanket - 2 Pack",
      productDescription:
        "Ultra-soft muslin swaddle blankets made from 100% GOTS certified organic cotton. Pre-washed for extra softness, breathable weave regulates baby's temperature naturally. Free from harmful chemicals — OEKO-TEX Standard 100 Class I certified (safe for babies). Generous 47x47 inch size. Machine washable and becomes softer with every wash. Printed with water-based non-toxic botanical inks. Packaged in a reusable organic cotton drawstring bag.",
      material: "GOTS organic cotton muslin",
      brand: "TinyLeaf",
    },
  },
  {
    label: "🌻 Biodegradable Plant Pots",
    category: "Garden & Outdoor",
    data: {
      productName: "Biodegradable Seedling Plant Pots - 100 Pack (3 inch)",
      productDescription:
        "Round seedling starter pots made from compressed peat-free coconut coir and natural latex binder. Simply plant the entire pot directly into soil — it biodegrades within 8-12 weeks while enriching the surrounding soil. Eliminates transplant shock since roots grow right through the pot walls. Perfect for herbs, vegetables, and flowers. Excellent water retention and drainage. Zero plastic. Bulk packed in a recycled kraft paper bag.",
      material: "coconut coir, natural latex binder",
      brand: "GrowGreen",
    },
  },
  {
    label: "🍵 Organic Matcha Powder",
    category: "Food & Beverages",
    data: {
      productName: "Ceremonial Grade Organic Matcha Powder - 100g Tin",
      productDescription:
        "Premium Japanese ceremonial-grade matcha green tea powder sourced from shade-grown organic tea farms in Uji, Kyoto. USDA Organic and JAS certified. Stone-ground to a fine 5-micron powder for smooth, umami-rich taste. Rich in antioxidants, L-theanine, and natural caffeine. Packaged in a reusable steel tin with an airtight seal to preserve freshness. Inner pouch is compostable plant-based film. Carbon-neutral shipping from origin. Fair trade partnership with family-owned farms.",
      material: "organic tea leaves",
      brand: "ZenLeaf",
    },
  },
  {
    label: "🩴 Cork Yoga Mat",
    category: "Health & Wellness",
    data: {
      productName: "Natural Cork & Rubber Yoga Mat - 5mm",
      productDescription:
        "Premium yoga mat with a sustainably harvested Portuguese cork surface bonded to a natural tree rubber base. Cork provides natural antimicrobial properties and grip that improves with moisture — perfect for hot yoga. No PVC, TPE, or toxic foaming agents. 72x24 inches, 5mm thick for optimal cushioning. Cork is harvested without harming the tree — the bark regenerates every 9 years. Comes with an organic cotton carrying strap. Packaged in recycled cardboard tube.",
      material: "Portuguese cork, natural tree rubber, organic cotton",
      brand: "AsanaEarth",
    },
  },
  {
    label: "📦 Compostable Mailer Bags",
    category: "Packaging & Wrapping",
    data: {
      productName: "Compostable Shipping Mailer Bags 12x15 inch (100 pack)",
      productDescription:
        "E-commerce shipping mailers made from PBAT and PLA plant-based polymers. Certified home-compostable (OK Compost HOME) — breaks down in backyard compost within 180 days. Self-sealing adhesive strip for easy packing. Opaque for privacy, waterproof for transit protection. Printed with soy-based inks. Strength-tested to hold up to 5 lbs per bag. Direct replacement for poly mailer bags. Flat-packed in recycled kraft cardboard box.",
      material: "PBAT, PLA, plant-based polymers, soy ink",
      brand: "ShipGreen",
    },
  },
  {
    label: "🧴 Refillable Glass Soap Dispenser",
    category: "Home & Living",
    data: {
      productName: "Amber Glass Soap Dispenser with Stainless Steel Pump - 500ml",
      productDescription:
        "Elegant refillable soap dispenser crafted from thick amber glass with a rust-proof 304 stainless steel pump mechanism. Designed to replace single-use plastic soap bottles permanently. Amber glass protects contents from UV degradation. Compatible with liquid hand soap, dish soap, lotion, or shampoo. Wide mouth for easy refilling. Silicone gasket seal prevents leaks. Includes waterproof vinyl label and chalk pen for customization. Comes with a starter pack of concentrated castile soap tablet (makes 500ml). Packaged in molded recycled paper pulp.",
      material: "amber glass, 304 stainless steel, silicone gasket",
      brand: "BottleRevolution",
    },
  },
];

const initialFormState = {
  productName: "",
  productDescription: "",
  material: "",
  brand: "",
};

function CategoryForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState(initialFormState);
  const [showSamples, setShowSamples] = useState(false);
  const [sampleSearch, setSampleSearch] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const loadSample = (sample) => {
    setForm(sample.data);
    setShowSamples(false);
    setSampleSearch("");
  };

  // Filter samples by search text
  const filteredSamples = SAMPLES.filter(
    (s) =>
      s.label.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.category.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.data.productName.toLowerCase().includes(sampleSearch.toLowerCase()) ||
      s.data.material?.toLowerCase().includes(sampleSearch.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Product Information
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

          {/* Dropdown */}
          {showSamples && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => {
                  setShowSamples(false);
                  setSampleSearch("");
                }}
              />
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
                {/* Header with search */}
                <div className="p-3 bg-gray-50 border-b border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Choose a sample product ({filteredSamples.length} of{" "}
                    {SAMPLES.length})
                  </p>
                  <div className="relative">
                    <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search samples..."
                      value={sampleSearch}
                      onChange={(e) => setSampleSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg 
                                 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 outline-none"
                    />
                  </div>
                </div>

                {/* Sample list */}
                <div className="max-h-80 overflow-y-auto">
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
                        className="w-full text-left px-4 py-3 hover:bg-primary-50 
                                   transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-800 text-sm">
                            {sample.label}
                          </p>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                            {sample.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {sample.data.material || "Various materials"}
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
        {/* Product Name */}
        <div>
          <label htmlFor="productName" className="label">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            value={form.productName}
            onChange={handleChange}
            placeholder="e.g. Bamboo Toothbrush"
            className="input-field"
            required
            minLength={2}
            maxLength={255}
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="productDescription" className="label">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={form.productDescription}
            onChange={handleChange}
            placeholder="Detailed description of the product including materials, features, and sustainability attributes..."
            className="input-field min-h-[120px] resize-y"
            required
            minLength={10}
            maxLength={5000}
          />
          <p className="text-xs text-gray-400 mt-1">
            {form.productDescription.length}/5000 characters
          </p>
        </div>

        {/* Material & Brand Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="material" className="label">
              Material(s)
            </label>
            <input
              id="material"
              name="material"
              type="text"
              value={form.material}
              onChange={handleChange}
              placeholder="e.g. bamboo, organic cotton"
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="brand" className="label">
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g. EcoSmile"
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={
            isLoading ||
            !form.productName.trim() ||
            form.productDescription.length < 10
          }
          className="btn-primary flex items-center gap-2"
        >
          <HiOutlineSparkles className="w-5 h-5" />
          {isLoading ? "Analyzing..." : "Generate Categories & Tags"}
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

export default CategoryForm;