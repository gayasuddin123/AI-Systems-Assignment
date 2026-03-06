import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    lineTotal: { type: Number, required: true },
    sustainabilityTags: { type: [String], default: [] },
  },
  { _id: false }
);

const b2bProposalSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    clientIndustry: {
      type: String,
      required: true,
    },
    totalBudget: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
      maxlength: 10,
    },
    sustainabilityPriorities: {
      type: [String],
      default: [],
    },
    productPreferences: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      default: null,
    },
    productMix: {
      type: [productItemSchema],
      required: true,
    },
    budgetAllocation: {
      packaging: { type: Number, default: 0 },
      utensils: { type: Number, default: 0 },
      bagsAndWraps: { type: Number, default: 0 },
      cleaningSupplies: { type: Number, default: 0 },
      officeSupplies: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
    costBreakdown: {
      subtotal: { type: Number, required: true },
      estimatedShipping: { type: Number, required: true },
      estimatedTax: { type: Number, required: true },
      totalEstimated: { type: Number, required: true },
      remainingBudget: { type: Number, required: true },
    },
    impactSummary: {
      type: String,
      required: true,
    },
    rawAiResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("B2BProposal", b2bProposalSchema);