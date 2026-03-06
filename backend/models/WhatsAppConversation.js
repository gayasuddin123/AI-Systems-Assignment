// Module 4 — Architecture outline model
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant", "system"] },
    content: { type: String },
    intent: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const whatsappConversationSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, unique: true },
    messages: { type: [messageSchema], default: [] },
    intentClassified: { type: String, default: null },
    wasEscalated: { type: Boolean, default: false },
    escalationReason: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model(
  "WhatsAppConversation",
  whatsappConversationSchema
);