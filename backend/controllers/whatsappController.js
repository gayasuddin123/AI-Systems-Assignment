/**
 * Module 4 — Architecture outline controller
 */
export const webhook = async (req, res) => {
  res.json({
    status: "not_implemented",
    message:
      "Module 4 is architecturally outlined. See services/whatsappService.js.",
    plannedEndpoints: {
      "POST /api/v1/whatsapp/webhook": "Receive incoming messages",
      "GET /api/v1/whatsapp/logs": "List conversations",
      "GET /api/v1/whatsapp/logs/:sessionId": "Single conversation",
    },
  });
};

export const getLogs = async (req, res) => {
  res.json({
    status: "not_implemented",
    message: "Conversation logging architecture defined.",
  });
};