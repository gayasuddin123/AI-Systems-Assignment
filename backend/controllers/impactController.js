/**
 * Module 3 — Architecture outline controller
 */
export const generateReport = async (req, res) => {
  res.json({
    status: "not_implemented",
    message:
      "Module 3 is architecturally outlined. See services/impactService.js.",
    plannedEndpoints: {
      "POST /api/v1/impact/generate": "Generate impact report for an order",
      "GET /api/v1/impact/:id": "Retrieve saved impact report",
      "GET /api/v1/impact/order/:orderId":
        "Get impact report by order ID",
    },
  });
};