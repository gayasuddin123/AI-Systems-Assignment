// Module 3 — Architecture outline model
import mongoose from "mongoose";

const impactReportSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, index: true },
    plasticSavedKg: { type: Number, default: 0 },
    carbonAvoidedKg: { type: Number, default: 0 },
    localSourcingPercentage: { type: Number, default: 0 },
    plasticBottleEquivalent: { type: Number, default: 0 },
    treeEquivalent: { type: Number, default: 0 },
    impactStatement: { type: String, default: "" },
    rawAiResponse: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("ImpactReport", impactReportSchema);