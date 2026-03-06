import mongoose from "mongoose";

const aiPromptLogSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
      enum: ["category", "proposal", "impact", "whatsapp"],
      index: true,
    },
    promptText: {
      type: String,
      required: true,
    },
    responseText: {
      type: String,
      default: null,
    },
    modelUsed: {
      type: String,
      default: null,
    },
    tokensPrompt: {
      type: Number,
      default: null,
    },
    tokensCompletion: {
      type: Number,
      default: null,
    },
    latencyMs: {
      type: Number,
      default: null,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AIPromptLog", aiPromptLogSchema);