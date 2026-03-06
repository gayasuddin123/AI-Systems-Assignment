import { HiOutlineChatAlt2 } from "react-icons/hi";

function WhatsAppPlaceholder() {
  return (
    <div className="card text-center py-16">
      <HiOutlineChatAlt2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        WhatsApp Support Bot
      </h3>
      <p className="text-gray-400 max-w-md mx-auto mb-6">
        AI-powered WhatsApp bot for customer support — order tracking, returns,
        and intelligent escalation.
      </p>

      <div className="max-w-lg mx-auto text-left">
        <h4 className="font-medium text-gray-700 mb-3">Planned Features:</h4>
        <ul className="space-y-2 text-sm text-gray-500">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            Order status queries from real database
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            Return policy automated responses
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            Auto-escalation for refunds & high-priority issues
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            Full conversation logging & audit trail
          </li>
        </ul>

        <h4 className="font-medium text-gray-700 mt-6 mb-3">
          Intent Classification:
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ["order_status", "DB Lookup"],
            ["return_policy", "Static Text"],
            ["refund_request", "→ Escalate"],
            ["product_inquiry", "AI + Catalog"],
            ["general_question", "AI Response"],
            ["high_priority", "→ Escalate"],
          ].map(([intent, handler]) => (
            <div
              key={intent}
              className="flex justify-between bg-gray-50 rounded px-3 py-2"
            >
              <span className="font-mono text-gray-600">{intent}</span>
              <span className="text-gray-400">{handler}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
        <p className="text-xs text-gray-500 font-mono">
          Planned API: POST /api/v1/whatsapp/webhook
        </p>
      </div>
    </div>
  );
}

export default WhatsAppPlaceholder;