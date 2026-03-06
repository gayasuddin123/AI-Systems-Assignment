/**
 * Module 4 — AI WhatsApp Support Bot
 * STATUS: Architecture outline — not yet fully implemented.
 *
 * ┌────────────────────────────────────────────────────────────────┐
 * │                     ARCHITECTURE OVERVIEW                      │
 * ├────────────────────────────────────────────────────────────────┤
 * │                                                                │
 * │  Integration: Twilio WhatsApp API (or Meta Cloud API)          │
 * │                                                                │
 * │  Webhook Flow:                                                 │
 * │    1. User sends WhatsApp msg → Twilio webhook → Express API   │
 * │    2. Extract: sender phone, message text, timestamp           │
 * │    3. Intent classification (rule-based first, then AI):       │
 * │       ┌──────────────────┬───────────────────────────────┐     │
 * │       │  Intent           │  Handler                      │     │
 * │       ├──────────────────┼───────────────────────────────┤     │
 * │       │  order_status     │  query orders DB by phone/ID  │     │
 * │       │  return_policy    │  serve static policy text     │     │
 * │       │  refund_request   │  → escalate to human agent    │     │
 * │       │  product_inquiry  │  AI answers from catalog      │     │
 * │       │  general_question │  AI conversational response   │     │
 * │       │  high_priority    │  → escalate to human agent    │     │
 * │       └──────────────────┴───────────────────────────────┘     │
 * │                                                                │
 * │  Escalation Rules (business logic, NOT AI):                    │
 * │    - "refund", "money back" → auto-escalate                    │
 * │    - "urgent", "lawyer", "complaint" → auto-escalate           │
 * │    - 3+ user messages without resolution → auto-escalate       │
 * │                                                                │
 * │  Conversation Logging:                                         │
 * │    - WhatsAppConversation collection in MongoDB                │
 * │    - Each message stored with role, content, intent, timestamp │
 * │                                                                │
 * └────────────────────────────────────────────────────────────────┘
 */

const ESCALATION_KEYWORDS = new Set([
  "refund",
  "money back",
  "urgent",
  "lawyer",
  "complaint",
  "legal",
  "scam",
  "fraud",
  "sue",
]);

const RETURN_POLICY_TEXT = `Our return policy:
• 30-day return window from delivery date
• Items must be unused and in original packaging
• Free returns for defective products
• Refunds processed within 5-7 business days
• Contact support@brand.com for return labels`;

export const classifyIntent = (message) => {
  const lower = message.toLowerCase();

  for (const kw of ESCALATION_KEYWORDS) {
    if (lower.includes(kw)) return "high_priority";
  }
  if (["order", "tracking", "delivery", "shipped", "where is"].some((k) => lower.includes(k)))
    return "order_status";
  if (["return", "exchange", "send back"].some((k) => lower.includes(k)))
    return "return_policy";
  if (["product", "price", "available", "stock"].some((k) => lower.includes(k)))
    return "product_inquiry";

  return "general_question";
};

export const shouldEscalate = (session, currentIntent) => {
  if (["high_priority", "refund_request"].includes(currentIntent)) return true;
  if (session.messages?.length >= 6) return true;
  return false;
};

export const handleIncomingMessage = async (phoneNumber, messageText) => {
  throw new Error(
    "Module 4 is architecture-outlined, not yet implemented."
  );
};