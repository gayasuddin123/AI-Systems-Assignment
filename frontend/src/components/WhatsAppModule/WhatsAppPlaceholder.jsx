import { HiOutlineChatAlt2 } from "react-icons/hi";

function WhatsAppPlaceholder() {
  return (
    <div className="card text-center py-10 sm:py-16">
      <HiOutlineChatAlt2 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
      <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
        WhatsApp Support Bot
      </h3>
      <p className="text-gray-400 max-w-md mx-auto mb-4 sm:mb-6 text-sm sm:text-base px-4">
        AI-powered WhatsApp bot for customer support — order tracking, returns, and intelligent escalation.
      </p>

      <div className="max-w-lg mx-auto text-left px-4">
        <h4 className="font-medium text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">Planned Features:</h4>
        <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
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
            Auto-escalation for refunds & high-priority
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            Full conversation logging & audit trail
          </li>
        </ul>

        <h4 className="font-medium text-gray-700 mt-4 sm:mt-6 mb-2 sm:mb-3 text-sm sm:text-base">
          Intent Classification:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs">
          {[
            ["order_status", "DB Lookup"],
            ["return_policy", "Static Text"],
            ["refund_request", "→ Escalate"],
            ["product_inquiry", "AI + Catalog"],
            ["general_question", "AI Response"],
            ["high_priority", "→ Escalate"],
          ].map(([intent, handler]) => (
            <div key={intent} className="flex justify-between bg-gray-50 rounded px-2.5 sm:px-3 py-1.5 sm:py-2">
              <span className="font-mono text-gray-600 truncate">{intent}</span>
              <span className="text-gray-400 ml-2 flex-shrink-0">{handler}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg max-w-md mx-auto mx-4 sm:mx-auto">
        <p className="text-xs text-gray-500 font-mono break-all">
          POST /api/v1/whatsapp/webhook
        </p>
      </div>
    </div>
  );
}

export default WhatsAppPlaceholder;