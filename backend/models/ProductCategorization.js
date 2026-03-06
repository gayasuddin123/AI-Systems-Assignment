import mongoose from "mongoose";

const productCategorizationSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      default: null,
    },
    brand: {
      type: String,
      default: null,
    },
    primaryCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      default: "General",
    },
    seoTags: {
      type: [String],
      validate: {
        validator: (v) => v.length >= 5 && v.length <= 10,
        message: "SEO tags must be between 5 and 10 items",
      },
    },
    sustainabilityFilters: {
      plasticFree: { type: Boolean, default: false },
      compostable: { type: Boolean, default: false },
      vegan: { type: Boolean, default: false },
      recycled: { type: Boolean, default: false },
      biodegradable: { type: Boolean, default: false },
      organic: { type: Boolean, default: false },
      fairTrade: { type: Boolean, default: false },
      zeroWaste: { type: Boolean, default: false },
      locallySourced: { type: Boolean, default: false },
      carbonNeutral: { type: Boolean, default: false },
    },
    confidenceScore: {
      type: Number,
      min: 0,
      max: 1,
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

export default mongoose.model(
  "ProductCategorization",
  productCategorizationSchema
);